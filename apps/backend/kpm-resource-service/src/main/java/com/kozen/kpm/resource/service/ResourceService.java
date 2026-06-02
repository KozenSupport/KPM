package com.kozen.kpm.resource.service;

import java.util.List;
import java.util.Map;

/**
 * Resource domain service.
 * Responsible for users, departments, roles, permissions, enums, task-status transitions,
 * and current prototype pilot-state persistence.
 */
public interface ResourceService {
    /** Load all resource data required by the frontend bootstrap process. */
    Map<String, Object> bootstrap();

    /** Load persisted prototype state for pilot validation. */
    Object prototypeState();

    /** Save current prototype UI state to PostgreSQL for pilot validation. */
    boolean savePrototypeState(Map<String, Object> body);

    /** Query users with departments, roles and direct permissions. */
    List<Map<String, Object>> users();

    /** Create one user. */
    Map<String, Object> createUser(Map<String, Object> body);

    /** Update one user. */
    Map<String, Object> updateUser(String id, Map<String, Object> body);

    /** Reset one user's password to the configured default password. */
    Map<String, Object> resetUserPassword(String id);

    /** Delete one user. */
    boolean deleteUser(String id);

    /** Query flat department list. */
    List<Map<String, Object>> departments();

    /** Create one department. */
    Map<String, Object> createDepartment(Map<String, Object> body);

    /** Update one department. */
    Map<String, Object> updateDepartment(String id, Map<String, Object> body);

    /** Delete one department. */
    boolean deleteDepartment(String id);

    /** Query roles with permission code list. */
    List<Map<String, Object>> roles();

    /** Create one role and configure permissions. */
    Map<String, Object> createRole(Map<String, Object> body);

    /** Update one role and configure permissions. */
    Map<String, Object> updateRole(String id, Map<String, Object> body);

    /** Delete one role. */
    boolean deleteRole(String id);

    /** Create one enum item. */
    Map<String, Object> createEnum(Map<String, Object> body);

    /** Update one enum item. */
    Map<String, Object> updateEnum(String id, Map<String, Object> body);

    /** Delete one enum item. */
    boolean deleteEnum(String id);

    /** Create one task status transition rule. */
    Map<String, Object> createTaskStatusTransition(Map<String, Object> body);

    /** Delete one task status transition rule. */
    boolean deleteTaskStatusTransition(String id);
}
