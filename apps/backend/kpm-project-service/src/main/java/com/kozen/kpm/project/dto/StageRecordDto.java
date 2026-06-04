package com.kozen.kpm.project.dto;

import java.time.LocalDateTime;

public record StageRecordDto(String id, String stageId, String author, String content, Object attachments, LocalDateTime createdAt) {}
