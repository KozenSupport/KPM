package com.kozen.kpm.common.observability;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/** Centralized logging and error-alert settings loaded from local config or Nacos. */
@Component
@ConfigurationProperties(prefix = "kpm.logging")
public class KpmLoggingProperties {
    private boolean enabled = true;
    private boolean controllerLogEnabled = true;
    private boolean responseLogEnabled = true;
    private boolean serviceLogEnabled = true;
    private int maxPayloadLength = 2_000;
    private final ErrorAlert errorAlert = new ErrorAlert();

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public boolean isControllerLogEnabled() { return controllerLogEnabled; }
    public void setControllerLogEnabled(boolean controllerLogEnabled) { this.controllerLogEnabled = controllerLogEnabled; }
    public boolean isResponseLogEnabled() { return responseLogEnabled; }
    public void setResponseLogEnabled(boolean responseLogEnabled) { this.responseLogEnabled = responseLogEnabled; }
    public boolean isServiceLogEnabled() { return serviceLogEnabled; }
    public void setServiceLogEnabled(boolean serviceLogEnabled) { this.serviceLogEnabled = serviceLogEnabled; }
    public int getMaxPayloadLength() { return maxPayloadLength; }
    public void setMaxPayloadLength(int maxPayloadLength) { this.maxPayloadLength = maxPayloadLength; }
    public ErrorAlert getErrorAlert() { return errorAlert; }

    public static class ErrorAlert {
        private boolean enabled = false;
        private int threshold = 5;
        private int windowSeconds = 60;
        private int cooldownSeconds = 300;
        private String mailFrom = "noreply@kozen.example";
        private List<String> recipients = new ArrayList<>();

        public boolean isEnabled() { return enabled; }
        public void setEnabled(boolean enabled) { this.enabled = enabled; }
        public int getThreshold() { return threshold; }
        public void setThreshold(int threshold) { this.threshold = threshold; }
        public int getWindowSeconds() { return windowSeconds; }
        public void setWindowSeconds(int windowSeconds) { this.windowSeconds = windowSeconds; }
        public int getCooldownSeconds() { return cooldownSeconds; }
        public void setCooldownSeconds(int cooldownSeconds) { this.cooldownSeconds = cooldownSeconds; }
        public String getMailFrom() { return mailFrom; }
        public void setMailFrom(String mailFrom) { this.mailFrom = mailFrom; }
        public List<String> getRecipients() { return recipients; }
        public void setRecipients(List<String> recipients) { this.recipients = recipients == null ? new ArrayList<>() : recipients; }
    }
}
