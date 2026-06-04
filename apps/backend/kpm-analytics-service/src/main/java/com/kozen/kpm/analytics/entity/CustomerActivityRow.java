package com.kozen.kpm.analytics.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CustomerActivityRow {
    private String id;
    private String name;
    private String region;
    private String level;
    private String status;
    private LocalDateTime lastFollowupAt;
    private LocalDate lastOrderDate;
    private Long openTaskCount;
    private Long projectCount;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getLastFollowupAt() { return lastFollowupAt; }
    public void setLastFollowupAt(LocalDateTime lastFollowupAt) { this.lastFollowupAt = lastFollowupAt; }
    public LocalDate getLastOrderDate() { return lastOrderDate; }
    public void setLastOrderDate(LocalDate lastOrderDate) { this.lastOrderDate = lastOrderDate; }
    public Long getOpenTaskCount() { return openTaskCount; }
    public void setOpenTaskCount(Long openTaskCount) { this.openTaskCount = openTaskCount; }
    public Long getProjectCount() { return projectCount; }
    public void setProjectCount(Long projectCount) { this.projectCount = projectCount; }
}
