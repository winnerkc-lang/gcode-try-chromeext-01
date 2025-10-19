/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/

console.log('Popup script loaded');
document.addEventListener('DOMContentLoaded', () => {
    const openOptionsButton = document.getElementById('openOptions');
    if (openOptionsButton) {
        openOptionsButton.addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });
    }
});

/******/ })()
;
//# sourceMappingURL=popup.js.map