/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************!*\
  !*** ./src/popup/popup.ts ***!
  \****************************/

console.log('Popup script loaded');
document.addEventListener('DOMContentLoaded', () => {
    const openOptionsButton = document.getElementById('openOptions');
    if (openOptionsButton) {
        openOptionsButton.addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });
    }
    const buttons = [].map.call(document.querySelectorAll('.mdc-button'), (el) => {
        return new mdc.ripple.MDCRipple(el);
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHMtd2VicGFjay8uL3NyYy9wb3B1cC9wb3B1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmNvbnNvbGUubG9nKCdQb3B1cCBzY3JpcHQgbG9hZGVkJyk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IG9wZW5PcHRpb25zQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5PcHRpb25zJyk7XG4gICAgaWYgKG9wZW5PcHRpb25zQnV0dG9uKSB7XG4gICAgICAgIG9wZW5PcHRpb25zQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUub3Blbk9wdGlvbnNQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBidXR0b25zID0gW10ubWFwLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kYy1idXR0b24nKSwgKGVsKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgbWRjLnJpcHBsZS5NRENSaXBwbGUoZWwpO1xuICAgIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=