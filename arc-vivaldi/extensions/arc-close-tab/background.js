// Arc Close Tab (Vivaldi)
// Ctrl+W on a regular tab  → close it.
// Ctrl+W on a pinned tab   → switch to another tab, then hibernate (discard) the pinned tab,
//                             so it stays in the pinned grid but is unloaded from memory.
// Known limit: extensions cannot see Vivaldi workspaces, so the replacement tab is chosen
// by recency across the whole window.

const byRecent = (a, b) => (b.lastAccessed ?? 0) - (a.lastAccessed ?? 0);

// Most recently used regular tab first (avoids bouncing between pinned tabs),
// then any other loaded tab, then any other tab.
function pickReplacement(tabs, pinned) {
  const others = tabs.filter(t => t.id !== pinned.id).sort(byRecent);
  return others.find(t => !t.pinned) ?? others.find(t => !t.discarded) ?? others[0] ?? null;
}

async function hibernatePinned(tab) {
  const tabs = await chrome.tabs.query({ windowId: tab.windowId });
  const target = pickReplacement(tabs, tab);
  if (target) await chrome.tabs.update(target.id, { active: true });
  else await chrome.tabs.create({ windowId: tab.windowId, active: true }); // only tab left

  // Discarding right after the tab lost focus can silently do nothing, so retry briefly.
  for (const delay of [0, 150, 300, 600, 1200]) {
    if (delay) await new Promise(r => setTimeout(r, delay));
    try {
      const res = await chrome.tabs.discard(tab.id);
      if (res?.discarded) return;
    } catch { /* not discardable yet */ }
  }
}

async function handle(tab) {
  if (!tab?.id) tab = (await chrome.tabs.query({ active: true, lastFocusedWindow: true }))[0];
  if (!tab) return;
  if (tab.pinned) await hibernatePinned(tab);
  else await chrome.tabs.remove(tab.id);
}

// Fired by the extension's keyboard shortcut (_execute_action) and its toolbar button.
chrome.action.onClicked.addListener(handle);
