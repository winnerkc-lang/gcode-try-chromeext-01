/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/servicework/background.ts":
/*!***************************************!*\
  !*** ./src/servicework/background.ts ***!
  \***************************************/
/***/ (function() {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/servicework/background.ts
console.log('background script loaded');
// Normalize bookmark.json contents to a consistent shape:
// { version: number, items: Array }
function normalizeBookmarksData(parsed) {
    var _a, _b;
    if (Array.isArray(parsed)) {
        return { version: 1, items: parsed };
    }
    if (parsed && typeof parsed === 'object') {
        const parsedObj = parsed;
        const versionRaw = parsedObj.version;
        // Coerce version to a safe integer >= 0
        let version = 1;
        if (typeof versionRaw === 'number' && Number.isFinite(versionRaw)) {
            version = Math.max(0, Math.floor(versionRaw));
        }
        else if (versionRaw) {
            const maybeNumber = Number(versionRaw);
            version = Number.isFinite(maybeNumber) ? Math.max(0, Math.floor(maybeNumber)) : 1;
        }
        const itemsCandidate = (_b = (_a = parsedObj.bookmarks) !== null && _a !== void 0 ? _a : parsedObj.items) !== null && _b !== void 0 ? _b : parsedObj.data;
        const items = Array.isArray(itemsCandidate) ? itemsCandidate : [];
        return { version, items };
    }
    return { version: 1, items: [] };
}
function loadBookmarksFromFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(chrome.runtime.getURL('bookmark.json'));
            const parsed = yield response.json();
            return normalizeBookmarksData(parsed);
        }
        catch (err) {
            console.error('Error loading or parsing bookmark.json:', err);
            return null;
        }
    });
}
function initBookmarksFromFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const newBookmarks = yield loadBookmarksFromFile();
        if (!newBookmarks)
            return;
        chrome.storage.local.get('bookmarks', (result) => {
            var _a;
            const current = result.bookmarks;
            const currentVersionRaw = current && ((_a = current.version) !== null && _a !== void 0 ? _a : 0);
            const currentVersion = Number.isFinite(Number(currentVersionRaw)) ? Math.max(0, Math.floor(Number(currentVersionRaw))) : 0;
            const newVersion = Number.isFinite(Number(newBookmarks.version)) ? Math.max(0, Math.floor(Number(newBookmarks.version))) : 0;
            if (!current || newVersion > currentVersion) {
                const itemsWithIds = (Array.isArray(newBookmarks.items) ? newBookmarks.items : []).map((item, index) => (Object.assign(Object.assign({}, item), { id: item.id || Date.now() + index })));
                const toStore = { version: newVersion, items: itemsWithIds };
                chrome.storage.local.set({ bookmarks: toStore }, () => {
                    console.log('Bookmarks initialized/updated in local storage. (version)', newVersion);
                });
            }
            else {
                console.log('Bookmarks in local storage are up-to-date. (current version)', currentVersion);
            }
        });
    });
}
// Run on installed (first install or extension update)
chrome.runtime.onInstalled.addListener((details) => __awaiter(void 0, void 0, void 0, function* () {
    if (details.reason === 'install' || details.reason === 'update') {
        yield initBookmarksFromFile();
    }
}));
// Run on startup (service worker activation) to ensure initialization on worker load
chrome.runtime.onStartup.addListener(() => {
    void initBookmarksFromFile();
});
// Also attempt immediate initialization when the service worker loads.
// Use an async IIFE to avoid lint warnings about top-level async calls.
// Initialize without top-level await to remain compatible with the project's TS target.
// Initialization happens in onInstalled and onStartup handlers.


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/servicework/background.ts"].call(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map