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
chrome.runtime.onInstalled.addListener((details) => __awaiter(void 0, void 0, void 0, function* () {
    if (details.reason === 'install' || details.reason === 'update') {
        try {
            const response = yield fetch(chrome.runtime.getURL('bookmark.json'));
            const newBookmarksData = yield response.json();
            chrome.storage.local.get('bookmarks', (result) => {
                const currentBookmarksData = result.bookmarks;
                if (!currentBookmarksData || newBookmarksData.version > currentBookmarksData.version) {
                    chrome.storage.local.set({ bookmarks: newBookmarksData }, () => {
                        console.log('Bookmarks updated in local storage.');
                    });
                }
            });
        }
        catch (error) {
            console.error('Error loading or parsing bookmark.json:', error);
        }
    }
}));


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