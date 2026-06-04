package com.kozen.kpm.order.dto;

import java.math.BigDecimal;

/** Immutable command object passed from service to mapper when persisting an order. */
public class OrderWriteCommand {
    private final String id;
    private final String orderDate;
    private final String customerId;
    private final String projectId;
    private final String skuId;
    private final String skuSnapshotJson;
    private final String orderType;
    private final String status;
    private final int quantity;
    private final String specification;
    private final String expectedShipDate;
    private final String plannedShipDate;
    private final String actualShipDate;
    private final String softwareVersion;
    private final String currency;
    private final BigDecimal unitPrice;
    private final BigDecimal amount;
    private final String creatorUserId;
    private final String creatorName;

    public OrderWriteCommand(
            String id,
            String orderDate,
            String customerId,
            String projectId,
            String skuId,
            String skuSnapshotJson,
            String orderType,
            String status,
            int quantity,
            String specification,
            String expectedShipDate,
            String plannedShipDate,
            String actualShipDate,
            String softwareVersion,
            String currency,
            BigDecimal unitPrice,
            BigDecimal amount,
            String creatorUserId,
            String creatorName
    ) {
        this.id = id;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.projectId = projectId;
        this.skuId = skuId;
        this.skuSnapshotJson = skuSnapshotJson;
        this.orderType = orderType;
        this.status = status;
        this.quantity = quantity;
        this.specification = specification;
        this.expectedShipDate = expectedShipDate;
        this.plannedShipDate = plannedShipDate;
        this.actualShipDate = actualShipDate;
        this.softwareVersion = softwareVersion;
        this.currency = currency;
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.creatorUserId = creatorUserId;
        this.creatorName = creatorName;
    }

    public String getId() { return id; }
    public String getOrderDate() { return orderDate; }
    public String getCustomerId() { return customerId; }
    public String getProjectId() { return projectId; }
    public String getSkuId() { return skuId; }
    public String getSkuSnapshotJson() { return skuSnapshotJson; }
    public String getOrderType() { return orderType; }
    public String getStatus() { return status; }
    public int getQuantity() { return quantity; }
    public String getSpecification() { return specification; }
    public String getExpectedShipDate() { return expectedShipDate; }
    public String getPlannedShipDate() { return plannedShipDate; }
    public String getActualShipDate() { return actualShipDate; }
    public String getSoftwareVersion() { return softwareVersion; }
    public String getCurrency() { return currency; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public BigDecimal getAmount() { return amount; }
    public String getCreatorUserId() { return creatorUserId; }
    public String getCreatorName() { return creatorName; }
}
