package com.kozen.kpm.project.entity;

import java.time.LocalDate;

/** Persistence projection for processtemplate data. */
public class ProcessTemplateEntity {
    private String id;
    private String name;
    private String scope;
    private String status;
    private LocalDate updatedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getScope() { return scope; }
    public void setScope(String scope) { this.scope = scope; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDate updatedAt) { this.updatedAt = updatedAt; }
}
