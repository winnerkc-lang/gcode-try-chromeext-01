// src/servicework/background.ts
console.log('background script loaded');

// Normalize bookmark.json contents to a consistent shape:
// { version: number, items: Array }
function normalizeBookmarksData(parsed: unknown): { version: number; items: any[] } {
  if (Array.isArray(parsed)) {
    return { version: 1, items: parsed };
  }

  if (parsed && typeof parsed === 'object') {
    const parsedObj = parsed as Record<string, unknown>;
    const versionRaw = parsedObj.version;
    // Coerce version to a safe integer >= 0
    let version = 1;
    if (typeof versionRaw === 'number' && Number.isFinite(versionRaw)) {
      version = Math.max(0, Math.floor(versionRaw));
    } else if (versionRaw) {
      const maybeNumber = Number(versionRaw as any);
      version = Number.isFinite(maybeNumber) ? Math.max(0, Math.floor(maybeNumber)) : 1;
    }

    const itemsCandidate = parsedObj.bookmarks ?? parsedObj.items ?? parsedObj.data;
    const items = Array.isArray(itemsCandidate) ? itemsCandidate : [];

    return { version, items };
  }

  return { version: 1, items: [] };
}

async function loadBookmarksFromFile(): Promise<{ version: number; items: any[] } | null> {
  try {
    const response = await fetch(chrome.runtime.getURL('bookmark.json'));
    const parsed = await response.json();
    return normalizeBookmarksData(parsed);
  } catch (err) {
    console.error('Error loading or parsing bookmark.json:', err);
    return null;
  }
}

async function initBookmarksFromFile() {
  const newBookmarks = await loadBookmarksFromFile();
  if (!newBookmarks) return;

  chrome.storage.local.get('bookmarks', (result) => {
    const current = result.bookmarks;
    const currentVersionRaw = current && (current.version ?? 0);
    const currentVersion = Number.isFinite(Number(currentVersionRaw)) ? Math.max(0, Math.floor(Number(currentVersionRaw))) : 0;

    const newVersion = Number.isFinite(Number(newBookmarks.version)) ? Math.max(0, Math.floor(Number(newBookmarks.version))) : 0;

    if (!current || newVersion > currentVersion) {
      const itemsWithIds = (Array.isArray(newBookmarks.items) ? newBookmarks.items : []).map((item, index) => ({
        ...item,
        id: item.id || Date.now() + index,
      }));
      const toStore = { version: newVersion, items: itemsWithIds };
      chrome.storage.local.set({ bookmarks: toStore }, () => {
        console.log('Bookmarks initialized/updated in local storage. (version)', newVersion);
      });
    } else {
      console.log('Bookmarks in local storage are up-to-date. (current version)', currentVersion);
    }
  });
}

// Run on installed (first install or extension update)
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    await initBookmarksFromFile();
  }
});

// Run on startup (service worker activation) to ensure initialization on worker load
chrome.runtime.onStartup.addListener(() => {
  void initBookmarksFromFile();
});

// Also attempt immediate initialization when the service worker loads.
// Use an async IIFE to avoid lint warnings about top-level async calls.
// Initialize without top-level await to remain compatible with the project's TS target.
// Initialization happens in onInstalled and onStartup handlers.
