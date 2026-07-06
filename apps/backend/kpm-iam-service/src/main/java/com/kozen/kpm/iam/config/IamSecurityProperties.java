package com.kozen.kpm.iam.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/** Runtime security settings for IAM self-service features. */
@Component
@ConfigurationProperties(prefix = "kpm.iam")
public class IamSecurityProperties {
    private long passwordCodeTtlSeconds = 600;
    private boolean otpDebugEnabled = true;
    private boolean mailEnabled = false;
    private String mailFrom = "noreply@kozen.example";

    public long getPasswordCodeTtlSeconds() {
        return passwordCodeTtlSeconds;
    }

    public void setPasswordCodeTtlSeconds(long passwordCodeTtlSeconds) {
        this.passwordCodeTtlSeconds = passwordCodeTtlSeconds;
    }

    public boolean isOtpDebugEnabled() {
        return otpDebugEnabled;
    }

    public void setOtpDebugEnabled(boolean otpDebugEnabled) {
        this.otpDebugEnabled = otpDebugEnabled;
    }

    public boolean isMailEnabled() {
        return mailEnabled;
    }

    public void setMailEnabled(boolean mailEnabled) {
        this.mailEnabled = mailEnabled;
    }

    public String getMailFrom() {
        return mailFrom;
    }

    public void setMailFrom(String mailFrom) {
        this.mailFrom = mailFrom;
    }
}
