package com.kozen.kpm.customer.dto;

import java.time.LocalDateTime;

public record CustomerMaterialDto(String id, String customerId, String fileName, String fileType, String fileSize, String uploader, String bucket, String objectKey, String storageUrl, String storageCategory, LocalDateTime uploadedAt) {}
