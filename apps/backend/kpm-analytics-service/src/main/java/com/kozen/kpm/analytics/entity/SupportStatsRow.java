package com.kozen.kpm.analytics.entity;

public class SupportStatsRow {
    private String customerId;
    private String customerName;
    private String supportOwner;
    private Long openRequirementCount;
    private Long openBugCount;
    private Long openOtherCount;
    private Long blockedCount;

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getSupportOwner() { return supportOwner; }
    public void setSupportOwner(String supportOwner) { this.supportOwner = supportOwner; }
    public Long getOpenRequirementCount() { return openRequirementCount; }
    public void setOpenRequirementCount(Long openRequirementCount) { this.openRequirementCount = openRequirementCount; }
    public Long getOpenBugCount() { return openBugCount; }
    public void setOpenBugCount(Long openBugCount) { this.openBugCount = openBugCount; }
    public Long getOpenOtherCount() { return openOtherCount; }
    public void setOpenOtherCount(Long openOtherCount) { this.openOtherCount = openOtherCount; }
    public Long getBlockedCount() { return blockedCount; }
    public void setBlockedCount(Long blockedCount) { this.blockedCount = blockedCount; }
}
