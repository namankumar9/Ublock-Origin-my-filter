// ==UserScript==
// @name         Reload on Meta AI - WhatsApp Web
// @match        https://web.whatsapp.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  const TARGET_TEXT = 'Meta AI';
  const MAX_RELOADS = 50;
  const RELOAD_KEY = 'metaai_reload_count';
  const RELOAD_RESET_MS = 10000;

  let resetTimer = null;

  function checkAndReload() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim() === TARGET_TEXT) {
        const reloadCount = parseInt(sessionStorage.getItem(RELOAD_KEY) || '0');

        if (reloadCount >= MAX_RELOADS) {
          // Make WA Web unusable instead of giving up
          document.body.style.setProperty('display', 'none', 'important');
          console.warn('[MetaAI Blocker] 50 reloads exhausted. Page blanked.');
          return;
        }

        sessionStorage.setItem(RELOAD_KEY, reloadCount + 1);
        console.log(`[MetaAI Blocker] Meta AI detected, reloading (attempt ${reloadCount + 1})`);
        location.reload();
        return;
      }
    }

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      sessionStorage.removeItem(RELOAD_KEY);
    }, RELOAD_RESET_MS);
  }

  const observer = new MutationObserver(() => checkAndReload());
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(checkAndReload, 2000);
})();
