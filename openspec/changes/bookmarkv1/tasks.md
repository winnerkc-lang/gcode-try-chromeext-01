## 1. Implementation
- [ ] 1.1 Implement logic in the background script (`background.ts`) to read `bookmark.json` and copy its contents to `localStorage` on extension startup. The data should only be copied if it doesn't already exist in `localStorage` or if the version in the JSON file is newer.
- [ ] 1.2 Create the UI for the options page (`optPageHello.html` and `optPageHello.ts`) to display the bookmarks from `localStorage`.
- [ ] 1.3 Implement editing functionality on the options page, allowing users to add, modify, and delete bookmarks. Changes should be saved back to `localStorage`.
- [ ] 1.4 Ensure the version number is handled correctly during data initialization and updates.
- [ ] 1.5 Write tests for the bookmark management logic.
