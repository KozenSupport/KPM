package com.kozen.kpm.project.dto;

import java.time.LocalDate;
import java.util.List;

public record ProcessTemplateDto(String id, String name, String scope, String status, LocalDate updatedAt, List<String> stages) {}
