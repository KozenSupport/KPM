package com.kozen.kpm.resource.service.impl;

import com.kozen.kpm.common.util.IdUtil;
import com.kozen.kpm.common.util.JsonUtil;
import com.kozen.kpm.common.util.ValidationUtil;
import com.kozen.kpm.resource.mapper.ResourceMapper;
import com.kozen.kpm.resource.service.ResourceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Default resource service implementation.
 */
@Service
public class ResourceServiceImpl implements ResourceService {
    private static final String DEFAULT_INITIAL_PASSWORD = "123456";

    private final ResourceMapper resourceMapper;

    public ResourceServiceImpl(ResourceMapper resourceMapper) {
        this.resourceMapper = resourceMapper;
    }

    @Override
    public Map<String, Object> bootstrap() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("users", users());
        data.put("departments", departments());
        data.put("roles", roles());
        data.put("permissions", resourceMapper.permissions());
        data.put("enumItems", resourceMapper.enumItems());
        data.put("taskStatusTransitions", resourceMapper.taskStatusTransitions());
        return data;
    }

    @Override
    public Object prototypeState() {
        List<String> rows = resourceMapper.prototypeSnapshots();
        return rows.isEmpty() ? Map.of() : JsonUtil.fromJson(rows.getFirst());
    }

    @Override
    public boolean savePrototypeState(Map<String, Object> body) {
        Object state = body.getOrDefault("state", Map.of());
        String updatedBy = String.valueOf(body.getOrDefault("updatedBy", "prototype"));
        resourceMapper.upsertPrototypeSnapshot(JsonUtil.toJson(state), updatedBy);
        return true;
    }

    @Override
    public List<Map<String, Object>> users() {
        List<Map<String, Object>> rows = resourceMapper.users();
        rows.forEach(this::enrichUser);
        return rows;
    }

    @Override
    @Transactional
    public Map<String, Object> createUser(Map<String, Object> body) {
        normalizeUserEmail(body);
        validateUser(body);
        String id = id("user", body.get("account"));
        resourceMapper.insertUser(id, body);
        replaceUserRelations(id, body);
        Map<String, Object> user = getUser(id);
        user.put("defaultPassword", DEFAULT_INITIAL_PASSWORD);
        return user;
    }

    @Override
    @Transactional
    public Map<String, Object> updateUser(String id, Map<String, Object> body) {
        normalizeUserEmail(body);
        validateUser(body);
        resourceMapper.updateUser(id, body);
        replaceUserRelations(id, body);
        return getUser(id);
    }

    @Override
    public Map<String, Object> resetUserPassword(String id) {
        resourceMapper.resetUserPassword(id, "{noop}" + DEFAULT_INITIAL_PASSWORD);
        Map<String, Object> result = getUser(id);
        result.put("defaultPassword", DEFAULT_INITIAL_PASSWORD);
        return result;
    }

    @Override
    public boolean deleteUser(String id) {
        resourceMapper.deleteUser(id);
        return true;
    }

    @Override
    public List<Map<String, Object>> departments() {
        return resourceMapper.departments();
    }

    @Override
    public Map<String, Object> createDepartment(Map<String, Object> body) {
        validateDepartment(body);
        String id = id("dept", body.get("name"));
        resourceMapper.insertDepartment(id, body);
        return resourceMapper.department(id);
    }

    @Override
    public Map<String, Object> updateDepartment(String id, Map<String, Object> body) {
        validateDepartment(body);
        resourceMapper.updateDepartment(id, body);
        return resourceMapper.department(id);
    }

    @Override
    public boolean deleteDepartment(String id) {
        resourceMapper.deleteDepartment(id);
        return true;
    }

    @Override
    public List<Map<String, Object>> roles() {
        List<Map<String, Object>> rows = resourceMapper.roles();
        rows.forEach(row -> row.put("permissions", resourceMapper.rolePermissions(String.valueOf(row.get("id")))));
        return rows;
    }

    @Override
    @Transactional
    public Map<String, Object> createRole(Map<String, Object> body) {
        validateRole(body);
        String id = id("role", body.get("name"));
        resourceMapper.insertRole(id, body);
        replaceRolePermissions(id, body);
        return resourceMapper.role(id);
    }

    @Override
    @Transactional
    public Map<String, Object> updateRole(String id, Map<String, Object> body) {
        validateRole(body);
        resourceMapper.updateRole(id, body);
        replaceRolePermissions(id, body);
        return resourceMapper.role(id);
    }

    @Override
    public boolean deleteRole(String id) {
        resourceMapper.deleteRole(id);
        return true;
    }

    @Override
    public Map<String, Object> createEnum(Map<String, Object> body) {
        validateEnum(body);
        String id = id("enum", body.get("enumType") + "-" + body.get("value"));
        resourceMapper.insertEnum(id, body);
        return resourceMapper.enumItem(id);
    }

    @Override
    public Map<String, Object> updateEnum(String id, Map<String, Object> body) {
        validateEnum(body);
        resourceMapper.updateEnum(id, body);
        return resourceMapper.enumItem(id);
    }

    @Override
    public boolean deleteEnum(String id) {
        resourceMapper.deleteEnum(id);
        return true;
    }

    @Override
    public Map<String, Object> createTaskStatusTransition(Map<String, Object> body) {
        ValidationUtil.requireText(body, "fromStatus", "起始状态", 64);
        ValidationUtil.requireText(body, "toStatus", "目标状态", 64);
        Object fromStatus = body.get("fromStatus");
        Object toStatus = body.get("toStatus");
        if (fromStatus == null || toStatus == null || String.valueOf(fromStatus).isBlank() || String.valueOf(toStatus).isBlank()) {
            throw new IllegalArgumentException("fromStatus and toStatus are required");
        }
        List<String> existingIds = resourceMapper.taskStatusTransitionIdsByPair(fromStatus, toStatus);
        if (!existingIds.isEmpty()) {
            return resourceMapper.taskStatusTransition(existingIds.getFirst());
        }
        String id = id("tr-task", fromStatus + "-" + toStatus);
        resourceMapper.insertTaskStatusTransition(id, fromStatus, toStatus);
        return resourceMapper.taskStatusTransition(id);
    }

    @Override
    public boolean deleteTaskStatusTransition(String id) {
        resourceMapper.deleteTaskStatusTransition(id);
        return true;
    }

    private void enrichUser(Map<String, Object> user) {
        String id = String.valueOf(user.get("id"));
        user.put("departments", resourceMapper.userDepartments(id));
        user.put("globalRoles", resourceMapper.userRoles(id));
        user.put("directPermissions", resourceMapper.userDirectPermissions(id));
    }

    private void normalizeUserEmail(Map<String, Object> body) {
        Object rawEmail = body.get("email");
        String email = rawEmail == null ? "" : String.valueOf(rawEmail).trim();
        if (!email.isBlank()) {
            body.put("email", email);
            return;
        }
        Object account = body.get("account");
        String accountValue = account == null ? "" : String.valueOf(account).trim();
        body.put("email", accountValue.contains("@") ? accountValue : null);
    }

    private void validateUser(Map<String, Object> body) {
        ValidationUtil.requireText(body, "name", "姓名", 40);
        ValidationUtil.requireAccount(body, "account", "账号");
        ValidationUtil.optionalEmail(body, "email", "邮箱");
        ValidationUtil.maxList(body, "departments", "所属部门", 20);
        ValidationUtil.maxList(body, "globalRoles", "角色", 20);
        ValidationUtil.maxList(body, "directPermissions", "直接权限", 200);
        ValidationUtil.optionalText(body, "status", "状态", 20);
    }

    private void validateDepartment(Map<String, Object> body) {
        ValidationUtil.requireText(body, "name", "部门名称", 40);
        ValidationUtil.optionalText(body, "status", "部门状态", 20);
    }

    private void validateRole(Map<String, Object> body) {
        ValidationUtil.requireText(body, "name", "角色名称", 40);
        ValidationUtil.optionalText(body, "roleType", "角色类型", 40);
        ValidationUtil.optionalText(body, "status", "角色状态", 20);
        ValidationUtil.maxList(body, "permissions", "角色权限", 300);
    }

    private void validateEnum(Map<String, Object> body) {
        ValidationUtil.requireText(body, "enumType", "枚举类型", 64);
        ValidationUtil.requireText(body, "name", "枚举名称", 80);
        ValidationUtil.requireText(body, "value", "枚举值", 80);
        ValidationUtil.optionalText(body, "semantic", "枚举语义", 40);
    }

    private Map<String, Object> getUser(String id) {
        Map<String, Object> user = resourceMapper.user(id);
        enrichUser(user);
        return user;
    }

    @SuppressWarnings("unchecked")
    private void replaceUserRelations(String userId, Map<String, Object> body) {
        resourceMapper.deleteUserDepartments(userId);
        for (Object name : (List<Object>) body.getOrDefault("departments", List.of())) {
            List<String> ids = resourceMapper.departmentIdsByName(name);
            if (!ids.isEmpty()) {
                resourceMapper.insertUserDepartment(userId, ids.getFirst());
            }
        }
        resourceMapper.deleteUserRoles(userId);
        for (Object name : (List<Object>) body.getOrDefault("globalRoles", List.of("普通员工"))) {
            List<String> ids = resourceMapper.roleIdsByName(name);
            if (!ids.isEmpty()) {
                resourceMapper.insertUserRole(userId, ids.getFirst());
            }
        }
        resourceMapper.deleteUserPermissions(userId);
        for (Object code : (List<Object>) body.getOrDefault("directPermissions", List.of())) {
            List<String> ids = resourceMapper.permissionIdsByCode(code);
            if (!ids.isEmpty()) {
                resourceMapper.insertUserPermission(userId, ids.getFirst());
            }
        }
    }

    @SuppressWarnings("unchecked")
    private void replaceRolePermissions(String roleId, Map<String, Object> body) {
        resourceMapper.deleteRolePermissions(roleId);
        for (Object code : (List<Object>) body.getOrDefault("permissions", List.of())) {
            List<String> ids = resourceMapper.permissionIdsByCode(code);
            if (!ids.isEmpty()) {
                resourceMapper.insertRolePermission(roleId, ids.getFirst());
            }
        }
    }

    private String id(String prefix, Object seed) {
        return prefix + "-" + IdUtil.slug(String.valueOf(seed), prefix) + "-" + Long.toString(System.currentTimeMillis(), 36);
    }
}
