package com.kozen.kpm.file.model;

public record DownloadUrlResult(
        String bucket,
        String objectKey,
        String url,
        long expiresInSeconds
) {
}
