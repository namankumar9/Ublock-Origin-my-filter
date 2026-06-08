// ==UserScript==
// @name         Hide on Keywords - WhatsApp Web
// @match        https://web.whatsapp.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(function () {
  const KEYWORDS = ['Meta AI', 'keyword2', 'keyword3'];

  const EXCEPTIONS = ['Ask Meta AI'];

  function shouldHide(text) {
    return KEYWORDS.some(kw => {
      if (!text.includes(kw)) return false;

      // If the keyword has exceptions, check none of them match
      const exceptions = EXCEPTIONS.filter(ex => ex.includes(kw));
      return !exceptions.some(ex => text.includes(ex));
    });
  }

  function checkAndHide() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent.trim();
      if (shouldHide(text)) {
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
