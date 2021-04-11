I was wondering how to add SPA functionality to a statically generated site that just uses HTML,CSS and no JS.

I've used Eleventy and I wanted to add as little overhead as possible. Also, it should follow the principles of Progressive Enhancement (basically, it should keep working without the JS being required).

All the functionality is in the `src/js/mini-spa.js` file.

- it assumes there is a `main` element in the HTML document
- it loads URLs that don't have `target="_blank"` via XHR
- uses `history.pushState` to update the URL
- handles the back button via `popstate` event

https://terabaud.github.io/eleventy-mini-spa/
