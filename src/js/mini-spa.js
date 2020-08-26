(function () {
  'use strict';

  const $ = (sel, con = document) => con.querySelector(sel);
  const navigation = $('.nav');
  if (!navigation) {
    console.warn('no navigation found.');
    return;
  }
  navigation.addEventListener('click', async (evt) => {
    const target = evt.target;
    const spa = evt.target.getAttribute('data-spa');
    if (!!spa) {
      evt.preventDefault();
      const href = evt.target.getAttribute('href');
      const container = $(spa);
      const response = await fetch(href);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const docTitle = $('title', doc);
      const docContainer = $(spa, doc);
      container.innerHTML = (docContainer && docContainer.innerHTML) || '';
      history.pushState({}, docTitle && docTitle.textContent, href);
    }
  });
})();
