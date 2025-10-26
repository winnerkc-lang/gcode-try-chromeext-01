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
const saveButton = document.getElementById('save-button');
const formError = document.getElementById('form-error');
const opStatus = document.getElementById('op-status');
function setStatus(msg, timeout = 2000) {
    if (!opStatus)
        return;
    opStatus.textContent = msg;
    if (timeout > 0) {
        setTimeout(() => { if (opStatus)
            opStatus.textContent = ''; }, timeout);
    }
}
function validateForm() {
    if (!nameInput || !urlInput)
        return false;
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    if (!name) {
        if (formError)
            formError.textContent = 'Name is required.';
        if (saveButton)
            saveButton.disabled = true;
        return false;
    }
    try {
        const parsed = new URL(url);
        if (!/^https?:/.test(parsed.protocol))
            throw new Error('protocol');
    }
    catch (_a) {
        if (formError)
            formError.textContent = 'Please enter a valid http(s) URL.';
        if (saveButton)
            saveButton.disabled = true;
        return false;
    }
    if (formError)
        formError.textContent = '';
    if (saveButton)
        saveButton.disabled = false;
    return true;
}
function renderBookmarks() {
    if (!container)
        return;
    container.innerHTML = ''; // Clear previous content
    chrome.storage.local.get('bookmarks', (result) => {
        const stored = result.bookmarks;
        const data = { version: 0, bookmarks: [] };
        if (stored && Array.isArray(stored.items)) {
            data.version = typeof stored.version === 'number' ? stored.version : 0;
            data.bookmarks = stored.items.map((it) => {
                // Normalize each item to Bookmark shape, ensure id exists
                const id = it.id || crypto.randomUUID();
                const name = it.name || it.title || '';
                const url = it.url || it.href || '';
                return { id, name, url };
            });
        }
        if (data.bookmarks.length > 0) {
            const ul = document.createElement('ul');
            for (const bookmark of data.bookmarks) {
                const li = document.createElement('li');
                const text = document.createElement('span');
                text.textContent = `${bookmark.name} - ${bookmark.url}`;
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.dataset.id = bookmark.id;
                editButton.addEventListener('click', handleEdit);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.dataset.id = bookmark.id;
                deleteButton.addEventListener('click', handleDelete);
                li.appendChild(text);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                ul.appendChild(li);
            }
            container.appendChild(ul);
        }
        else {
            container.textContent = 'No bookmarks found.';
        }
    });
}
/**
 * Handles the click event of the "Edit" button for a bookmark.
 *
 * This function retrieves the bookmark's ID from the button's dataset,
 * fetches the bookmark data from `chrome.storage.local`, and populates the
 * add/edit form with the bookmark's name and URL.
 *
 * @param event The MouseEvent triggered by clicking the "Edit" button.
 */
function handleEdit(event) {
    const target = event.target;
    const id = target.dataset.id;
    chrome.storage.local.get('bookmarks', (result) => {
        const stored = result.bookmarks;
        if (stored && Array.isArray(stored.items)) {
            const bookmarkToEdit = stored.items.find(b => b.id === id);
            if (bookmarkToEdit) {
                idInput.value = bookmarkToEdit.id;
                nameInput.value = bookmarkToEdit.name || bookmarkToEdit.title || '';
                urlInput.value = bookmarkToEdit.url || bookmarkToEdit.href || '';
                validateForm();
            }
        }
    });
}
function handleDelete(event) {
    const target = event.target;
    const id = target.dataset.id;
    // Confirm deletion
    const ok = globalThis.confirm('Delete this bookmark?');
    if (!ok)
        return;
    chrome.storage.local.get('bookmarks', (result) => {
        const stored = result.bookmarks;
        if (stored && Array.isArray(stored.items)) {
            const remaining = stored.items.filter((it) => it.id !== id);
            const updated = { version: Math.floor(Date.now()), items: remaining };
            chrome.storage.local.set({ bookmarks: updated }, () => {
                console.log('Bookmark deleted.');
                setStatus('Deleted');
                renderBookmarks();
            });
        }
    });
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm())
        return;
    const id = idInput.value;
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    chrome.storage.local.get('bookmarks', (result) => {
        const stored = result.bookmarks;
        let items = [];
        if (stored && Array.isArray(stored.items)) {
            items = stored.items.slice();
        }
        if (id) { // Editing existing bookmark
            const idx = items.findIndex((it) => it.id === id);
            if (idx > -1) {
                items[idx] = Object.assign(Object.assign({}, items[idx]), { id, name, url });
            }
        }
        else { // Adding new bookmark
            const newId = crypto.randomUUID();
            items.push({ id: newId, name, url });
        }
        const updated = { version: Math.floor(Date.now()), items };
        chrome.storage.local.set({ bookmarks: updated }, () => {
            console.log('Bookmarks saved.');
            form.reset();
            idInput.value = '';
            setStatus('Saved');
            renderBookmarks();
        });
    });
});
// live-validate inputs
if (nameInput)
    nameInput.addEventListener('input', () => validateForm());
if (urlInput)
    urlInput.addEventListener('input', () => validateForm());
// disable save until valid initially
if (saveButton)
    saveButton.disabled = true;
document.addEventListener('DOMContentLoaded', renderBookmarks);

/******/ })()
;
//# sourceMappingURL=optPageHello.js.map