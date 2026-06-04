package com.kozen.kpm.analytics.entity;

import java.math.BigDecimal;

public class OrderStatsRow {
    private String period;
    private String projectName;
    private String customerName;
    private String region;
    private String currency;
    private BigDecimal amount;
    private Long orderCount;
    private Long productQuantity;

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public Long getOrderCount() { return orderCount; }
    public void setOrderCount(Long orderCount) { this.orderCount = orderCount; }
    public Long getProductQuantity() { return productQuantity; }
    public void setProductQuantity(Long productQuantity) { this.productQuantity = productQuantity; }
}
