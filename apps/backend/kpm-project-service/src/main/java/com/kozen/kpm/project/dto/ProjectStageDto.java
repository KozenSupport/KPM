package com.kozen.kpm.project.dto;

import java.util.List;

public record ProjectStageDto(
        String id,
        String projectId,
        String stageName,
        String name,
        Integer stageOrder,
        String status,
        List<StageAssigneeDto> assignees,
        List<ProjectFileDto> materials,
        List<StageRecordDto> records
) {}
