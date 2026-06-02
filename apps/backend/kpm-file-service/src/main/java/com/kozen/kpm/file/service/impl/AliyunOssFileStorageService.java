package com.kozen.kpm.file.service.impl;

import com.aliyun.oss.HttpMethod;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.GeneratePresignedUrlRequest;
import com.aliyun.oss.model.ObjectMetadata;
import com.kozen.kpm.file.config.OssProperties;
import com.kozen.kpm.file.model.DownloadUrlResult;
import com.kozen.kpm.file.model.FileUploadResult;
import com.kozen.kpm.file.service.FileStorageService;
import com.kozen.kpm.common.util.ValidationUtil;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@Service
@RefreshScope
public class AliyunOssFileStorageService implements FileStorageService {
    private static final DateTimeFormatter DATE_PATH_FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    private static final DateTimeFormatter DATETIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final OssProperties ossProperties;

    public AliyunOssFileStorageService(OssProperties ossProperties) {
        this.ossProperties = ossProperties;
    }

    @Override
    public FileUploadResult upload(MultipartFile file, String category, String businessId, String uploader) throws IOException {
        ensureReady();
        validateUpload(file, category, businessId, uploader);
        String originalName = safeOriginalName(file.getOriginalFilename());
        String objectKey = buildObjectKey(category, businessId, originalName);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        if (file.getContentType() != null && !file.getContentType().isBlank()) {
            metadata.setContentType(file.getContentType());
        }
        metadata.addUserMetadata("original-name-b64", metadataValue(originalName));
        metadata.addUserMetadata("category", normalizeCategory(category));
        metadata.addUserMetadata("uploader-b64", metadataValue(uploader == null || uploader.isBlank() ? "unknown" : uploader));

        OSS ossClient = createClient();
        try {
            ossClient.putObject(ossProperties.getBucket(), objectKey, file.getInputStream(), metadata);
        } finally {
            ossClient.shutdown();
        }

        String fileType = fileTypeLabel(originalName, file.getContentType());
        return new FileUploadResult(
                originalName,
                originalName,
                fileType,
                fileType,
                humanFileSize(file.getSize()),
                file.getSize(),
                file.getContentType() == null ? "application/octet-stream" : file.getContentType(),
                uploader == null || uploader.isBlank() ? "张敏" : uploader,
                normalizeCategory(category),
                ossProperties.getBucket(),
                objectKey,
                "oss://" + ossProperties.getBucket() + "/" + objectKey,
                LocalDateTime.now().format(DATETIME_FORMATTER)
        );
    }

    @Override
    public DownloadUrlResult createDownloadUrl(String objectKey) {
        ensureReady();
        if (objectKey == null || objectKey.isBlank()) {
            throw new IllegalArgumentException("objectKey is required");
        }
        ValidationUtil.optionalText(objectKey, "objectKey", 512);
        long expiresInSeconds = Math.max(60, ossProperties.getDownloadUrlExpirationSeconds());
        Date expiration = new Date(System.currentTimeMillis() + expiresInSeconds * 1000);
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(ossProperties.getBucket(), objectKey, HttpMethod.GET);
        request.setExpiration(expiration);

        OSS ossClient = createClient();
        try {
            URL signedUrl = ossClient.generatePresignedUrl(request);
            return new DownloadUrlResult(ossProperties.getBucket(), objectKey, signedUrl.toString(), expiresInSeconds);
        } finally {
            ossClient.shutdown();
        }
    }

