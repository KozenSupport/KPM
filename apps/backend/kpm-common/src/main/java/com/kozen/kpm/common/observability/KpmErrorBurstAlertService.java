package com.kozen.kpm.common.observability;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

/** Detects bursts of HTTP 500 errors and alerts administrators by mail when enabled. */
@Component
public class KpmErrorBurstAlertService {
    private static final Logger log = LoggerFactory.getLogger(KpmErrorBurstAlertService.class);
    private final KpmLoggingProperties properties;
    private final JavaMailSender mailSender;
    private final Deque<Instant> recentErrors = new ArrayDeque<>();
    private final AtomicReference<Instant> lastAlertAt = new AtomicReference<>(Instant.EPOCH);

    public KpmErrorBurstAlertService(KpmLoggingProperties properties, ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.properties = properties;
        this.mailSender = mailSenderProvider.getIfAvailable();
    }

    public synchronized void recordServerError(String route, Throwable throwable) {
        KpmLoggingProperties.ErrorAlert alert = properties.getErrorAlert();
        Instant now = Instant.now();
        recentErrors.addLast(now);
        Instant lowerBound = now.minusSeconds(Math.max(10, alert.getWindowSeconds()));
        while (!recentErrors.isEmpty() && recentErrors.peekFirst().isBefore(lowerBound)) {
            recentErrors.removeFirst();
        }
        if (recentErrors.size() < Math.max(1, alert.getThreshold())) return;
        if (lastAlertAt.get().plusSeconds(Math.max(30, alert.getCooldownSeconds())).isAfter(now)) return;
        lastAlertAt.set(now);
        sendAlert(route, throwable, recentErrors.size());
    }

    private void sendAlert(String route, Throwable throwable, int count) {
        KpmLoggingProperties.ErrorAlert alert = properties.getErrorAlert();
        List<String> recipients = alert.getRecipients().stream().filter(item -> item != null && !item.isBlank()).toList();
        String message = "KPM detected " + count + " server errors in " + alert.getWindowSeconds() + " seconds. Last route=" + route + ", error=" + throwable.getMessage();
        if (!alert.isEnabled()) {
            log.warn("500 error burst detected but email alert is disabled. {}", message);
            return;
        }
        if (mailSender == null || recipients.isEmpty()) {
            log.warn("500 error burst detected but mail sender or recipients are not configured. {}", message);
            return;
        }
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(alert.getMailFrom());
            mail.setTo(recipients.toArray(String[]::new));
            mail.setSubject("[KPM] 500 error burst detected");
            mail.setText(message);
            mailSender.send(mail);
            log.warn("500 error burst alert sent to {}. {}", recipients, message);
        } catch (Exception e) {
            log.warn("Failed to send 500 error burst alert. {}", message, e);
        }
    }
}
