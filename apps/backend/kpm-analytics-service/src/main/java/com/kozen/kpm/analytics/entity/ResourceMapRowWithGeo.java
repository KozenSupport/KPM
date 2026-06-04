package com.kozen.kpm.analytics.entity;

public class ResourceMapRowWithGeo extends ResourceMapRow {
    private Double latitude;
    private Double longitude;
    private String geocodedAddress;
    private String geocodeProvider;
    private String geoPrecision;
    private String geocodeQuery;

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getGeocodedAddress() { return geocodedAddress; }
    public void setGeocodedAddress(String geocodedAddress) { this.geocodedAddress = geocodedAddress; }
    public String getGeocodeProvider() { return geocodeProvider; }
    public void setGeocodeProvider(String geocodeProvider) { this.geocodeProvider = geocodeProvider; }
    public String getGeoPrecision() { return geoPrecision; }
    public void setGeoPrecision(String geoPrecision) { this.geoPrecision = geoPrecision; }
    public String getGeocodeQuery() { return geocodeQuery; }
    public void setGeocodeQuery(String geocodeQuery) { this.geocodeQuery = geocodeQuery; }
}
