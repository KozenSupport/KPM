package com.kozen.kpm.analytics.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kozen.kpm.analytics.config.GeocodingProperties;
import com.kozen.kpm.analytics.entity.GeocodeCacheEntity;
import com.kozen.kpm.analytics.mapper.AnalyticsMapper;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

/**
 * Resolves customer address text to a display coordinate for analytics maps.
 *
 * V1 intentionally keeps customer master data free from latitude/longitude fields.
 * Coordinates are derived from address/region and cached in kpm_geocode_cache so the
 * map can work without polluting customer records. The first provider is a built-in
 * city/country centre resolver; external geocoding can be added behind this class later.
 */
public class GeoCoordinateResolver {
    private final AnalyticsMapper analyticsMapper;
    private final GeocodingProperties geocodingProperties;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(2))
            .build();
    private long lastExternalRequestAt = 0L;

    public GeoCoordinateResolver(AnalyticsMapper analyticsMapper, GeocodingProperties geocodingProperties) {
        this.analyticsMapper = analyticsMapper;
        this.geocodingProperties = geocodingProperties;
    }

    public Optional<GeoPoint> resolve(String address, String region) {
        String query = firstText(address, region);
        Optional<GeoPoint> point = resolveQuery(query);
        if (point.isPresent()) return point;
        if (address != null && region != null && !address.equalsIgnoreCase(region)) {
            return resolveQuery(region);
        }
        return Optional.empty();
    }

    private Optional<GeoPoint> resolveQuery(String rawQuery) {
        String query = normalize(rawQuery);
        if (query.isBlank()) return Optional.empty();

        List<GeocodeCacheEntity> cached = analyticsMapper.geocodeCache(query);
        if (!cached.isEmpty()) {
            GeocodeCacheEntity row = cached.getFirst();
            return Optional.of(new GeoPoint(
                    row.getLatitude(),
                    row.getLongitude(),
                    firstText(row.getDisplayName(), rawQuery),
                    firstText(row.getProvider(), "cache"),
                    firstText(row.getPrecision(), "cached"),
                    query
            ));
        }

        GeoPoint builtin = builtin(query);
        if (builtin != null) {
            analyticsMapper.upsertGeocodeCache(query, builtin.latitude(), builtin.longitude(), builtin.displayName(), builtin.provider(), builtin.precision());
            return Optional.of(builtin);
        }

        Optional<GeoPoint> externalPoint = external(query, rawQuery);
        externalPoint.ifPresent(point -> analyticsMapper.upsertGeocodeCache(query, point.latitude(), point.longitude(), point.displayName(), point.provider(), point.precision()));
        return externalPoint;
    }

    private Optional<GeoPoint> external(String query, String rawQuery) {
        if (!geocodingProperties.isExternalEnabled()) return Optional.empty();
        if (!"nominatim".equalsIgnoreCase(geocodingProperties.getProvider())) return Optional.empty();
        if (geocodingProperties.getNominatimUrl() == null || geocodingProperties.getNominatimUrl().isBlank()) return Optional.empty();

        try {
            throttleExternalRequests();
            String encodedQuery = URLEncoder.encode(rawQuery == null || rawQuery.isBlank() ? query : rawQuery, StandardCharsets.UTF_8);
            URI uri = URI.create(geocodingProperties.getNominatimUrl() + "?format=jsonv2&limit=1&q=" + encodedQuery);
            HttpRequest request = HttpRequest.newBuilder(uri)
                    .timeout(Duration.ofSeconds(Math.max(1, geocodingProperties.getRequestTimeoutSeconds())))
                    .header("Accept", "application/json")
                    .header("User-Agent", userAgent())
                    .GET()
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() < 200 || response.statusCode() >= 300) return Optional.empty();

            List<NominatimResult> rows = objectMapper.readValue(response.body(), new TypeReference<>() {});
            if (rows.isEmpty()) return Optional.empty();
            NominatimResult first = rows.getFirst();
            return Optional.of(new GeoPoint(
                    Double.parseDouble(first.lat()),
                    Double.parseDouble(first.lon()),
                    firstText(first.displayName(), rawQuery),
                    "nominatim",
                    "geocoder",
                    query
            ));
        } catch (Exception ignored) {
            return Optional.empty();
        }
    }

    private synchronized void throttleExternalRequests() throws InterruptedException {
        long minInterval = Math.max(1000, geocodingProperties.getMinimumRequestIntervalMillis());
        long now = System.currentTimeMillis();
        long waitMillis = minInterval - (now - lastExternalRequestAt);
        if (waitMillis > 0) {
            Thread.sleep(waitMillis);
        }
        lastExternalRequestAt = System.currentTimeMillis();
    }

    private String userAgent() {
        if (geocodingProperties.getUserAgent() == null || geocodingProperties.getUserAgent().isBlank()) {
            return "Kozen-KPM/0.1";
        }
        return geocodingProperties.getUserAgent();
    }

    private static GeoPoint builtin(String query) {
        Map<String, GeoPoint> points = builtinPoints();
        GeoPoint exact = points.get(query);
        if (exact != null) return exact.withQuery(query);

        for (Map.Entry<String, GeoPoint> entry : points.entrySet()) {
            if (query.contains(entry.getKey())) {
                return entry.getValue().withQuery(query);
            }
        }

        String[] parts = query.split("[,，/\\s]+");
        for (String part : parts) {
            GeoPoint partPoint = points.get(part);
            if (partPoint != null) return partPoint.withQuery(query);
        }
        return null;
    }

    private static Map<String, GeoPoint> builtinPoints() {
        Map<String, GeoPoint> points = new LinkedHashMap<>();
        put(points, "berlin", "Berlin", 52.5200, 13.4050, "city-center");
        put(points, "berlin germany", "Berlin", 52.5200, 13.4050, "city-center");
        put(points, "德国", "Germany", 51.1657, 10.4515, "country-center");
        put(points, "germany", "Germany", 51.1657, 10.4515, "country-center");

        put(points, "bangkok", "Bangkok", 13.7563, 100.5018, "city-center");
        put(points, "bangkok thailand", "Bangkok", 13.7563, 100.5018, "city-center");
        put(points, "泰国", "Thailand", 15.8700, 100.9925, "country-center");
        put(points, "thailand", "Thailand", 15.8700, 100.9925, "country-center");

        put(points, "santiago", "Santiago", -33.4489, -70.6693, "city-center");
        put(points, "santiago chile", "Santiago", -33.4489, -70.6693, "city-center");
        put(points, "智利", "Chile", -35.6751, -71.5430, "country-center");
        put(points, "chile", "Chile", -35.6751, -71.5430, "country-center");

        put(points, "manila", "Manila", 14.5995, 120.9842, "city-center");
        put(points, "manila philippines", "Manila", 14.5995, 120.9842, "city-center");
        put(points, "菲律宾", "Philippines", 12.8797, 121.7740, "country-center");
        put(points, "philippines", "Philippines", 12.8797, 121.7740, "country-center");

        put(points, "dubai", "Dubai", 25.2048, 55.2708, "city-center");
        put(points, "dubai united arab emirates", "Dubai", 25.2048, 55.2708, "city-center");
        put(points, "阿联酋", "United Arab Emirates", 23.4241, 53.8478, "country-center");
        put(points, "uae", "United Arab Emirates", 23.4241, 53.8478, "country-center");
        put(points, "united arab emirates", "United Arab Emirates", 23.4241, 53.8478, "country-center");

        put(points, "中国", "China", 35.8617, 104.1954, "country-center");
        put(points, "china", "China", 35.8617, 104.1954, "country-center");
        put(points, "美国", "United States", 37.0902, -95.7129, "country-center");
        put(points, "usa", "United States", 37.0902, -95.7129, "country-center");
        put(points, "united states", "United States", 37.0902, -95.7129, "country-center");
        put(points, "英国", "United Kingdom", 55.3781, -3.4360, "country-center");
        put(points, "united kingdom", "United Kingdom", 55.3781, -3.4360, "country-center");
        put(points, "france", "France", 46.2276, 2.2137, "country-center");
        put(points, "法国", "France", 46.2276, 2.2137, "country-center");
        put(points, "spain", "Spain", 40.4637, -3.7492, "country-center");
        put(points, "西班牙", "Spain", 40.4637, -3.7492, "country-center");
        put(points, "italy", "Italy", 41.8719, 12.5674, "country-center");
        put(points, "意大利", "Italy", 41.8719, 12.5674, "country-center");
        put(points, "brazil", "Brazil", -14.2350, -51.9253, "country-center");
        put(points, "巴西", "Brazil", -14.2350, -51.9253, "country-center");
        return points;
    }

    private static void put(Map<String, GeoPoint> points, String key, String displayName, double latitude, double longitude, String precision) {
        points.put(normalize(key), new GeoPoint(latitude, longitude, displayName, "builtin", precision, normalize(key)));
    }

    private static String firstText(String first, String second) {
        if (first != null && !first.isBlank()) return first;
        if (second != null && !second.isBlank()) return second;
        return "";
    }

    private static String normalize(String value) {
        if (value == null) return "";
        return value.trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("[，,]+", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    public record NominatimResult(
            @com.fasterxml.jackson.annotation.JsonProperty("lat") String lat,
            @com.fasterxml.jackson.annotation.JsonProperty("lon") String lon,
            @com.fasterxml.jackson.annotation.JsonProperty("display_name") String displayName
    ) {
    }

    public record GeoPoint(double latitude, double longitude, String displayName, String provider, String precision, String query) {
        GeoPoint withQuery(String query) {
            return new GeoPoint(latitude, longitude, displayName, provider, precision, query);
        }
    }
}
