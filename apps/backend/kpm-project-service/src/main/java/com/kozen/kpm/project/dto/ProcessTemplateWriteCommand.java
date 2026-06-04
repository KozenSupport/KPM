package com.kozen.kpm.project.dto;

/** Typed persistence command for process template base information. */
public record ProcessTemplateWriteCommand(String id, String name, String scope, String status) {}
