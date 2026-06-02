package com.kozen.kpm.common.auth;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Small self-contained bearer token helper for the current KPM pilot.
 *
 * <p>This is intentionally dependency-free so every microservice and the gateway can share the
 * same token format without introducing a paid or heavyweight identity provider. It behaves like
 * an OAuth2-style bearer token at the API boundary: callers must present
 * {@code Authorization: Bearer <token>} and the gateway verifies signature and expiry.</p>
 *
 * <p>Production hardening path: replace this with Spring Authorization Server or an external IdP
 * once Kozen decides the formal IAM strategy.</p>
 */
public final class AuthTokenUtil {
    public static final String DEFAULT_SECRET = "kpm-local-dev-secret-change-me";
    private static final String PREFIX = "kpm1";
    private static final String HMAC_ALGORITHM = "HmacSHA256";

    private AuthTokenUtil() {
    }

    public static String issue(String account, String displayName, long ttlSeconds, String secret) {
        long expiresAt = Instant.now().getEpochSecond() + Math.max(60, ttlSeconds);
        String payload = account + "|" + nullToEmpty(displayName) + "|" + expiresAt;
        String payloadPart = base64Url(payload.getBytes(StandardCharsets.UTF_8));
        String signaturePart = sign(payloadPart, normalizeSecret(secret));
        return PREFIX + "." + payloadPart + "." + signaturePart;
    }

    public static Map<String, Object> verify(String token, String secret) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Missing bearer token");
        }
        String[] parts = token.split("\\.");
        if (parts.length != 3 || !PREFIX.equals(parts[0])) {
            throw new IllegalArgumentException("Invalid bearer token format");
        }
        String expected = sign(parts[1], normalizeSecret(secret));
        if (!constantTimeEquals(expected, parts[2])) {
            throw new IllegalArgumentException("Invalid bearer token signature");
        }
        String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
        String[] payloadParts = payload.split("\\|", -1);
        if (payloadParts.length != 3) {
            throw new IllegalArgumentException("Invalid bearer token payload");
        }
        long expiresAt;
        try {
            expiresAt = Long.parseLong(payloadParts[2]);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid bearer token expiry");
        }
        if (expiresAt < Instant.now().getEpochSecond()) {
            throw new IllegalArgumentException("Bearer token expired");
        }
        Map<String, Object> claims = new LinkedHashMap<>();
        claims.put("account", payloadParts[0]);
        claims.put("name", payloadParts[1]);
        claims.put("expiresAt", expiresAt);
        return claims;
    }

    private static String sign(String payloadPart, String secret) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM));
            return base64Url(mac.doFinal(payloadPart.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException("Unable to sign bearer token", e);
        }
    }

    private static String base64Url(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private static String normalizeSecret(String secret) {
        return secret == null || secret.isBlank() ? DEFAULT_SECRET : secret;
    }

    private static String nullToEmpty(String value) {
        return value == null ? "" : value;
    }

    private static boolean constantTimeEquals(String left, String right) {
        if (left == null || right == null) return false;
        byte[] leftBytes = left.getBytes(StandardCharsets.UTF_8);
        byte[] rightBytes = right.getBytes(StandardCharsets.UTF_8);
        if (leftBytes.length != rightBytes.length) return false;
        int diff = 0;
        for (int i = 0; i < leftBytes.length; i += 1) {
            diff |= leftBytes[i] ^ rightBytes[i];
        }
        return diff == 0;
    }
}
