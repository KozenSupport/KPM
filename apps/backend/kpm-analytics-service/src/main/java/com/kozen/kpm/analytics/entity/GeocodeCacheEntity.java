package com.kozen.kpm.analytics.entity;

public class GeocodeCacheEntity {
    private String query;
    private Double latitude;
    private Double longitude;
    private String displayName;
    private String provider;
    private String precision;

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
    public String getPrecision() { return precision; }
    public void setPrecision(String precision) { this.precision = precision; }
}
