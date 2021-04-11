(function () {
  'use strict';

  /**
   * Load content into page without a whole page reload
   * @param {string} href URL to route to
   * @param {boolean} pushState whether to call history.pushState or not
   */
  function load(href, pushState) {
    const container = $('main');
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const d = xhr.responseXML;
      const dTitle = d.title || '';
      const dContainer = $('main', d);
      container.innerHTML = (dContainer && dContainer.innerHTML) || '';
      document.title = dTitle;
      if (pushState) {
        history.pushState({}, dTitle, href);
      }
      container.focus();
      window.scrollTo(0, 0);
    };
    xhr.onerror = function () {
      // fallback to normal link behaviour
      document.location.href = href;
      return;
    };
    xhr.open('GET', href);
    xhr.responseType = 'document';
    xhr.send();
  }

  function $(sel, con) {
    return (con || document).querySelector(sel);
  }

  /**
   * Search for a parent anchor tag outside a clicked event target
   *
   * @param {HTMLElement} el the clicked event target.
   * @param {number} maxNests max number of levels to go up.
   * @returns the anchor tag or null
   */
  function findAnchorTag(el, maxNests = 3) {
    for (let i = maxNests; el && i > 0; --i, el = el.parentNode) {
      if (el.nodeName === 'A') {
        return el;
      }
    }
    return null;
  }

  window.addEventListener('click', function (evt) {
    let baseUrl = $('meta[name="x-base-url"]')?.getAttribute('content') || '/';
    const el = findAnchorTag(evt.target);
    const href = el?.getAttribute('href');
    if (el && href) {
      if (
        href.startsWith('#') ||
        el.getAttribute('target') === '_blank' ||
        /\.\w+$/.test(href)
      ) {
        // eleventy urls in this configuration do not have extensions like .html
        // if they have, or if target _blank is set, or they are a hash link,
        // then do nothing.
        return;
      }
      // if the URL starts with the base url, do the SPA handling
      if (href.startsWith(baseUrl)) {
        evt.preventDefault();
        load(href, true);
      }
    }
  });

  window.addEventListener('popstate', function (e) {
    load(document.location.pathname, false);
  });
})();
