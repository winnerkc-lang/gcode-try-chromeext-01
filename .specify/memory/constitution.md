<!--
---
Sync Impact Report
---
Version Change: None → 1.0.0
Modified Principles: N/A (Initial Creation)
New Sections: Core Principles, Build & Deployment, Data Handling, Governance
Removed Sections: N/A
Templates to Update:
  - .specify/templates/plan-template.md (⚠ Pending)
  - .specify/templates/spec-template.md (⚠ Pending)
  - .specify/templates/tasks-template.md (⚠ Pending)
TODOs: None
-->

# Custom Bookmark Manager Constitution

## Core Principles

### I. Modular Architecture
Logic MUST be separated between a background service worker (`background.ts`) for data persistence and core actions, and a popup script (`popup.ts`) for UI interactions. This separation ensures maintainability and clarity of roles.

### II. Asynchronous Communication
The popup communicates with the background script exclusively through asynchronous messages using `chrome.runtime.sendMessage`. This prevents blocking the UI and adheres to Chrome Extension best practices.

### III. Centralized Data Management
All bookmark data MUST be managed by the background script and persisted using the `chrome.storage.local` API. The UI is responsible for querying and displaying data but not for direct storage.

### IV. Strict Typing
The entire codebase MUST be written in TypeScript with `strict` mode enabled. This ensures type safety and reduces runtime errors.

### V. Specification-Driven Development
All development MUST be guided by the detailed specification document (`SDD_SPEC.md`). This ensures that features are implemented as intended and provides a single source of truth for project requirements.

## Build & Deployment

The project MUST be built using `npm run build`, which compiles TypeScript to JavaScript in the `dist/` directory using Webpack. For local development and testing, the extension is loaded as an unpacked extension in Chrome.

## Data Handling

On first installation, the extension's storage is initialized with a predefined set of bookmarks from `bookmark.json`. All subsequent bookmark operations (add, delete, search) are handled by the background script.

## Governance

- This Constitution is the single source of truth for development principles and practices.
- Any amendments to this constitution require a documented proposal, review, and approval process.
- All code contributions and reviews MUST verify compliance with these principles. Deviations require explicit, justified approval.

**Version**: 1.0.0 | **Ratified**: 2025-10-19 | **Last Amended**: 2025-10-19