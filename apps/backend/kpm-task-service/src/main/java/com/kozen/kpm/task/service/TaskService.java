package com.kozen.kpm.task.service;

import java.util.List;
import java.util.Map;

/**
 * Task domain service.
 * Responsible for task CRUD, assignee/participant maintenance,
 * attachments, comments and requirement-status synchronization.
 */
public interface TaskService {
    /** Query task list by optional keyword/status/category filters. */
    List<Map<String, Object>> list(String keyword, String status, String category);
    /** Load one task detail. */
    Map<String, Object> detail(String id);
    /** Create one task. */
    Map<String, Object> create(Map<String, Object> body);
    /** Update one task and sync linked requirement status if needed. */
    Map<String, Object> update(String id, Map<String, Object> body);
    /** Delete one task. */
    boolean delete(String id);
    /** Add one task comment. */
    Map<String, Object> addComment(String id, Map<String, Object> body);
    /** Add one task attachment record. */
    Map<String, Object> addAttachment(String id, Map<String, Object> body);
}
