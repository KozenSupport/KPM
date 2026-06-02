package com.kozen.kpm.notification.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "kpm.notification")
public class NotificationProperties {
    private long refreshIntervalSeconds = 120;
    private long processorIntervalMs = 15_000;
    private boolean mailEnabled = false;
    private String mailFrom = "noreply@kozen.example";

    public long getRefreshIntervalSeconds() { return refreshIntervalSeconds; }
    public void setRefreshIntervalSeconds(long refreshIntervalSeconds) { this.refreshIntervalSeconds = refreshIntervalSeconds; }
    public long getProcessorIntervalMs() { return processorIntervalMs; }
    public void setProcessorIntervalMs(long processorIntervalMs) { this.processorIntervalMs = processorIntervalMs; }
    public boolean isMailEnabled() { return mailEnabled; }
    public void setMailEnabled(boolean mailEnabled) { this.mailEnabled = mailEnabled; }
    public String getMailFrom() { return mailFrom; }
    public void setMailFrom(String mailFrom) { this.mailFrom = mailFrom; }
}
