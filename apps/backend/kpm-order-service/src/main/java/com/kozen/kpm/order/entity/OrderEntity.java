package com.kozen.kpm.order.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/** Persistence projection for order list/detail queries. */
public class OrderEntity {
    private String id;
    private LocalDate orderDate;
    private String customerId;
    private String customerName;
    private String region;
    private String projectId;
    private String projectName;
    private String skuId;
    private Object skuSnapshot;
    private String orderType;
    private String status;
    private Integer quantity;
    private String specification;
    private LocalDate expectedShipDate;
    private LocalDate plannedShipDate;
    private LocalDate actualShipDate;
    private String softwareVersion;
    private String currency;
    private BigDecimal unitPrice;
    private BigDecimal amount;
    private String creatorUserId;
    private String creator;
    private String wholeMachinePartNumber;
    private String configurationName;
    private String memoryType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public LocalDate getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDate orderDate) { this.orderDate = orderDate; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }
    public String getSkuId() { return skuId; }
    public void setSkuId(String skuId) { this.skuId = skuId; }
    public Object getSkuSnapshot() { return skuSnapshot; }
    public void setSkuSnapshot(Object skuSnapshot) { this.skuSnapshot = skuSnapshot; }
    public String getOrderType() { return orderType; }
    public void setOrderType(String orderType) { this.orderType = orderType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getSpecification() { return specification; }
    public void setSpecification(String specification) { this.specification = specification; }
    public LocalDate getExpectedShipDate() { return expectedShipDate; }
    public void setExpectedShipDate(LocalDate expectedShipDate) { this.expectedShipDate = expectedShipDate; }
    public LocalDate getPlannedShipDate() { return plannedShipDate; }
    public void setPlannedShipDate(LocalDate plannedShipDate) { this.plannedShipDate = plannedShipDate; }
    public LocalDate getActualShipDate() { return actualShipDate; }
    public void setActualShipDate(LocalDate actualShipDate) { this.actualShipDate = actualShipDate; }
    public String getSoftwareVersion() { return softwareVersion; }
    public void setSoftwareVersion(String softwareVersion) { this.softwareVersion = softwareVersion; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getCreatorUserId() { return creatorUserId; }
    public void setCreatorUserId(String creatorUserId) { this.creatorUserId = creatorUserId; }
    public String getCreator() { return creator; }
    public void setCreator(String creator) { this.creator = creator; }
    public String getWholeMachinePartNumber() { return wholeMachinePartNumber; }
    public void setWholeMachinePartNumber(String wholeMachinePartNumber) { this.wholeMachinePartNumber = wholeMachinePartNumber; }
    public String getConfigurationName() { return configurationName; }
    public void setConfigurationName(String configurationName) { this.configurationName = configurationName; }
    public String getMemoryType() { return memoryType; }
    public void setMemoryType(String memoryType) { this.memoryType = memoryType; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
