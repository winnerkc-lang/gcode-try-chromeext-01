"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const bookmarksList = document.getElementById('bookmarks-list');
    const newNameInput = document.getElementById('new-name');
    const newUrlInput = document.getElementById('new-url');
    const addButton = document.getElementById('add-button');
    let allBookmarks = [];
    // 渲染書籤列表
    function renderBookmarks(bookmarks) {
        bookmarksList.innerHTML = '';
        if (!bookmarks || bookmarks.length === 0) {
            bookmarksList.innerHTML = '<div style="text-align:center; color:#888; padding:10px;">沒有書籤</div>';
            return;
        }
        bookmarks.forEach((bookmark, index) => {
            const item = document.createElement('div');
            item.className = 'bookmark-item';
            item.dataset.index = index.toString();
            item.dataset.url = bookmark.url;
            const nameSpan = document.createElement('span');
            nameSpan.textContent = bookmark.name;
            nameSpan.title = `${bookmark.name} (${bookmark.url})`;
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = '刪除書籤';
            item.appendChild(nameSpan);
            item.appendChild(deleteBtn);
            bookmarksList.appendChild(item);
        });
    }
    // 從背景腳本獲取書籤
    function loadBookmarks() {
        chrome.runtime.sendMessage({ action: 'get-bookmarks' }, (bookmarks) => {
            allBookmarks = bookmarks;
            renderBookmarks(allBookmarks);
        });
    }
    // 儲存書籤到背景腳本
    function saveBookmarks(bookmarks) {
        chrome.runtime.sendMessage({ action: 'save-bookmarks', bookmarks: bookmarks }, () => {
            loadBookmarks(); // 重新載入以保持同步
        });
    }
    // 處理搜尋
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBookmarks = allBookmarks.filter(b => b.name.toLowerCase().includes(searchTerm) ||
            b.url.toLowerCase().includes(searchTerm));
        renderBookmarks(filteredBookmarks);
    });
    // 處理新增書籤
    addButton.addEventListener('click', () => {
        const name = newNameInput.value.trim();
        let url = newUrlInput.value.trim();
        if (name && url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            const newBookmark = { name, url };
            allBookmarks.push(newBookmark);
            saveBookmarks(allBookmarks);
            newNameInput.value = '';
            newUrlInput.value = '';
            searchInput.value = '';
        }
    });
    // 處理點擊事件 (開啟分頁或刪除)
    bookmarksList.addEventListener('click', (e) => {
        const target = e.target;
        const item = target.closest('.bookmark-item');
        if (!item)
            return;
        const index = parseInt(item.dataset.index, 10);
        if (target.classList.contains('delete-btn')) {
            allBookmarks.splice(index, 1);
            saveBookmarks(allBookmarks);
        }
        else {
            const url = item.dataset.url;
            chrome.runtime.sendMessage({ action: 'open-tab', url: url });
            window.close();
        }
    });
    // 初始載入
    loadBookmarks();
});
