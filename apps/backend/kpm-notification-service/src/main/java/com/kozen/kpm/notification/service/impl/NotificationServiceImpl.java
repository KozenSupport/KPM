package com.kozen.kpm.notification.service.impl;

import com.kozen.kpm.common.util.IdUtil;
import com.kozen.kpm.common.util.JsonUtil;
import com.kozen.kpm.notification.config.NotificationProperties;
import com.kozen.kpm.notification.converter.NotificationConverter;
import com.kozen.kpm.notification.dto.InternalMessageDto;
import com.kozen.kpm.notification.dto.NotificationSettingsDto;
import com.kozen.kpm.notification.entity.NotificationEventEntity;
import com.kozen.kpm.notification.entity.UserLookupEntity;
import com.kozen.kpm.notification.mapper.NotificationMapper;
import com.kozen.kpm.notification.service.NotificationService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationMapper notificationMapper;
    private final NotificationProperties properties;
    private final NotificationConverter notificationConverter;
    private final JavaMailSender mailSender;

    public NotificationServiceImpl(NotificationMapper notificationMapper, NotificationProperties properties, NotificationConverter notificationConverter, ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.notificationMapper = notificationMapper;
        this.properties = properties;
        this.notificationConverter = notificationConverter;
        this.mailSender = mailSenderProvider.getIfAvailable();
    }

    @Override
    @Scheduled(fixedDelayString = "${kpm.notification.processor-interval-ms:15000}")
    public void processPendingEvents() {
        for (NotificationEventEntity event : notificationMapper.pendingEvents(50)) {
            List<String> recipients = recipientIds(event.getRecipientUserIds());
            for (String recipientId : recipients) {
                notificationMapper.insertMessage(
                        IdUtil.nanoId("msg"),
                        recipientId,
                        event.getTitle(),
                        event.getContent(),
                        blankToDefault(event.getEventType(), "system")
                );
                sendMailIfEnabled(recipientId, event.getTitle(), event.getContent());
            }
            notificationMapper.markEventProcessed(event.getId());
        }
    }

    @Scheduled(cron = "${kpm.notification.read-retention-cleanup-cron:0 20 3 * * *}")
    public void cleanupExpiredReadMessages() {
        notificationMapper.cleanupExpiredReadMessages();
    }

    @Override
    public List<InternalMessageDto> messages(String account, boolean unreadOnly) {
        return notificationMapper.messages(currentUserId(account), unreadOnly).stream()
                .map(notificationConverter::toInternalMessageDto)
                .toList();
    }

    @Override
    public int unreadCount(String account) {
        Integer count = notificationMapper.unreadCount(currentUserId(account));
        return count == null ? 0 : count;
    }

    @Override
    public boolean markRead(String account, String messageId) {
        return notificationMapper.markRead(messageId, currentUserId(account)) > 0;
    }

    @Override
    public int markAllRead(String account) {
        return notificationMapper.markAllRead(currentUserId(account));
    }

    @Override
    public NotificationSettingsDto settings() {
        return new NotificationSettingsDto(properties.getRefreshIntervalSeconds(), properties.isMailEnabled());
    }

    private List<String> recipientIds(String raw) {
        if (raw == null || raw.isBlank()) return List.of();
        Object parsed = JsonUtil.fromJson(raw);
        if (parsed instanceof Collection<?> collection) {
            return collection.stream().map(String::valueOf).filter(value -> !value.isBlank()).distinct().toList();
        }
        return List.of();
    }

    private String currentUserId(String account) {
        List<UserLookupEntity> users = notificationMapper.userByAccount(account);
        if (users.isEmpty()) {
            throw new IllegalArgumentException("用户不存在");
        }
        return users.getFirst().getId();
    }

    private void sendMailIfEnabled(String recipientUserId, String title, String content) {
        if (!properties.isMailEnabled() || mailSender == null) return;
        try {
            UserLookupEntity user = notificationMapper.userById(recipientUserId);
            if (user == null || user.getEmail() == null || user.getEmail().isBlank()) return;
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(properties.getMailFrom());
            message.setTo(user.getEmail());
            message.setSubject(title);
            message.setText(content);
            mailSender.send(message);
        } catch (Exception ignored) {
            // Mail failures should not block internal messages; production can add retry/dead-letter logic.
        }
    }

    private String blankToDefault(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value;
    }
}
