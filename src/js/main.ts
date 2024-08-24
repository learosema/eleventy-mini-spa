/**
 * Load content into page without a whole page reload
 * @param {string} href URL to route to
 * @param {boolean} pushState whether to call history.pushState or not
 */
async function load(href: string, pushState: boolean) {
  try {
    const container = document.querySelector('main');
  
    if (!container) {
      throw new Error('SPA script requires there is a main tag on the site');
    }
    const response = await fetch(href);
    const content = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content || '', 'text/html');
    const docMain = doc.querySelector('main');
    const docTitle = doc.querySelector('title')?.textContent || '';
    container.innerHTML = docMain?.innerHTML || '';
    document.title = docTitle;
    if (pushState) {
      history.pushState({}, docTitle, href);
    }
    const h1 = document.querySelector('h1'); 
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      window.setTimeout(() => {
        h1.focus();
        window.scrollTo(0, 0);
      }, 100);
    }

  } catch {
    // fallback to normal link behaviour
    document.location.href = href;
  }
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
  const el = findAnchorTag(evt.target);
  const href = el?.getAttribute('href');
  if (el && href) {
    if (
      href.startsWith('#') ||
      el.getAttribute('target') === '_blank' ||
      /\.\w+$/.test(href)
    ) {
      // My SPA-urls in this configuration do not have extensions like .html
      // if they have, or if target _blank is set, or they are a hash link,
      // then do nothing.
      return;
    }
    // if the URL starts with the base url, do the SPA handling
    if (href.startsWith('/')) {
      evt.preventDefault();
      load(href, true);
    }
  }
});

window.addEventListener('popstate', function (e) {
  load(document.location.pathname, false);
});

console.log('Mini SPA loaded.');
