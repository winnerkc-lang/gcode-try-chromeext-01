"use strict";
// 監聽擴充功能安裝事件
chrome.runtime.onInstalled.addListener((details) => {
    // 檢查是否為第一次安裝
    if (details.reason === 'install') {
        // 從 bookmark.json 載入初始書籤資料
        const url = chrome.runtime.getURL('bookmark.json');
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
            .then((bookmarks) => {
            // 將書籤存儲到 chrome.storage.local
            chrome.storage.local.set({ bookmarks: bookmarks }, () => {
                console.log('初始書籤已載入。');
            });
        })
            .catch(error => console.error('載入初始書籤失敗:', error));
    }
});
// 監聽來自 popup 的訊息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'open-tab':
            if (request.url) {
                chrome.tabs.create({ url: request.url });
            }
            break;
        case 'get-bookmarks':
            chrome.storage.local.get('bookmarks', (data) => {
                sendResponse(data.bookmarks || []);
            });
            return true; // 返回 true 表示將異步發送響應
        case 'save-bookmarks':
            if (request.bookmarks) {
                chrome.storage.local.set({ bookmarks: request.bookmarks }, () => {
                    sendResponse({ success: true });
                });
            }
            return true;
        default:
            console.warn('未知的操作:', request.action);
            break;
    }
});
