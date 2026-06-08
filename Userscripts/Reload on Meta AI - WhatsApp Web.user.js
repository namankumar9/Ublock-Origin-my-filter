// ==UserScript==
// @name         Hide on Meta AI - WhatsApp Web
// @match        https://web.whatsapp.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(function () {
  const TARGET_TEXT = 'Meta AI';

  function checkAndHide() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim() === TARGET_TEXT) {
        document.body.style.setProperty('display', 'none', 'important');
        console.warn('[MetaAI Blocker] Meta AI detected. Page hidden.');
        observer.disconnect(); // No need to keep observing
        return;
      }
    }
  }

  const observer = new MutationObserver(() => checkAndHide());
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(checkAndHide, 2000);
})();
