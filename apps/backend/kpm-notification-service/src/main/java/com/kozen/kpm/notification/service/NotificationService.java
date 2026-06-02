package com.kozen.kpm.notification.service;

import java.util.List;
import java.util.Map;

public interface NotificationService {
    void processPendingEvents();
    List<Map<String, Object>> messages(String account, boolean unreadOnly);
    int unreadCount(String account);
    boolean markRead(String account, String messageId);
    Map<String, Object> settings();
}
