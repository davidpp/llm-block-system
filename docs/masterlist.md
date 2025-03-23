# LLM-Block-System Registry Masterlist

This document serves as the central reference for all components, modules, functionalities, and artifacts of the LLM-Block-System project.

## Modules

| ID | Name | Type | Status | Description |
|----|------|------|--------|-------------|
| MOD-001 | Core System | capability | active | Core framework functionality including context, state management, and types |
| MOD-002 | LLM Integration | capability | planned | Integration with LLMs using Vercel AI SDK and response parsing |
| MOD-003 | Rendering System | capability | planned | Components for rendering blocks and explanations |

## Functionalities

| ID | Name | Module | Status | Description |
|----|------|--------|--------|-------------|
| FUNC-001 | Block System Context | MOD-001 | active | Core context provider for the block system |
| FUNC-002 | Block System Provider | MOD-001 | planned | React provider component with state management |
| FUNC-003 | Type Definitions | MOD-001 | active | TypeScript interfaces for the system |
| FUNC-004 | Validation Schemas | MOD-001 | planned | Zod schemas for validation |
| FUNC-005 | Block System Hooks | MOD-001 | planned | React hooks for accessing block system functionality |

## Artifacts

| ID | Name | Type | Status | Related Functionality | Location |
|----|------|------|--------|----------------------|----------|
| ART-001 | types.ts | interface | active | FUNC-003 | src/lib/block-system/types.ts |
| ART-002 | context.tsx | component | active | FUNC-001 | src/lib/block-system/context.tsx |

## Documents

| ID | Title | Type | Status | Version | Location |
|----|-------|------|--------|---------|----------|
| DOC-001 | Vision Document | vision | active | 1.0 | docs/vision-document.md |
| DOC-002 | Technical Design | design | active | 1.0 | docs/technical-design.md |
| DOC-003 | Implementation Plan | plan | active | 1.0 | docs/implementation-plan.md |
| DOC-004 | GitHub Issues | reference | active | 1.0 | docs/github-issues.md |

## Initiatives

| ID | Name | Status | Description |
|----|------|--------|-------------|
| INIT-001 | MVP Development | active | Core framework and basic block referencing |
| INIT-002 | Explanation System | planned | Explanation capabilities and new block creation |
| INIT-003 | Advanced Features | planned | Hierarchical blocks and advanced functionality |

## Relationship Types Reference

| Type | Description |
|------|-------------|
| implements | Shows how elements fulfill higher-level requirements |
| realizes | Shows concrete delivery of features |
| contributes-to | Shows partial support for higher-level elements |
| depends-on | Shows technical dependencies |
| composes | Shows parent-child hierarchies |
| contains | Shows ownership/encapsulation |
| belongs-to | Inverse of contains |
| references | Shows informational connections |
| documents | Shows documentation relationship |
| uses | Shows component consumption |
| extends | Shows enhancements to existing elements |