package com.kozen.kpm.project.dto;

/** Typed command used when a requirement creates its linked task. */
public record RequirementTaskWriteCommand(
        String taskId,
        String taskNo,
        String projectId,
        String customerId,
        String title,
        String description,
        String priority,
        String expectedCompletionAt,
        String category,
        String status,
        String source,
        String creatorUserId,
        String creatorName
) {}
