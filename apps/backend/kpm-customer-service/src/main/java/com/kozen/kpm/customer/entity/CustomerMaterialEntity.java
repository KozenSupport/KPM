package com.kozen.kpm.customer.entity;

import java.time.LocalDateTime;

/** Persistence projection for customermaterial data. */
public class CustomerMaterialEntity {
    private String id;
    private String customerId;
    private String fileName;
    private String fileType;
    private String fileSize;
    private String uploader;
    private String bucket;
    private String objectKey;
    private String storageUrl;
    private String storageCategory;
    private LocalDateTime uploadedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getFileSize() { return fileSize; }
    public void setFileSize(String fileSize) { this.fileSize = fileSize; }
    public String getUploader() { return uploader; }
    public void setUploader(String uploader) { this.uploader = uploader; }
    public String getBucket() { return bucket; }
    public void setBucket(String bucket) { this.bucket = bucket; }
    public String getObjectKey() { return objectKey; }
    public void setObjectKey(String objectKey) { this.objectKey = objectKey; }
    public String getStorageUrl() { return storageUrl; }
    public void setStorageUrl(String storageUrl) { this.storageUrl = storageUrl; }
    public String getStorageCategory() { return storageCategory; }
    public void setStorageCategory(String storageCategory) { this.storageCategory = storageCategory; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