    @Override
    public Map<String, Object> status() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("enabled", ossProperties.isEnabled());
        status.put("ready", ossProperties.ready());
        status.put("endpoint", ossProperties.getEndpoint());
        status.put("bucket", ossProperties.getBucket());
        status.put("rootPrefix", ossProperties.normalizedRootPrefix());
        status.put("accessKeyConfigured", ossProperties.getAccessKeyId() != null && !ossProperties.getAccessKeyId().isBlank()
                && ossProperties.getAccessKeySecret() != null && !ossProperties.getAccessKeySecret().isBlank());
        status.put("downloadUrlExpirationSeconds", ossProperties.getDownloadUrlExpirationSeconds());
        status.put("categories", categoryPaths());
        return status;
    }

    private OSS createClient() {
        return new OSSClientBuilder().build(
                ossProperties.getEndpoint(),
                ossProperties.getAccessKeyId(),
                ossProperties.getAccessKeySecret()
        );
    }

    private void ensureReady() {
        if (!ossProperties.ready()) {
            throw new IllegalStateException("OSS storage is not ready. Please configure kpm.oss in Nacos or environment variables.");
        }
    }

    private void validateUpload(MultipartFile file, String category, String businessId, String uploader) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("上传文件不能为空");
        }
        if (file.getSize() > 500L * 1024 * 1024) {
            throw new IllegalArgumentException("单个上传文件不能超过500MB");
        }
        ValidationUtil.optionalText(file.getOriginalFilename(), "文件名", 255);
        ValidationUtil.optionalText(category, "文件分类", 80);
        ValidationUtil.optionalText(businessId, "业务ID", 120);
        ValidationUtil.optionalText(uploader, "上传人", 60);
    }

    private String buildObjectKey(String category, String businessId, String originalName) {
        String categoryPath = categoryPath(category);
        String businessSegment = safePathSegment(businessId == null || businessId.isBlank() ? "general" : businessId);
        String dateSegment = LocalDate.now().format(DATE_PATH_FORMATTER);
        String uniqueName = UUID.randomUUID() + "-" + safeOriginalName(originalName);
        return ossProperties.normalizedRootPrefix() + categoryPath + "/" + businessSegment + "/" + dateSegment + "/" + uniqueName;
    }

    private static String normalizeCategory(String category) {
        return category == null || category.isBlank() ? "general" : category.trim().toLowerCase(Locale.ROOT);
    }

    private static String categoryPath(String category) {
        return categoryPaths().getOrDefault(normalizeCategory(category), "general");
    }

    private static Map<String, String> categoryPaths() {
        Map<String, String> paths = new LinkedHashMap<>();
        paths.put("project-stage-materials", "project/stage-materials");
        paths.put("project-materials", "project/materials");
        paths.put("stage-record-attachments", "project/stage-record-attachments");
        paths.put("customer-materials", "customer/materials");
        paths.put("customer-followup-attachments", "customer/followup-attachments");
        paths.put("task-attachments", "task/attachments");
        paths.put("task-comment-attachments", "task/comment-attachments");
        paths.put("general", "general");
        return paths;
    }

    private static String safeOriginalName(String fileName) {
        String value = fileName == null || fileName.isBlank() ? "unnamed-file" : fileName.trim();
        value = value.replace('\\', '-').replace('/', '-');
        value = value.replaceAll("[\\p{Cntrl}]", "");
        return value.length() > 180 ? value.substring(value.length() - 180) : value;
    }

    private static String safePathSegment(String value) {
        String safe = value.trim().replace('\\', '-').replace('/', '-').replaceAll("[^\\p{L}\\p{N}_.-]", "-");
        safe = safe.replaceAll("-+", "-").replaceAll("^-|-$", "");
        return safe.isBlank() ? "general" : safe;
    }

    private static String metadataValue(String value) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private static String humanFileSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        double kb = bytes / 1024.0;
        if (kb < 1024) return String.format(Locale.US, "%.1f KB", kb);
        double mb = kb / 1024.0;
        if (mb < 1024) return String.format(Locale.US, "%.1f MB", mb);
        return String.format(Locale.US, "%.1f GB", mb / 1024.0);
    }

    private static String fileTypeLabel(String fileName, String contentType) {
        String lowerName = fileName == null ? "" : fileName.toLowerCase(Locale.ROOT);
        String lowerContentType = contentType == null ? "" : contentType.toLowerCase(Locale.ROOT);
        if (lowerContentType.startsWith("image/") || lowerName.matches(".*\\.(png|jpg|jpeg|gif|webp|svg)$")) return "图片";
        if (lowerContentType.startsWith("video/") || lowerName.matches(".*\\.(mp4|mov|avi|mkv|webm)$")) return "视频";
        if (lowerName.endsWith(".pdf")) return "PDF";
        if (lowerName.matches(".*\\.(doc|docx)$")) return "Word";
        if (lowerName.matches(".*\\.(xls|xlsx|csv)$")) return "表格";
        if (lowerName.matches(".*\\.(ppt|pptx)$")) return "演示文稿";
        return "文件";
    }
}
