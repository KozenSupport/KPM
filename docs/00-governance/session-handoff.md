# Session Handoff

> Prepared for future KPM sessions.

## What the user wants from the assistant

Act as:

- a seasoned internet project manager
- a seasoned developer
- a seasoned product manager

Guide the user through:

1. requirements and prototype
2. technical solution
3. development
4. acceptance and deployment

Use `/Users/henry/Documents/KPM` as the single workspace root and keep files clearly categorized.

## Current user preference

The user prefers to **complete the full product prototype before entering Phase 2**.

Do not prematurely move to technical architecture until the user confirms the prototype is sufficiently complete.

## Latest accepted decisions

1. Replace `组织与权限` with `资源管理`
2. Customer master data belongs in resource management
3. Project customers are linked separately from customer master data
4. Customer statuses are configurable enum values controlled by permission
5. Stages are parallel, not a single linear current step
6. Each stage has a detail page
7. Stage detail contains:
   - stage files
   - time-ordered records / comments with attachments
8. Stage-detail access is the boundary for stage-file visibility
9. Reusable stage materials are explicitly published to the project materials area
10. Chinese and English are required
11. Task management is lightweight daily-task tracking, not a Jira replacement
12. Customer requirements support create / invalidate / delete actions
13. Requirement invalidation is preferred over hard deletion for normal business use
14. Standalone delay workflow is postponed; delays are represented through task handling for now
15. Blocker help is created from stage detail as a task routed to the stage owner, with the project manager added as participant
16. Requirement creation can create a linked task by default, assigned to the requirement creator
17. Requirement cards store linked task IDs and jump to task detail
18. Linked task outcome semantics synchronize requirement status (completed → implemented, rejected → rejected)
19. Task detail is now part of the prototype
20. Tasks have categories: requirement, bug, technical support, other
21. Resource management now has prototype CRUD for users, departments, roles, permissions, customers, and customer-status options
22. Users are enabled / disabled rather than physically deleted
23. Project creation now creates a real project record in the prototype
24. Projects use archive / restore instead of physical deletion and support archive-state filtering
25. Authorization is now a two-path model: role grants plus user direct grants; departments no longer directly carry permissions
26. User departments are selected from configured departments, and department member counts are derived automatically from users
27. Permission management now maintains the permission dictionary only; assignment happens in user and role management
28. Project managers reference real users
29. Project members reference real users and receive project-specific roles
30. Stage responsibility references real users and/or departments, and one stage may have multiple responsible parties
31. Project managers are automatically added to project members
32. Workflow-template maintenance now supports create / query / edit / copy / enable / disable / delete, with deletion limited to draft or disabled templates
33. Only enabled workflow templates can be selected during project creation
34. Permission management is now a read-only catalog generated from real menus and real business buttons
35. Permissions are split into menu permissions and button permissions, with type filtering on the permission page
36. Task statuses are globally configurable and allowed status transitions are configurable
37. Task statuses carry ordinary / completed / rejected semantics so requirement sync survives custom labels
38. Stage-detail task creation now happens in a modal on the same page
39. Project detail shows member count only; member maintenance happens in a modal
40. Stage detail no longer supports “share to later stages”; it only publishes to project materials
41. Customers support multiple sales owners and multiple technical-support owners
42. Order management is part of the prototype, including CRUD, amount calculation, and modification audit records
43. Statistics dashboard now includes order statistics, resource allocation, and technical-support views
44. Login / logout flow is represented, including the interactive four-character login page

## Current prototype artifacts

- The clickable prototype is in `apps/frontend/prototype/`
- The latest screenshots are in `assets/prototype-screenshots/`
- The current backlog for still-missing prototype areas is in `docs/02-prototype/full-prototype-backlog.md`

## Recommended next step

Prototype the next remaining collaboration area before Phase 2. The strongest next candidate is:

1. approval flow
2. then Jira integration flow
3. then DingTalk / notification-center behavior

This order is recommended because these flows will materially influence future architecture, permissions, and notification design.

## How to behave in the next session

- Start by reading `START-HERE.md`
- Reconstruct current project state from the project files
- Confirm continuity briefly to the user
- Continue from the active prototype backlog instead of re-asking already-decided questions
- If a new user request conflicts with an accepted decision, surface the tradeoff and update the decision log if the user changes direction
