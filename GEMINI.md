# GEMINI.md - Project Overview: Custom Bookmark Manager

This document provides a comprehensive overview of the "Custom Bookmark Manager" Chrome Extension project.

## Project Overview

This project is a Chrome Extension (Manifest V3) for managing a custom set of bookmarks. It allows users to add, delete, and search their bookmarks through a simple popup interface. The extension is built using TypeScript.

The core functionality includes:
- **Bookmark Management**: Add and delete bookmarks.
- **Real-time Search**: Instantly filter bookmarks by name or URL.
- **Data Persistence**: Bookmarks are stored locally using the `chrome.storage.local` API.
- **Initialization**: On first install, the extension loads a predefined set of bookmarks from `bookmark.json`.

A detailed specification for the project exists in `SDD_SPEC.md`, which was used to guide the development.

## Project Structure

```
/
├── src/
│   ├── background.ts      # Background service worker for data handling
│   └── popup.ts           # UI logic for the popup
├── dist/                  # Compiled JavaScript output
├── icons/                 # Extension icons
├── popup.html             # The popup's HTML structure
├── manifest.json          # Chrome Extension manifest
├── bookmark.json          # Initial bookmark data
├── package.json           # NPM project configuration
└── tsconfig.json          # TypeScript configuration
```

## Building and Running

### Prerequisites
- Node.js and npm

### Build
To compile the TypeScript source code from `src/` into JavaScript in the `dist/` directory, run:
```bash
npm install
npm run build
```
For continuous development, you can use the watch command:
```bash
npm run watch
```

### Running the Extension
1.  Run `npm run build` to compile the code.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked".
5.  Select the project's root directory (`try-chromeext-01`).

**Note**: The `manifest.json` currently points to `background.js` in the root. For the extension to work correctly, you may need to manually change it to point to `dist/background.js` and `dist/popup.js` after building, or adjust the build process.

## Development Conventions

- **Language**: The project is written in TypeScript with `strict` mode enabled.
- **Architecture**: The logic is separated between a background service worker (`background.ts`) for data persistence and core actions, and a popup script (`popup.ts`) for UI interactions.
- **Communication**: The popup communicates with the background script using `chrome.runtime.sendMessage` for actions like getting/saving bookmarks and opening new tabs.
- **Specification**: Development is guided by a detailed specification document, `SDD_SPEC.md`. This file should be consulted for in-depth understanding of any feature.
