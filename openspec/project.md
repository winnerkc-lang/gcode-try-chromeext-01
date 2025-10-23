# Project Context

## Purpose
This project is a basic Chrome Extension designed to serve as a starting point or boilerplate. Its primary goal is to demonstrate a setup using TypeScript and Webpack for building Chrome extensions. The extension includes a popup, a background service worker, and an options page.

## Tech Stack
- TypeScript
- Webpack
- ts-loader for TypeScript compilation
- copy-webpack-plugin for asset management

## Project Conventions

### Code Style
The project follows standard TypeScript coding conventions. Code is organized into modules based on the extension's components (popup, background service worker, options page).

### Architecture Patterns
The project follows a simple component-based architecture, with a clear separation of concerns for different parts of the extension:
- `src/popup`: Contains the logic for the extension's popup UI.
- `src/servicework`: Contains the background service worker logic.
- `src/page`: Contains the logic for the extension's options page.
- `dist`: The output directory for the bundled extension files.

### Testing Strategy
A testing strategy has not yet been defined for this project. No testing frameworks are currently included.

### Git Workflow
The Git workflow is not strictly defined. It is recommended to use feature branches and pull requests for new features or bug fixes.

## Domain Context
This is a boilerplate Chrome Extension. The core components are in place, but the specific domain logic is not yet implemented. The presence of `src/content/bookmark.json` and a host permission for `https://postman-echo.com/` suggests that future functionality might involve handling bookmarks or making API requests.

## Important Constraints
- Must adhere to Chrome Extension Manifest V3 specifications.
- All extension code must be bundled into the `dist` directory before it can be loaded into Chrome.

## External Dependencies
- The extension has host permissions for `https://postman-echo.com/`, indicating it may interact with this external service.