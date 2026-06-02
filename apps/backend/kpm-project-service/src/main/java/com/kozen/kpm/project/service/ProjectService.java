package com.kozen.kpm.project.service;

import java.util.List;
import java.util.Map;

/**
 * Project domain service.
 * Responsible for project master data, project members, stages, stage materials,
 * stage records, project-customer links, requirements and process templates.
 */
public interface ProjectService {
    /** Query project list by keyword, salesability and archive status. */
    List<Map<String, Object>> list(String keyword, String salesability, Boolean archived);

    /** Load one project with members, stages, customers, requirements and materials. */
    Map<String, Object> detail(String id);

    /** Create a project, initialize members and project stages, then sync project status. */
    Map<String, Object> create(Map<String, Object> body);

    /** Update project base data, optionally replacing members and stage assignees. */
    Map<String, Object> update(String id, Map<String, Object> body);

    /** Delete one project by ID. */
    boolean delete(String id);

    /** Update stage status and sync the derived project status. */
    Map<String, Object> updateStage(String stageId, Map<String, Object> body);

    /** Replace all project members. */
    Map<String, Object> replaceMembers(String id, Map<String, Object> body);

    /** Link or update a customer under the project. */
    Map<String, Object> linkCustomer(String projectId, Map<String, Object> body);

    /** Update a customer's project-specific lifecycle status. */
    Map<String, Object> updateProjectCustomerStatus(String projectId, String customerId, Map<String, Object> body);

    /** Add a forum-style stage record. */
    Map<String, Object> addStageRecord(String stageId, Map<String, Object> body);

    /** Add one stage material metadata record. */
    Map<String, Object> addStageMaterial(String stageId, Map<String, Object> body);

    /** Publish a stage material to the project material area. */
    Map<String, Object> publishStageMaterial(String materialId);

    /** Archive or unarchive a project. */
    Map<String, Object> archive(String id, Map<String, Object> body);

    /** Summarize common requirements across customers under one project. */
    List<Map<String, Object>> requirementOverview(String id);

    /** Create a requirement and optionally create a linked task. */
    Map<String, Object> createRequirement(String projectId, String customerId, Map<String, Object> body);

    /** Mark a requirement as void. */
    Map<String, Object> voidRequirement(String id);

    /** Delete a requirement by ID. */
    boolean deleteRequirement(String id);

    /** Query all process templates with stages. */
    List<Map<String, Object>> templates();

    /** Create one process template. */
    Map<String, Object> createTemplate(Map<String, Object> body);

    /** Update one process template and replace its stages. */
    Map<String, Object> updateTemplate(String id, Map<String, Object> body);

    /** Delete one process template. */
    boolean deleteTemplate(String id);
}
