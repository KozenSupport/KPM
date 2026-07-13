package com.kozen.kpm.file.model;

public record FileUploadResult(
        String fileName,
        String fileType,
        String fileSize,
        long bytes,
        String contentType,
        String uploader,
        String storageCategory,
        String bucket,
        String objectKey,
        String storageUrl,
        String uploadedAt
) {
}
