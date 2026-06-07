// ==UserScript==
// @name         WhatsApp Web - Hide Left Nav Sidebar
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://web.whatsapp.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const HIDE_SELECTORS = [
  '[data-testid="nav-bar-container"]',
  '[data-testid="icon-nav"]',
  '[data-testid="navbar"]',
  'div[style*="--navbar-width"]',   // targets the navbar width container
  '[aria-label="Navigation bar"]',
  '[data-tab="2"]',                 // visible in your devtools!
  ];

  function hideNav() {
    HIDE_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });
    });
  }

  // Run on load and watch for dynamic re-renders
  const observer = new MutationObserver(hideNav);
  observer.observe(document.body, { childList: true, subtree: true });

  // Also run immediately and after short delays for initial load
  hideNav();
  setTimeout(hideNav, 2000);
  setTimeout(hideNav, 5000);
})();
