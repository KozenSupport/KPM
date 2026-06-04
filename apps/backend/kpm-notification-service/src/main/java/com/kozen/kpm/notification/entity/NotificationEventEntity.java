package com.kozen.kpm.notification.entity;

public class NotificationEventEntity {
    private String id;
    private String eventType;
    private String title;
    private String content;
    private String recipientUserIds;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getRecipientUserIds() { return recipientUserIds; }
    public void setRecipientUserIds(String recipientUserIds) { this.recipientUserIds = recipientUserIds; }
}
