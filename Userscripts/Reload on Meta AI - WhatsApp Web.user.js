// ==UserScript==
// @name         Hide on Keywords - WhatsApp Web
// @match        https://web.whatsapp.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(function () {
  const KEYWORDS = ['Meta AI', 'keyword2', 'keyword3'];

  function checkAndHide() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent.trim();
      if (KEYWORDS.some(kw => text.includes(kw))) {
        document.body.style.setProperty('display', 'none', 'important');
        console.warn(`[KeywordBlocker] Keyword detected. Page hidden.`);
        observer.disconnect();
        return;
      }
    }
  }

  const observer = new MutationObserver(() => checkAndHide());
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(checkAndHide, 2000);
})();
