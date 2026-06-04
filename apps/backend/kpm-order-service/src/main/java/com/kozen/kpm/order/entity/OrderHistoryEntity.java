package com.kozen.kpm.order.entity;

import java.time.LocalDateTime;

/** Persistence projection for one order modification history row. */
public class OrderHistoryEntity {
    private String id;
    private String orderId;
    private String modifier;
    private LocalDateTime modifiedAt;
    private String changes;
    private String reason;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getModifier() { return modifier; }
    public void setModifier(String modifier) { this.modifier = modifier; }
    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }
    public String getChanges() { return changes; }
    public void setChanges(String changes) { this.changes = changes; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
