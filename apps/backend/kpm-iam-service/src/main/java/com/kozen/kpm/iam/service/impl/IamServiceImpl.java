package com.kozen.kpm.iam.service.impl;

import com.kozen.kpm.common.auth.AuthTokenUtil;
import com.kozen.kpm.common.util.ValidationUtil;
import com.kozen.kpm.iam.config.IamSecurityProperties;
import com.kozen.kpm.iam.converter.IamUserConverter;
import com.kozen.kpm.iam.dto.AuthenticatedUserDto;
import com.kozen.kpm.iam.dto.ChangePasswordRequest;
import com.kozen.kpm.iam.dto.LoginRequest;
import com.kozen.kpm.iam.dto.LoginResponseDto;
import com.kozen.kpm.iam.dto.PasswordCodeResponse;
import com.kozen.kpm.iam.dto.ProfileDto;
import com.kozen.kpm.iam.dto.ProfileStatsDto;
import com.kozen.kpm.iam.entity.UserAccountEntity;
import com.kozen.kpm.iam.mapper.IamMapper;
import com.kozen.kpm.iam.service.IamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HexFormat;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

/**
 * Default IAM service implementation.
 *
 * <p>The service layer owns authentication rules and user permission aggregation. It deliberately
 * returns DTOs instead of raw maps so controller responses stay stable and persistence details such
 * as password hashes never cross the API boundary.</p>
 */
@Service
public class IamServiceImpl implements IamService {
    private static final Logger log = LoggerFactory.getLogger(IamServiceImpl.class);
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final String CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final String PASSWORD_CODE_KEY_PREFIX = "kpm:iam:password-code:";

    private final IamMapper iamMapper;
    private final IamUserConverter iamUserConverter;
    private final IamSecurityProperties securityProperties;
    private final StringRedisTemplate redisTemplate;
    private final JavaMailSender mailSender;
    private final String tokenSecret;
    private final long tokenTtlSeconds;

    public IamServiceImpl(
            IamMapper iamMapper,
            IamUserConverter iamUserConverter,
            IamSecurityProperties securityProperties,
            StringRedisTemplate redisTemplate,
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${kpm.auth.token-secret:" + AuthTokenUtil.DEFAULT_SECRET + "}") String tokenSecret,
            @Value("${kpm.auth.token-ttl-seconds:7200}") long tokenTtlSeconds
    ) {
        this.iamMapper = iamMapper;
        this.iamUserConverter = iamUserConverter;
        this.securityProperties = securityProperties;
        this.redisTemplate = redisTemplate;
        this.mailSender = mailSenderProvider.getIfAvailable();
        this.tokenSecret = tokenSecret;
        this.tokenTtlSeconds = tokenTtlSeconds;
    }

    @Override
    public LoginResponseDto login(LoginRequest request) {
        String account = ValidationUtil.requireEmail(request.account(), "登录邮箱");
        String password = ValidationUtil.requireText(request.password(), "密码", 128);
        UserAccountEntity user = findLoginUser(account);
        if (!passwordMatches(user.getPasswordHash(), password) || !user.enabled()) {
            throw new IllegalArgumentException("账号或密码不正确");
        }

        AuthenticatedUserDto authenticatedUser = enrichUser(user);
        String token = AuthTokenUtil.issue(
                account,
                authenticatedUser.name(),
                tokenTtlSeconds,
                tokenSecret
        );
        return new LoginResponseDto(token, "Bearer", tokenTtlSeconds, authenticatedUser);
    }

    @Override
    public AuthenticatedUserDto me(String account) {
        ValidationUtil.requireEmail(account, "登录邮箱");
        List<UserAccountEntity> users = iamMapper.findUser(account);
        if (users.isEmpty()) {
            throw new IllegalArgumentException("用户不存在");
        }
        return enrichUser(users.getFirst());
    }

    @Override
    public ProfileDto profile(String account) {
        ValidationUtil.requireEmail(account, "登录邮箱");
        List<UserAccountEntity> users = iamMapper.findUser(account);
        if (users.isEmpty()) {
            throw new IllegalArgumentException("用户不存在");
        }
        UserAccountEntity user = users.getFirst();
        AuthenticatedUserDto authenticatedUser = enrichUser(user);
        ProfileStatsDto stats = new ProfileStatsDto(
                iamMapper.createdTaskCount(user.getId()),
                iamMapper.assignedTaskCount(user.getId()),
                iamMapper.completedAssignedTaskCount(user.getId()),
                iamMapper.participatedTaskCount(user.getId()),
                iamMapper.customerReplyCount(user.getName(), user.getAccount(), user.getEmail(), authorDisplay(user)),
                iamMapper.knowledgeArticleCount(user.getId(), user.getName(), user.getAccount()),
                iamMapper.projectCount(user.getId()),
                iamMapper.customerCount(user.getId())
        );
        return new ProfileDto(authenticatedUser, stats);
    }

