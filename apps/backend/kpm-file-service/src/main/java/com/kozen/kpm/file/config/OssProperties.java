package com.kozen.kpm.file.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "kpm.oss")
public class OssProperties {
    private boolean enabled;
    private String endpoint;
    private String bucket;
    private String rootPrefix = "KPM/";
    private String accessKeyId;
    private String accessKeySecret;
    private long downloadUrlExpirationSeconds = 900;

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }
    public String getBucket() { return bucket; }
    public void setBucket(String bucket) { this.bucket = bucket; }
    public String getRootPrefix() { return rootPrefix; }
    public void setRootPrefix(String rootPrefix) { this.rootPrefix = rootPrefix; }
    public String getAccessKeyId() { return accessKeyId; }
    public void setAccessKeyId(String accessKeyId) { this.accessKeyId = accessKeyId; }
    public String getAccessKeySecret() { return accessKeySecret; }
    public void setAccessKeySecret(String accessKeySecret) { this.accessKeySecret = accessKeySecret; }
    public long getDownloadUrlExpirationSeconds() { return downloadUrlExpirationSeconds; }
    public void setDownloadUrlExpirationSeconds(long downloadUrlExpirationSeconds) { this.downloadUrlExpirationSeconds = downloadUrlExpirationSeconds; }

    public String normalizedRootPrefix() {
        if (rootPrefix == null || rootPrefix.isBlank()) return "";
        String normalized = rootPrefix.replaceFirst("^/+", "");
        return normalized.endsWith("/") ? normalized : normalized + "/";
    }

    public boolean ready() {
        return enabled
                && endpoint != null && !endpoint.isBlank()
                && bucket != null && !bucket.isBlank()
                && accessKeyId != null && !accessKeyId.isBlank()
                && accessKeySecret != null && !accessKeySecret.isBlank();
    }
}
