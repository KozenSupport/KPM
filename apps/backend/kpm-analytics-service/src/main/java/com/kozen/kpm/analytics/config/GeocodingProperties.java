package com.kozen.kpm.analytics.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Geocoding configuration for analytics maps.
 *
 * Customer master data stores only human-readable address text. This config controls
 * whether KPM may call an external geocoder to derive display coordinates for maps;
 * derived coordinates are cached in kpm_geocode_cache and are not written back to
 * the customer table.
 */
@Component
@ConfigurationProperties(prefix = "kpm.geocoding")
public class GeocodingProperties {
    private boolean externalEnabled = false;
    private String provider = "nominatim";
    private String nominatimUrl = "https://nominatim.openstreetmap.org/search";
    private String userAgent = "Kozen-KPM/0.1";
    private long minimumRequestIntervalMillis = 1100;
    private long requestTimeoutSeconds = 3;

    public boolean isExternalEnabled() {
        return externalEnabled;
    }

    public void setExternalEnabled(boolean externalEnabled) {
        this.externalEnabled = externalEnabled;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getNominatimUrl() {
        return nominatimUrl;
    }

    public void setNominatimUrl(String nominatimUrl) {
        this.nominatimUrl = nominatimUrl;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public long getMinimumRequestIntervalMillis() {
        return minimumRequestIntervalMillis;
    }

    public void setMinimumRequestIntervalMillis(long minimumRequestIntervalMillis) {
        this.minimumRequestIntervalMillis = minimumRequestIntervalMillis;
    }

    public long getRequestTimeoutSeconds() {
        return requestTimeoutSeconds;
    }

    public void setRequestTimeoutSeconds(long requestTimeoutSeconds) {
        this.requestTimeoutSeconds = requestTimeoutSeconds;
    }
}
