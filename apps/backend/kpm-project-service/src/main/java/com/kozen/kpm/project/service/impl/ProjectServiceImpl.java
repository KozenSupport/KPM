package com.kozen.kpm.project.service.impl;

import com.kozen.kpm.common.util.IdUtil;
import com.kozen.kpm.common.util.JsonUtil;
import com.kozen.kpm.common.util.ValidationUtil;
import com.kozen.kpm.project.mapper.ProjectMapper;
import com.kozen.kpm.project.service.ProjectService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Default project service implementation.
 */
@Service
public class ProjectServiceImpl implements ProjectService {
    private static final String DEFAULT_TEMPLATE_ID = "tpl-standard-pos";

    private final ProjectMapper projectMapper;

    public ProjectServiceImpl(ProjectMapper projectMapper) {
        this.projectMapper = projectMapper;
    }

    @Override
    public List<Map<String, Object>> list(String keyword, String salesability, Boolean archived) {
        List<Map<String, Object>> projects = projectMapper.list(keyword, salesability, archived);
        projects.forEach(this::enrichProject);
        return projects;
    }

    @Override
    public Map<String, Object> detail(String id) {
        Map<String, Object> project = projectMapper.load(id);
        enrichProject(project);
        return project;
    }

    @Override
    @Transactional
    public Map<String, Object> create(Map<String, Object> body) {
        validateProject(body);
        String id = uniqueProjectId(String.valueOf(body.getOrDefault("externalName", "project")));
        String salesability = String.valueOf(body.getOrDefault("salesability", "不可销售"));
        Object unsellableReason = "可销售".equals(salesability) ? null : body.get("unsellableReason");
        Map<String, Object> manager = requireUser(body.get("managerAccount"), "项目负责人");
        projectMapper.insertProject(id, body, salesability, unsellableReason, String.valueOf(manager.get("id")), String.valueOf(manager.get("account")));
        replaceProjectMembers(id, body);
        createProjectStages(id, body);
        syncProjectStatus(id);
        publishProjectCreatedEvent(id, body);
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> update(String id, Map<String, Object> body) {
        validateProject(body);
        String salesability = String.valueOf(body.getOrDefault("salesability", "不可销售"));
        Object unsellableReason = "可销售".equals(salesability) ? null : body.get("unsellableReason");
        Map<String, Object> manager = requireUser(body.get("managerAccount"), "项目负责人");
        projectMapper.updateProject(id, body, salesability, unsellableReason, String.valueOf(manager.get("id")), String.valueOf(manager.get("account")));
        if (body.containsKey("members")) {
            replaceProjectMembers(id, body);
        }
        if (body.containsKey("stages")) {
            replaceStageAssignees(id, body);
        }
        syncProjectStatus(id);
        return detail(id);
    }

    @Override
    public boolean delete(String id) {
        projectMapper.deleteProject(id);
        return true;
    }

    @Override
    @Transactional
    public Map<String, Object> updateStage(String stageId, Map<String, Object> body) {
        ValidationUtil.requireText(body, "status", "阶段状态", 40);
        projectMapper.updateStageStatus(stageId, body.getOrDefault("status", "未开始"));
        Map<String, Object> stage = projectMapper.stage(stageId);
        syncProjectStatus(String.valueOf(stage.get("projectId")));
        return stage;
    }

    @Override
    @Transactional
    public Map<String, Object> replaceMembers(String id, Map<String, Object> body) {
        ValidationUtil.maxList(body, "members", "项目成员", 200);
        replaceProjectMembers(id, body);
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> linkCustomer(String projectId, Map<String, Object> body) {
        ValidationUtil.requireText(body, "customerId", "客户ID", 80);
        ValidationUtil.optionalText(body, "projectStatus", "客户项目状态", 60);
        String customerId = String.valueOf(body.get("customerId"));
        String projectStatus = String.valueOf(body.getOrDefault("projectStatus", "商机发掘"));
        List<String> existing = projectMapper.projectCustomerIds(projectId, customerId);
        if (existing.isEmpty()) {
            projectMapper.insertProjectCustomer(IdUtil.nanoId("pc"), projectId, customerId, projectStatus);
        } else {
            projectMapper.updateProjectCustomerStatus(projectId, customerId, projectStatus);
        }
        return detail(projectId);
    }

    @Override
    @Transactional
    public Map<String, Object> updateProjectCustomerStatus(String projectId, String customerId, Map<String, Object> body) {
        ValidationUtil.requireText(body, "projectStatus", "客户项目状态", 60);
        projectMapper.updateProjectCustomerStatus(projectId, customerId, body.getOrDefault("projectStatus", "商机发掘"));
        return detail(projectId);
    }

    @Override
    @Transactional
    public Map<String, Object> addStageRecord(String stageId, Map<String, Object> body) {
        ValidationUtil.requireText(body, "content", "阶段留言内容", 2000);
        ValidationUtil.optionalText(body, "author", "留言人", 60);
        ValidationUtil.optionalJsonArrayLike(body, "attachments", "阶段留言附件", 20);
        projectMapper.insertStageRecord(IdUtil.nanoId("sr"), stageId, body.getOrDefault("author", "张敏"), body.get("content"), body.get("attachments"));
        Map<String, Object> stage = projectMapper.stage(stageId);
        return detail(String.valueOf(stage.get("projectId")));
    }

    @Override
    @Transactional
    public Map<String, Object> addStageMaterial(String stageId, Map<String, Object> body) {
        ValidationUtil.validateFileMeta(body);
        projectMapper.insertStageMaterial(IdUtil.nanoId("sm"), stageId, body);
        Map<String, Object> stage = projectMapper.stage(stageId);
        return detail(String.valueOf(stage.get("projectId")));
    }

    @Override
    @Transactional
    public Map<String, Object> publishStageMaterial(String materialId) {
        Map<String, Object> material = projectMapper.stageMaterialForPublish(materialId);
        projectMapper.markStageMaterialPublished(materialId);
        projectMapper.insertProjectMaterial(IdUtil.nanoId("mat"), material);
        return detail(String.valueOf(material.get("projectId")));
    }

    @Override
    @Transactional
    public Map<String, Object> archive(String id, Map<String, Object> body) {
        if (!body.containsKey("archived")) throw new IllegalArgumentException("归档状态不能为空");
        projectMapper.archiveProject(id, body.getOrDefault("archived", true));
        return detail(id);
    }

    @Override
    public List<Map<String, Object>> requirementOverview(String id) {
        return projectMapper.requirementOverview(id);
    }

    @Override
    @Transactional
    public Map<String, Object> createRequirement(String projectId, String customerId, Map<String, Object> body) {
        validateRequirement(body);
        String requirementId = nextRequirementId();
        String taskId = null;
        if (Boolean.TRUE.equals(body.getOrDefault("createTask", true))) {
            taskId = nextTaskId();
            Map<String, Object> creator = requireUser(body.getOrDefault("creator", "张敏"), "需求关联任务创建者");
            projectMapper.insertRequirementTask(taskId, projectId, customerId, body, String.valueOf(creator.get("id")), String.valueOf(creator.get("name")));
            projectMapper.insertRequirementTaskAssignee(taskId, String.valueOf(creator.get("id")), creator.get("name"));
        }
        projectMapper.insertRequirement(requirementId, projectId, customerId, body, taskId);
        return projectMapper.requirement(requirementId);
    }

    @Override
    @Transactional
    public Map<String, Object> voidRequirement(String id) {
        projectMapper.voidRequirement(id);
        return projectMapper.requirement(id);
    }

    @Override
    public boolean deleteRequirement(String id) {
        projectMapper.deleteRequirement(id);
        return true;
    }

    @Override
    public List<Map<String, Object>> templates() {
        List<Map<String, Object>> templates = projectMapper.templates();
        templates.forEach(this::enrichTemplate);
        return templates;
    }

    @Override
    @Transactional
    public Map<String, Object> createTemplate(Map<String, Object> body) {
        validateTemplate(body);
        String id = uniqueTemplateId(String.valueOf(body.getOrDefault("name", "template")));
        projectMapper.insertTemplate(id, body);
        replaceTemplateStages(id, body);
        Map<String, Object> template = projectMapper.template(id);
        enrichTemplate(template);
        return template;
    }

    @Override
    @Transactional
    public Map<String, Object> updateTemplate(String id, Map<String, Object> body) {
        validateTemplate(body);
        projectMapper.updateTemplate(id, body);
        replaceTemplateStages(id, body);
        Map<String, Object> template = projectMapper.template(id);
        enrichTemplate(template);
        return template;
    }

    @Override
    public boolean deleteTemplate(String id) {
        projectMapper.deleteTemplate(id);
        return true;
    }

    private void enrichProject(Map<String, Object> project) {
        String id = String.valueOf(project.get("id"));
        project.put("managerName", projectMapper.managerName(project.getOrDefault("managerUserId", project.get("managerAccount"))));
        project.put("members", projectMapper.members(id));
        List<Map<String, Object>> stages = projectMapper.stages(id);
        stages.forEach(stage -> {
            Object stageId = stage.get("id");
            stage.put("assignees", projectMapper.stageAssignees(stageId));
            stage.put("materials", projectMapper.stageMaterials(stageId));
            stage.put("records", projectMapper.stageRecords(stageId));
        });
        project.put("stages", stages);

        List<Map<String, Object>> projectCustomers = projectMapper.projectCustomers(id);
        projectCustomers.forEach(projectCustomer -> projectCustomer.put("requirements", projectMapper.requirements(id, projectCustomer.get("customerId"))));
        project.put("projectCustomers", projectCustomers);
        project.put("projectMaterials", projectMapper.projectMaterials(id));
    }

    private void enrichTemplate(Map<String, Object> template) {
        template.put("stages", projectMapper.templateStageNames(String.valueOf(template.get("id"))));
    }

    private void validateProject(Map<String, Object> body) {
        ValidationUtil.requireText(body, "externalName", "项目对外名称", 120);
        ValidationUtil.requireText(body, "internalName", "项目内部名称", 120);
        ValidationUtil.requireText(body, "modelName", "Model 名称", 120);
        ValidationUtil.requireAccount(body, "managerAccount", "项目负责人账号");
        ValidationUtil.optionalText(body, "status", "项目状态", 40);
        ValidationUtil.optionalText(body, "salesability", "可销售状态", 40);
        if (!"可销售".equals(String.valueOf(body.getOrDefault("salesability", "")))) {
            ValidationUtil.optionalText(body, "unsellableReason", "不可销售原因", 120);
        }
        ValidationUtil.optionalText(body, "description", "项目描述", 2000);
        ValidationUtil.maxList(body, "members", "项目成员", 200);
        ValidationUtil.maxList(body, "stages", "项目阶段", 80);
    }

    private void validateRequirement(Map<String, Object> body) {
        ValidationUtil.requireText(body, "title", "需求标题", 120);
        ValidationUtil.requireText(body, "userStory", "用户故事", 1500);
        ValidationUtil.requireText(body, "businessValue", "业务价值", 1000);
        ValidationUtil.requireText(body, "acceptance", "验收标准", 1500);
        ValidationUtil.requireText(body, "priority", "优先级", 20);
        ValidationUtil.optionalText(body, "status", "需求状态", 40);
        ValidationUtil.optionalText(body, "proposer", "提出人", 60);
        ValidationUtil.optionalText(body, "creator", "创建人", 60);
    }

    private void validateTemplate(Map<String, Object> body) {
        ValidationUtil.requireText(body, "name", "模板名称", 80);
        ValidationUtil.requireText(body, "scope", "适用范围", 120);
        ValidationUtil.optionalText(body, "status", "模板状态", 20);
        ValidationUtil.maxList(body, "stages", "模板阶段", 80);
    }

    @SuppressWarnings("unchecked")
    private void createProjectStages(String projectId, Map<String, Object> body) {
        List<Object> providedStages = (List<Object>) body.getOrDefault("stages", List.of());
        if (!providedStages.isEmpty()) {
            int order = 1;
            for (Object rawStage : providedStages) {
                Map<String, Object> stage = rawStage instanceof Map<?, ?> ? (Map<String, Object>) rawStage : Map.of("name", rawStage);
                String stageId = IdUtil.nanoId("st");
                String stageName = String.valueOf(stage.getOrDefault("name", stage.getOrDefault("stageName", "未命名阶段")));
                projectMapper.insertStage(stageId, projectId, stageName, order++, stage.getOrDefault("status", "未开始"));
                insertStageAssignees(stageId, stage);
            }
            return;
        }

        List<String> stages = projectMapper.templateStageNames(DEFAULT_TEMPLATE_ID);
        int order = 1;
        for (String stage : stages) {
            projectMapper.insertStage(IdUtil.nanoId("st"), projectId, stage, order++, "未开始");
        }
    }

    @SuppressWarnings("unchecked")
    private void replaceProjectMembers(String projectId, Map<String, Object> body) {
        projectMapper.deleteMembers(projectId);
        List<Object> members = new ArrayList<>((List<Object>) body.getOrDefault("members", List.of()));
        String managerAccount = String.valueOf(body.getOrDefault("managerAccount", ""));
        boolean hasManager = members.stream()
                .filter(item -> item instanceof Map<?, ?>)
                .map(item -> (Map<String, Object>) item)
                .anyMatch(item -> managerAccount.equals(String.valueOf(item.getOrDefault("userAccount", item.getOrDefault("account", "")))));
        if (!managerAccount.isBlank() && !hasManager) {
            members.add(Map.of("userAccount", managerAccount, "role", "项目负责人"));
        }
        for (Object rawMember : members) {
            if (!(rawMember instanceof Map<?, ?>)) {
                continue;
            }
            Map<String, Object> member = (Map<String, Object>) rawMember;
            String account = String.valueOf(member.getOrDefault("userAccount", member.getOrDefault("account", "")));
            if (account.isBlank()) {
                continue;
            }
            String role = String.valueOf(member.getOrDefault("role", member.getOrDefault("roleName", "普通员工")));
            Map<String, Object> user = requireUser(account, "项目成员");
            projectMapper.insertMember(IdUtil.nanoId("pm"), projectId, String.valueOf(user.get("id")), String.valueOf(user.get("account")), role);
        }
    }

    @SuppressWarnings("unchecked")
    private void replaceStageAssignees(String projectId, Map<String, Object> body) {
        List<Object> stages = (List<Object>) body.getOrDefault("stages", List.of());
        for (Object rawStage : stages) {
            if (!(rawStage instanceof Map<?, ?>)) {
                continue;
            }
            Map<String, Object> stage = (Map<String, Object>) rawStage;
            String stageId = stringValue(stage.get("id"));
            if (stageId == null) {
                String stageName = stringValue(stage.getOrDefault("name", stage.get("stageName")));
                List<String> ids = projectMapper.stageIdsByName(projectId, stageName);
                if (!ids.isEmpty()) {
                    stageId = ids.getFirst();
                }
            }
            if (stageId == null) {
                continue;
            }
            if (stage.containsKey("status")) {
                projectMapper.updateStageStatus(stageId, stage.get("status"));
            }
            projectMapper.deleteStageAssignees(stageId);
            insertStageAssignees(stageId, stage);
        }
    }

    @SuppressWarnings("unchecked")
    private void insertStageAssignees(String stageId, Map<String, Object> stage) {
        for (Object rawAssignee : (List<Object>) stage.getOrDefault("assignees", List.of())) {
            if (!(rawAssignee instanceof Map<?, ?>)) {
                continue;
            }
            Map<String, Object> assignee = (Map<String, Object>) rawAssignee;
            String type = String.valueOf(assignee.getOrDefault("type", assignee.getOrDefault("assigneeType", "user")));
            String account = stringValue(assignee.get("account"));
            Object nameValue = assignee.getOrDefault("name", assignee.get("assigneeName"));
            String userId = null;
            String name = nameValue == null ? null : String.valueOf(nameValue);
            if ("user".equals(type)) {
                Map<String, Object> user = requireUser(account != null ? account : nameValue, "阶段负责人");
                userId = String.valueOf(user.get("id"));
                account = String.valueOf(user.get("account"));
                name = String.valueOf(user.get("name"));
            }
            if (name == null || "null".equals(name) || name.isBlank()) {
                continue;
            }
            projectMapper.insertStageAssignee(IdUtil.nanoId("sa"), stageId, type, name, account, userId);
        }
    }

    private void syncProjectStatus(String projectId) {
        List<String> statuses = projectMapper.stageStatuses(projectId);
        String nextStatus = "未开始";
        if (!statuses.isEmpty() && statuses.stream().allMatch("已完成"::equals)) {
            nextStatus = "已完成";
        } else if (statuses.stream().anyMatch("进行中"::equals)) {
            nextStatus = "进行中";
        }
        projectMapper.updateProjectStatus(projectId, nextStatus);
    }

    @SuppressWarnings("unchecked")
    private void replaceTemplateStages(String templateId, Map<String, Object> body) {
        projectMapper.deleteTemplateStages(templateId);
        int sortOrder = 1;
        for (Object stage : (List<Object>) body.getOrDefault("stages", List.of())) {
            projectMapper.insertTemplateStage(IdUtil.nanoId("tpl-stage"), templateId, stage, sortOrder++);
        }
    }

    @SuppressWarnings("unchecked")
    private void publishProjectCreatedEvent(String projectId, Map<String, Object> body) {
        List<String> recipients = new ArrayList<>();
        recipients.add(String.valueOf(requireUser(body.get("managerAccount"), "项目负责人").get("id")));
        for (Object rawMember : (List<Object>) body.getOrDefault("members", List.of())) {
            if (!(rawMember instanceof Map<?, ?> rawMap)) continue;
            @SuppressWarnings("unchecked")
            Map<String, Object> member = (Map<String, Object>) rawMap;
            Object account = member.getOrDefault("userAccount", member.get("account"));
            recipients.add(String.valueOf(requireUser(account, "项目成员").get("id")));
        }
        List<String> distinctRecipients = recipients.stream().filter(value -> value != null && !value.isBlank()).distinct().toList();
        if (distinctRecipients.isEmpty()) {
            return;
        }
        projectMapper.insertNotificationEvent(
                IdUtil.nanoId("evt"),
                "PROJECT_CREATED",
                projectId,
                "你被加入新项目",
                "项目 " + body.get("externalName") + " 已创建，你已被加入项目成员。",
                JsonUtil.toJson(distinctRecipients)
        );
    }

    private Map<String, Object> requireUser(Object accountOrName, String label) {
        String value = stringValue(accountOrName);
        if (value == null) {
            throw new IllegalArgumentException(label + "必须从已有用户中选择");
        }
        List<Map<String, Object>> users = projectMapper.usersByAccountOrName(value);
        if (users.isEmpty()) {
            throw new IllegalArgumentException(label + "不存在，请从已有用户中选择");
        }
        return users.getFirst();
    }

    private String uniqueProjectId(String source) {
        String base = IdUtil.slug(source, "project");
        String candidate = base;
        int index = 2;
        while (!projectMapper.projectIds(candidate).isEmpty()) {
            candidate = base + "-" + index++;
        }
        return candidate;
    }

    private String uniqueTemplateId(String source) {
        String base = "tpl-" + IdUtil.slug(source, "template");
        String candidate = base;
        int index = 2;
        while (!projectMapper.templateIds(candidate).isEmpty()) {
            candidate = base + "-" + index++;
        }
        return candidate;
    }

    private String nextRequirementId() {
        Integer max = projectMapper.maxRequirementNumber();
        return "REQ-" + String.format("%03d", (max == null ? 0 : max) + 1);
    }

    private String nextTaskId() {
        Integer max = projectMapper.maxTaskNumber();
        return "KPM-" + ((max == null ? 100 : max) + 1);
    }

    private String stringValue(Object value) {
        if (value == null || String.valueOf(value).isBlank()) {
            return null;
        }
        return String.valueOf(value);
    }
}
