# KPM — Start Here

If you are continuing KPM in a new conversation, read these files in order before making product or technical decisions:

1. `README.md`
2. `docs/00-governance/project-state.md`
3. `docs/00-governance/session-handoff.md`
4. `docs/00-governance/decision-log.md`
5. `docs/01-requirements/prd.md`
6. `docs/03-architecture/technical-solution.md`
7. `docs/02-prototype/full-prototype-backlog.md`

## Project identity

- **Project:** KPM — Kozen Project Management
- **Organization:** Kozen
- **Workspace root:** `/Users/henry/Documents/KPM`
- **Current phase:** Phase 2 — Technical solution

## How to continue

Before doing new work:

1. Reconstruct the current product model from the documents above
2. Compare any new request with the accepted decisions in `decision-log.md`
3. Update the relevant source-of-truth documents when decisions change
4. Keep all project files inside this workspace

## Current continuation point

The project has entered Phase 2. The current continuation point is the revised distributed Java microservice technical proposal in:

- `docs/03-architecture/technical-solution.md`

The latest architecture direction is: controlled microservices, 1000 concurrent users, Nacos-based service/config governance, free/open-source components by default, Eclipse Temurin OpenJDK 21 rather than Oracle JDK 8, PostgreSQL, Valkey-compatible cache, built-in IAM login, Alibaba Cloud OSS file storage, and Kubernetes-ready deployment.
