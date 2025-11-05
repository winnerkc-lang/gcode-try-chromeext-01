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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUpBQXVKLFdBQVcsbUNBQW1DO0FBQ3JNLGtDQUFrQztBQUNsQywyQ0FBMkMsb0JBQW9CO0FBQy9EO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVRXZGQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10cy13ZWJwYWNrLy4vc3JjL3NlcnZpY2V3b3JrL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10cy13ZWJwYWNrL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10cy13ZWJwYWNrL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXRzLXdlYnBhY2svd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vLyBzcmMvc2VydmljZXdvcmsvYmFja2dyb3VuZC50c1xuY29uc29sZS5sb2coJ2JhY2tncm91bmQgc2NyaXB0IGxvYWRlZCcpO1xuLy8gTm9ybWFsaXplIGJvb2ttYXJrLmpzb24gY29udGVudHMgdG8gYSBjb25zaXN0ZW50IHNoYXBlOlxuLy8geyB2ZXJzaW9uOiBudW1iZXIsIGl0ZW1zOiBBcnJheSB9XG5mdW5jdGlvbiBub3JtYWxpemVCb29rbWFya3NEYXRhKHBhcnNlZCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICByZXR1cm4geyB2ZXJzaW9uOiAxLCBpdGVtczogcGFyc2VkIH07XG4gICAgfVxuICAgIGlmIChwYXJzZWQgJiYgdHlwZW9mIHBhcnNlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkT2JqID0gcGFyc2VkO1xuICAgICAgICBjb25zdCB2ZXJzaW9uUmF3ID0gcGFyc2VkT2JqLnZlcnNpb247XG4gICAgICAgIC8vIENvZXJjZSB2ZXJzaW9uIHRvIGEgc2FmZSBpbnRlZ2VyID49IDBcbiAgICAgICAgbGV0IHZlcnNpb24gPSAxO1xuICAgICAgICBpZiAodHlwZW9mIHZlcnNpb25SYXcgPT09ICdudW1iZXInICYmIE51bWJlci5pc0Zpbml0ZSh2ZXJzaW9uUmF3KSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IodmVyc2lvblJhdykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZlcnNpb25SYXcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1heWJlTnVtYmVyID0gTnVtYmVyKHZlcnNpb25SYXcpO1xuICAgICAgICAgICAgdmVyc2lvbiA9IE51bWJlci5pc0Zpbml0ZShtYXliZU51bWJlcikgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKG1heWJlTnVtYmVyKSkgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zQ2FuZGlkYXRlID0gKF9iID0gKF9hID0gcGFyc2VkT2JqLmJvb2ttYXJrcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogcGFyc2VkT2JqLml0ZW1zKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBwYXJzZWRPYmouZGF0YTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KGl0ZW1zQ2FuZGlkYXRlKSA/IGl0ZW1zQ2FuZGlkYXRlIDogW107XG4gICAgICAgIHJldHVybiB7IHZlcnNpb24sIGl0ZW1zIH07XG4gICAgfVxuICAgIHJldHVybiB7IHZlcnNpb246IDEsIGl0ZW1zOiBbXSB9O1xufVxuZnVuY3Rpb24gbG9hZEJvb2ttYXJrc0Zyb21GaWxlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGNocm9tZS5ydW50aW1lLmdldFVSTCgnYm9va21hcmsuanNvbicpKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBub3JtYWxpemVCb29rbWFya3NEYXRhKHBhcnNlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBvciBwYXJzaW5nIGJvb2ttYXJrLmpzb246JywgZXJyKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpbml0Qm9va21hcmtzRnJvbUZpbGUoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9va21hcmtzID0geWllbGQgbG9hZEJvb2ttYXJrc0Zyb21GaWxlKCk7XG4gICAgICAgIGlmICghbmV3Qm9va21hcmtzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2Jvb2ttYXJrcycsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSByZXN1bHQuYm9va21hcmtzO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZlcnNpb25SYXcgPSBjdXJyZW50ICYmICgoX2EgPSBjdXJyZW50LnZlcnNpb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZlcnNpb24gPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKGN1cnJlbnRWZXJzaW9uUmF3KSkgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKE51bWJlcihjdXJyZW50VmVyc2lvblJhdykpKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBuZXdWZXJzaW9uID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihuZXdCb29rbWFya3MudmVyc2lvbikpID8gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihOdW1iZXIobmV3Qm9va21hcmtzLnZlcnNpb24pKSkgOiAwO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50IHx8IG5ld1ZlcnNpb24gPiBjdXJyZW50VmVyc2lvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zV2l0aElkcyA9IChBcnJheS5pc0FycmF5KG5ld0Jvb2ttYXJrcy5pdGVtcykgPyBuZXdCb29rbWFya3MuaXRlbXMgOiBbXSkubWFwKChpdGVtLCBpbmRleCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaXRlbSksIHsgaWQ6IGl0ZW0uaWQgfHwgRGF0ZS5ub3coKSArIGluZGV4IH0pKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9TdG9yZSA9IHsgdmVyc2lvbjogbmV3VmVyc2lvbiwgaXRlbXM6IGl0ZW1zV2l0aElkcyB9O1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGJvb2ttYXJrczogdG9TdG9yZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCb29rbWFya3MgaW5pdGlhbGl6ZWQvdXBkYXRlZCBpbiBsb2NhbCBzdG9yYWdlLiAodmVyc2lvbiknLCBuZXdWZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCb29rbWFya3MgaW4gbG9jYWwgc3RvcmFnZSBhcmUgdXAtdG8tZGF0ZS4gKGN1cnJlbnQgdmVyc2lvbiknLCBjdXJyZW50VmVyc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuLy8gUnVuIG9uIGluc3RhbGxlZCAoZmlyc3QgaW5zdGFsbCBvciBleHRlbnNpb24gdXBkYXRlKVxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKGRldGFpbHMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGlmIChkZXRhaWxzLnJlYXNvbiA9PT0gJ2luc3RhbGwnIHx8IGRldGFpbHMucmVhc29uID09PSAndXBkYXRlJykge1xuICAgICAgICB5aWVsZCBpbml0Qm9va21hcmtzRnJvbUZpbGUoKTtcbiAgICB9XG59KSk7XG4vLyBSdW4gb24gc3RhcnR1cCAoc2VydmljZSB3b3JrZXIgYWN0aXZhdGlvbikgdG8gZW5zdXJlIGluaXRpYWxpemF0aW9uIG9uIHdvcmtlciBsb2FkXG5jaHJvbWUucnVudGltZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgIHZvaWQgaW5pdEJvb2ttYXJrc0Zyb21GaWxlKCk7XG59KTtcbi8vIEFsc28gYXR0ZW1wdCBpbW1lZGlhdGUgaW5pdGlhbGl6YXRpb24gd2hlbiB0aGUgc2VydmljZSB3b3JrZXIgbG9hZHMuXG4vLyBVc2UgYW4gYXN5bmMgSUlGRSB0byBhdm9pZCBsaW50IHdhcm5pbmdzIGFib3V0IHRvcC1sZXZlbCBhc3luYyBjYWxscy5cbi8vIEluaXRpYWxpemUgd2l0aG91dCB0b3AtbGV2ZWwgYXdhaXQgdG8gcmVtYWluIGNvbXBhdGlibGUgd2l0aCB0aGUgcHJvamVjdCdzIFRTIHRhcmdldC5cbi8vIEluaXRpYWxpemF0aW9uIGhhcHBlbnMgaW4gb25JbnN0YWxsZWQgYW5kIG9uU3RhcnR1cCBoYW5kbGVycy5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvc2VydmljZXdvcmsvYmFja2dyb3VuZC50c1wiXS5jYWxsKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9