I was wondering how to add SPA functionality to a statically generated site that just uses HTML,CSS and no JS.

I've used Eleventy and I wanted to add as little overhead as possible. Also, it should follow the principles of Progressive Enhancement (basically, it should keep working without the JS being required).

I ended up with 853 bytes of JavaScript unminified:

```js
(function () {
  'use strict';
  var $ = function (sel, con) {
    return (con || document).querySelector(sel);
  };
  var nav = $('.nav');
  if (!nav) {
    console.warn('no navigation found.');
    return;
  }
  nav.addEventListener('click', function (evt) {
    var el = evt.target;
    var spa = el.getAttribute('data-spa');
    if (!!spa) {
      evt.preventDefault();
      var href = el.getAttribute('href');
      var container = $(spa);
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var d = this.responseXML;
        var dTitle = d.title || '';
        var dContainer = $(spa, d);
        container.innerHTML = (dContainer && dContainer.innerHTML) || '';
        history.pushState({}, dTitle, href);
      };
      xhr.open('GET', href);
      xhr.responseType = 'document';
      xhr.send();
    }
  });
})();
```

This snippet looks for the first navigation element with the class name `nav` in the and listens for click events. If the clicked target is a link with an extra `data-spa` attribute, then the link will be treated as a Single Page Application link.

In this case, a whole page reload is prevented via `evt.preventDefault()`.

Instead of navigating to the page, the HTML is fetched via an AJAX request. The value of the `data-spa` element contains a selector that specifies the content element on the page (eg `main`).

The content of the content container is then replaced by the content container inside the HTML document fetched by AJAX.

Finally, the `history.pushState()` updates the HTML in the browser.

## Why?

Because I can ;).

One use case: if you have some kind of interactive component inside your page, you may want to allow the user to navigate through your page without reloading that component.

## Ugh. It looks like jQuery.

I admit I loved jQuery in the 2010's. It uses \$ as an abbreviation to `document.querySelector`

## Why so IE11-friendly legacy code?

I thought it was nice to even also support IE. And throwing ES2020 onto it doesn't significantly reduce the file size.

## Demo:

https://terabaud.github.io/eleventy-mini-spa/