    @Override
    public PasswordCodeResponse requestPasswordCode(ChangePasswordRequest request) {
        PasswordChangeInput input = validatePasswordChangeInput(request, false);
        UserAccountEntity user = findLoginUser(input.account());
        if (!passwordMatches(user.getPasswordHash(), input.oldPassword())) {
            throw new IllegalArgumentException("原密码不正确");
        }
        if (input.oldPassword().equals(input.newPassword())) {
            throw new IllegalArgumentException("新密码不能与原密码相同");
        }

        String code = generateCode();
        long ttlSeconds = Math.max(60, securityProperties.getPasswordCodeTtlSeconds());
        redisTemplate.opsForValue().set(
                passwordCodeKey(input.account()),
                passwordCodeHash(input.account(), input.oldPassword(), input.newPassword(), code),
                ttlSeconds,
                TimeUnit.SECONDS
        );
        sendPasswordCodeMail(user, code);
        if (securityProperties.isOtpDebugEnabled()) {
            log.info("IAM password change code generated for {}: {}", input.account(), code);
        }
        return new PasswordCodeResponse(
                true,
                ttlSeconds,
                "验证码已发送到登录邮箱",
                securityProperties.isOtpDebugEnabled() ? code : null
        );
    }

    @Override
    public boolean changePassword(ChangePasswordRequest request) {
        PasswordChangeInput input = validatePasswordChangeInput(request, true);
        UserAccountEntity user = findLoginUser(input.account());
        if (!passwordMatches(user.getPasswordHash(), input.oldPassword())) {
            throw new IllegalArgumentException("原密码不正确");
        }
        String key = passwordCodeKey(input.account());
        String expectedHash = redisTemplate.opsForValue().get(key);
        if (expectedHash == null || expectedHash.isBlank()) {
            throw new IllegalArgumentException("验证码不存在或已过期，请重新获取");
        }
        if (!passwordCodeHash(input.account(), input.oldPassword(), input.newPassword(), input.code()).equals(expectedHash)) {
            throw new IllegalArgumentException("验证码不正确");
        }
        redisTemplate.delete(key);
        iamMapper.updatePassword(user.getId(), "{noop}" + input.newPassword());
        return true;
    }

    private UserAccountEntity findLoginUser(String account) {
        List<UserAccountEntity> users = iamMapper.findUserForLogin(account);
        if (users.isEmpty()) {
            throw new IllegalArgumentException("账号或密码不正确");
        }
        return users.getFirst();
    }

    private AuthenticatedUserDto enrichUser(UserAccountEntity user) {
        String userId = user.getId();
        return iamUserConverter.toAuthenticatedUser(
                user,
                iamMapper.departments(userId),
                iamMapper.roles(userId),
                iamMapper.permissions(userId)
        );
    }

    private boolean passwordMatches(String storedHash, String password) {
        return storedHash != null && storedHash.endsWith(password);
    }

    private String authorDisplay(UserAccountEntity user) {
        String email = user.getEmail() == null || user.getEmail().isBlank() ? user.getAccount() : user.getEmail();
        return user.getName() + " <" + email + ">";
    }

    private PasswordChangeInput validatePasswordChangeInput(ChangePasswordRequest request, boolean requireCode) {
        String account = normalizeEmail(request.account());
        String oldPassword = ValidationUtil.requireText(request.oldPassword(), "原密码", 128);
        String newPassword = ValidationUtil.requireText(request.newPassword(), "新密码", 128);
        if (newPassword.length() < 6) {
            throw new IllegalArgumentException("新密码长度必须在6到128位之间");
        }
        String code = requireCode ? ValidationUtil.requireText(request.code(), "邮箱验证码", 16) : "";
        return new PasswordChangeInput(account, oldPassword, newPassword, code.toUpperCase(Locale.ROOT));
    }

    private String normalizeEmail(String value) {
        return ValidationUtil.requireEmail(value, "登录邮箱").toLowerCase(Locale.ROOT);
    }

    private String generateCode() {
        StringBuilder builder = new StringBuilder(6);
        for (int i = 0; i < 6; i += 1) {
            builder.append(CODE_ALPHABET.charAt(RANDOM.nextInt(CODE_ALPHABET.length())));
        }
        return builder.toString();
    }

    private String passwordCodeKey(String account) {
        return PASSWORD_CODE_KEY_PREFIX + account;
    }

    private String passwordCodeHash(String account, String oldPassword, String newPassword, String code) {
        return sha256(account + "|" + oldPassword + "|" + newPassword + "|" + code.toUpperCase(Locale.ROOT) + "|" + tokenSecret);
    }

    private String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException("Unable to hash password verification code", e);
        }
    }

    private void sendPasswordCodeMail(UserAccountEntity user, String code) {
        if (!securityProperties.isMailEnabled()) {
            return;
        }
        if (mailSender == null) {
            log.warn("IAM password mail is enabled but JavaMailSender is not available");
            return;
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(securityProperties.getMailFrom());
        message.setTo(user.getEmail());
        message.setSubject("KPM 密码修改验证码");
        message.setText("""
                您正在修改 KPM 登录密码。

                验证码：%s
                有效期：%d 分钟

                如果这不是您本人操作，请忽略此邮件并联系管理员。
                """.formatted(code, Math.max(1, securityProperties.getPasswordCodeTtlSeconds() / 60)));
        try {
            mailSender.send(message);
        } catch (Exception e) {
            log.warn("Failed to send IAM password code mail to {}", user.getEmail(), e);
        }
    }

    private record PasswordChangeInput(String account, String oldPassword, String newPassword, String code) {}
}
