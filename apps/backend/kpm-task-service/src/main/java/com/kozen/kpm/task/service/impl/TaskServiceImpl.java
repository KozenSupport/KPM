package com.kozen.kpm.task.service.impl;

import com.kozen.kpm.common.util.IdUtil;
import com.kozen.kpm.common.util.JsonUtil;
import com.kozen.kpm.common.util.SqlParamUtil;
import com.kozen.kpm.common.util.ValidationUtil;
import com.kozen.kpm.task.mapper.TaskMapper;
import com.kozen.kpm.task.service.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/** Default task service implementation. */
@Service
public class TaskServiceImpl implements TaskService {
    private final TaskMapper taskMapper;
    public TaskServiceImpl(TaskMapper taskMapper) { this.taskMapper = taskMapper; }

    @Override
    public List<Map<String, Object>> list(String keyword, String status, String category) {
        String like = SqlParamUtil.likeOrBlank(keyword);
        String st = SqlParamUtil.blankIfAll(status);
        String cat = SqlParamUtil.blankIfAll(category);
        List<Map<String, Object>> rows = taskMapper.list(like, st, cat);
        rows.forEach(this::enrichTask);
        return rows;
    }

    @Override
    public Map<String, Object> detail(String id) { Map<String, Object> task = taskMapper.load(id); enrichTask(task); return task; }

    @Override
    @Transactional
    public Map<String, Object> create(Map<String, Object> body) {
        validateTask(body);
        String id = body.get("id") == null || String.valueOf(body.get("id")).isBlank() ? nextTaskId() : String.valueOf(body.get("id"));
        Map<String, Object> creator = requireUser(body.getOrDefault("creator", "张敏"), "任务创建者");
        taskMapper.insert(id, body, SqlParamUtil.stringOrNull(body.get("projectId")), SqlParamUtil.stringOrNull(body.get("stageId")), SqlParamUtil.stringOrNull(body.get("customerId")), String.valueOf(creator.get("id")), String.valueOf(creator.get("name")));
        replacePeople(id, body);
        publishTaskCreatedEvent(id, body);
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> update(String id, Map<String, Object> body) {
        validateTask(body);
        taskMapper.updateTask(id, body, SqlParamUtil.stringOrNull(body.get("projectId")), SqlParamUtil.stringOrNull(body.get("stageId")), SqlParamUtil.stringOrNull(body.get("customerId")));
        replacePeople(id, body);
        syncRequirementByTaskStatus(id, String.valueOf(body.getOrDefault("status", "")));
        return detail(id);
    }

    @Override
    public boolean delete(String id) { taskMapper.deleteById(id); return true; }

    @Override
    public Map<String, Object> addComment(String id, Map<String, Object> body) {
        ValidationUtil.requireText(body, "content", "评论内容", 2000);
        ValidationUtil.optionalJsonArrayLike(body, "attachments", "评论附件", 20);
        taskMapper.insertComment(IdUtil.nanoId("tc"), id, body.getOrDefault("author", "张敏"), body.get("content"), body.get("attachments"));
        return detail(id);
    }

    @Override
    public Map<String, Object> addAttachment(String id, Map<String, Object> body) {
        ValidationUtil.validateFileMeta(body);
        taskMapper.insertAttachment(IdUtil.nanoId("ta"), id, body);
        return detail(id);
    }

    private void validateTask(Map<String, Object> body) {
        ValidationUtil.requireText(body, "title", "任务标题", 120);
        ValidationUtil.optionalText(body, "description", "任务描述", 3000);
        ValidationUtil.optionalText(body, "projectId", "项目ID", 80);
        ValidationUtil.optionalText(body, "stageId", "阶段ID", 80);
        ValidationUtil.optionalText(body, "customerId", "客户ID", 80);
        ValidationUtil.requireText(body, "category", "任务分类", 40);
        ValidationUtil.requireText(body, "status", "任务状态", 40);
        ValidationUtil.requireText(body, "priority", "优先级", 20);
        ValidationUtil.requireText(body, "creator", "创建人", 60);
        ValidationUtil.optionalDate(body, "expectedCompletionAt", "预期完成时间");
        ValidationUtil.optionalDate(body, "dueDate", "截止时间");
        ValidationUtil.optionalText(body, "source", "任务来源", 80);
        ValidationUtil.maxList(body, "assignees", "执行者", 30);
        ValidationUtil.maxList(body, "participants", "参与者", 50);
    }

    private void enrichTask(Map<String, Object> task) {
        String id = String.valueOf(task.get("id"));
        task.put("assignees", taskMapper.assignees(id));
        task.put("participants", taskMapper.participants(id));
        task.put("attachments", taskMapper.attachments(id));
        task.put("comments", taskMapper.comments(id));
    }

    @SuppressWarnings("unchecked")
    private void replacePeople(String taskId, Map<String, Object> body) {
        taskMapper.deleteAssignees(taskId);
        for (Object name : (List<Object>) body.getOrDefault("assignees", List.of())) {
            Map<String, Object> user = requireUser(name, "执行者");
            taskMapper.insertAssignee(taskId, String.valueOf(user.get("id")), user.get("name"));
        }
        taskMapper.deleteParticipants(taskId);
        for (Object name : (List<Object>) body.getOrDefault("participants", List.of())) {
            Map<String, Object> user = requireUser(name, "参与者");
            taskMapper.insertParticipant(taskId, String.valueOf(user.get("id")), user.get("name"));
        }
    }

    @SuppressWarnings("unchecked")
    private void publishTaskCreatedEvent(String taskId, Map<String, Object> body) {
        List<String> recipients = ((List<Object>) body.getOrDefault("assignees", List.of())).stream()
                .map(person -> requireUser(person, "通知接收人"))
                .map(user -> String.valueOf(user.get("id")))
                .distinct()
                .toList();
        if (recipients.isEmpty()) {
            return;
        }
        taskMapper.insertNotificationEvent(
                IdUtil.nanoId("evt"),
                "TASK_CREATED",
                taskId,
                "新任务已分配",
                "任务 " + taskId + "：" + body.get("title") + " 已创建并分配给你。",
                JsonUtil.toJson(recipients)
        );
    }

    private Map<String, Object> requireUser(Object accountOrName, String label) {
        if (accountOrName == null || String.valueOf(accountOrName).isBlank()) {
            throw new IllegalArgumentException(label + "必须从已有用户中选择");
        }
        List<Map<String, Object>> users = taskMapper.usersByAccountOrName(accountOrName);
        if (users.isEmpty()) {
            throw new IllegalArgumentException(label + "不存在，请从已有用户中选择");
        }
        return users.getFirst();
    }

    private void syncRequirementByTaskStatus(String taskId, String status) {
        if ("已完成".equals(status)) taskMapper.syncRequirement(taskId, "已实现");
        else if ("已拒绝".equals(status)) taskMapper.syncRequirement(taskId, "已拒绝");
    }

    private String nextTaskId() {
        Integer max = taskMapper.maxTaskNumber();
        return "KPM-" + ((max == null ? 100 : max) + 1);
    }
}
