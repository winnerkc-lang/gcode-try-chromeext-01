/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************************!*\
  !*** ./src/page/optPageHello.ts ***!
  \**********************************/

// src/page/optPageHello.ts
console.log('options page loaded');
const form = document.getElementById('add-edit-form');
const idInput = document.getElementById('bookmark-id');
const nameInput = document.getElementById('bookmark-name');
const urlInput = document.getElementById('bookmark-url');
const container = document.getElementById('bookmarks-container');
function renderBookmarks() {
    if (!container)
        return;
    container.innerHTML = ''; // Clear previous content
    chrome.storage.local.get('bookmarks', (result) => {
        const bookmarksData = result.bookmarks;
        if (bookmarksData && bookmarksData.bookmarks && bookmarksData.bookmarks.length > 0) {
            const ul = document.createElement('ul');
            bookmarksData.bookmarks.forEach((bookmark) => {
                const li = document.createElement('li');
                const text = document.createElement('span');
                text.textContent = `${bookmark.name} - ${bookmark.url}`;
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.dataset.id = bookmark.id.toString();
                editButton.addEventListener('click', handleEdit);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.dataset.id = bookmark.id.toString();
                deleteButton.addEventListener('click', handleDelete);
                li.appendChild(text);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                ul.appendChild(li);
            });
            container.appendChild(ul);
        }
        else {
            container.textContent = 'No bookmarks found.';
        }
    });
}
function handleEdit(event) {
    const target = event.target;
    const id = Number(target.dataset.id);
    chrome.storage.local.get('bookmarks', (result) => {
        const bookmarksData = result.bookmarks;
        if (bookmarksData && bookmarksData.bookmarks) {
            const bookmarkToEdit = bookmarksData.bookmarks.find(b => b.id === id);
            if (bookmarkToEdit) {
                idInput.value = bookmarkToEdit.id.toString();
                nameInput.value = bookmarkToEdit.name;
                urlInput.value = bookmarkToEdit.url;
            }
        }
    });
}
function handleDelete(event) {
    const target = event.target;
    const id = Number(target.dataset.id);
    chrome.storage.local.get('bookmarks', (result) => {
        const bookmarksData = result.bookmarks;
        if (bookmarksData && bookmarksData.bookmarks) {
            bookmarksData.bookmarks = updatedBookmarks;
            bookmarksData.version = new Date().getTime().toString(); // Update version
            chrome.storage.local.set({ bookmarks: bookmarksData }, () => {
                console.log('Bookmark deleted.');
                renderBookmarks();
            });
        }
    });
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(idInput.value);
    const name = nameInput.value;
    const url = urlInput.value;
    chrome.storage.local.get('bookmarks', (result) => {
        let bookmarksData = result.bookmarks || { version: '1.0', bookmarks: [] };
        if (id) { // Editing existing bookmark
            const bookmarkIndex = bookmarksData.bookmarks.findIndex(b => b.id === id);
            if (bookmarkIndex > -1) {
                bookmarksData.bookmarks[bookmarkIndex] = { id, name, url };
            }
        }
        else { // Adding new bookmark
            const newId = Date.now();
            bookmarksData.bookmarks.push({ id: newId, name, url });
        }
        chrome.storage.local.set({ bookmarks: bookmarksData }, () => {
            console.log('Bookmarks saved.');
            form.reset();
            idInput.value = '';
            renderBookmarks();
        });
    });
});
document.addEventListener('DOMContentLoaded', renderBookmarks);

/******/ })()
;
//# sourceMappingURL=optPageHello.js.map