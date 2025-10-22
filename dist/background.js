/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    if (request.action === 'addNumbers') {
        const result = request.num1 + request.num2;
        sendResponse({ result });
    }
    else if (request.action === 'callPostmanEcho') {
        console.log('Calling Postman Echo API');
        fetch('https://postman-echo.com/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: request.name })
        })
            .then(response => response.json())
            .then(data => {
            console.log('Postman Echo API response:', data);
            sendResponse({ data });
        })
            .catch(error => sendResponse({ error: error.message }));
        return true; // Indicates that the response is sent asynchronously
    }
    return true; // Keep the message channel open for async response
});

/******/ })()
;
//# sourceMappingURL=background.js.map