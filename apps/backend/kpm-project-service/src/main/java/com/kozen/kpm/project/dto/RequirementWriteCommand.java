package com.kozen.kpm.project.dto;

/** Typed persistence command for customer requirement creation. */
public record RequirementWriteCommand(
        String id,
        String projectId,
        String customerId,
        String title,
        String userStory,
        String businessValue,
        String acceptance,
        String priority,
        String status,
        String proposer,
        String creator,
        String expectedCompletionAt,
        String taskId
) {}
