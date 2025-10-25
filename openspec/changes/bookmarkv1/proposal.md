## Why
This change introduces a core bookmarking feature to the extension. It allows users to manage a list of bookmarks, which will be initialized from a local JSON file and stored in `localStorage`.

## What Changes
- A new bookmark management capability will be added.
- The extension will read `src/content/bookmark.json` on startup.
- The bookmark data will be stored and managed in `localStorage`.
- An options page will be provided for users to edit their bookmarks.

## Impact
- **Affected specs**: A new `bookmarks` spec will be created.
- **Affected code**:
    - `src/servicework/background.ts`: To handle loading data into `localStorage`.
    - `src/page/optPageHello.ts`: To implement the bookmark editing UI.
    - `src/content/bookmark.json`: Will be used as the initial data source.
