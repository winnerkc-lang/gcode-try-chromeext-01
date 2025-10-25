// src/page/optPageHello.ts
console.log('options page loaded');

interface Bookmark {
  id: number;
  name: string;
  url: string;
}

// Stored shape is normalized to: { version: number, items: any[] }
interface StoredBookmarks {
  version: number;
  items: any[];
}

interface BookmarkData {
  version: number;
  bookmarks: Bookmark[];
}

const form = document.getElementById('add-edit-form') as HTMLFormElement;
const idInput = document.getElementById('bookmark-id') as HTMLInputElement;
const nameInput = document.getElementById('bookmark-name') as HTMLInputElement;
const urlInput = document.getElementById('bookmark-url') as HTMLInputElement;
const container = document.getElementById('bookmarks-container');
const saveButton = document.getElementById('save-button') as HTMLButtonElement | null;
const formError = document.getElementById('form-error') as HTMLDivElement | null;
const opStatus = document.getElementById('op-status') as HTMLSpanElement | null;

function setStatus(msg: string, timeout = 2000) {
  if (!opStatus) return;
  opStatus.textContent = msg;
  if (timeout > 0) {
    setTimeout(() => { if (opStatus) opStatus.textContent = ''; }, timeout);
  }
}

function validateForm(): boolean {
  if (!nameInput || !urlInput) return false;
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  if (!name) {
    if (formError) formError.textContent = 'Name is required.';
    if (saveButton) saveButton.disabled = true;
    return false;
  }
  try {
    const parsed = new URL(url);
    if (!/^https?:/.test(parsed.protocol)) throw new Error('protocol');
  } catch {
    if (formError) formError.textContent = 'Please enter a valid http(s) URL.';
    if (saveButton) saveButton.disabled = true;
    return false;
  }
  if (formError) formError.textContent = '';
  if (saveButton) saveButton.disabled = false;
  return true;
}

function renderBookmarks() {
  if (!container) return;
  container.innerHTML = ''; // Clear previous content
  chrome.storage.local.get('bookmarks', (result) => {
    const stored: StoredBookmarks | undefined = result.bookmarks;
    const data: BookmarkData = { version: 0, bookmarks: [] };

    if (stored && Array.isArray(stored.items)) {
      data.version = typeof stored.version === 'number' ? stored.version : 0;
      data.bookmarks = stored.items.map((it) => {
        // Normalize each item to Bookmark shape, ensure id exists
        const id = typeof it.id === 'number' ? it.id : Date.now() + Math.floor(Math.random() * 1000);
        const name = it.name || it.title || '';
        const url = it.url || it.href || '';
        return { id, name, url } as Bookmark;
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
      }
      container.appendChild(ul);
    } else {
      container.textContent = 'No bookmarks found.';
    }
  });
}

function handleEdit(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  const id = Number(target.dataset.id);

  chrome.storage.local.get('bookmarks', (result) => {
    const bookmarksData: BookmarkData | undefined = result.bookmarks;
    const bookmarkToEdit = bookmarksData?.bookmarks?.find(b => b.id === id);
    if (bookmarkToEdit) {
      idInput.value = bookmarkToEdit.id.toString();
      nameInput.value = bookmarkToEdit.name;
      urlInput.value = bookmarkToEdit.url;
      validateForm();
    }
  });
}

function handleDelete(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    const id = Number(target.dataset.id);
    // Confirm deletion
    const ok = globalThis.confirm('Delete this bookmark?');
    if (!ok) return;

    chrome.storage.local.get('bookmarks', (result) => {
      const stored: StoredBookmarks | undefined = result.bookmarks;
      if (stored && Array.isArray(stored.items)) {
        const remaining = stored.items.filter((it: any) => {
          const itemId = typeof it.id === 'number' ? it.id : null;
          return itemId !== id;
        });
          const updated: StoredBookmarks = { version: Math.floor(Date.now()), items: remaining };
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
  if (!validateForm()) return;
  const id = Number(idInput.value);
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  chrome.storage.local.get('bookmarks', (result) => {
    const stored: StoredBookmarks | undefined = result.bookmarks;
    let items: any[] = [];

    if (stored && Array.isArray(stored.items)) {
      items = stored.items.slice();
    }

    if (id) { // Editing existing bookmark
      const idx = items.findIndex((it) => (typeof it.id === 'number' ? it.id : null) === id);
      if (idx > -1) {
        items[idx] = { ...items[idx], id, name, url };
      }
    } else { // Adding new bookmark
      const newId = Date.now();
      items.push({ id: newId, name, url });
    }

      const updated: StoredBookmarks = { version: Math.floor(Date.now()), items };
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
if (nameInput) nameInput.addEventListener('input', () => validateForm());
if (urlInput) urlInput.addEventListener('input', () => validateForm());

// disable save until valid initially
if (saveButton) saveButton.disabled = true;

document.addEventListener('DOMContentLoaded', renderBookmarks);
