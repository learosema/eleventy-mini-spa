# Eleventy Mini SPA

This is a little demo about a possible approach to buiding an Single Page Application (=SPA) with HTML, CSS and JS.

## How SPAs work

Single Page Applications work in a way that they prevent a full page reload.
This can help the experience to be a bit smoother for some users, especially when things like music or animations are playing in the background.

## Accessibility problems with SPAs

People using screenreaders often don't notice when a navigation is completed inside an SPA.

A bad example of this is an old project I worked on: <https://talentbook.lea.lgbt>. (available on GitHub: <https://github.com/learosema/talentbook>).

## Structure of this demo

The SPA functionality is added on top of a statically generated site that just uses HTML,CSS and no JS.

I've used the Eleventy static site generator and I wanted to add as little overhead as possible. Also, it should follow the principles of Progressive Enhancement (basically, it should keep working without the JS being required).

All the functionality is in the `src/js/main.ts` file which gets compiled to JavaScript via `esbuild`

- it assumes there is a `main` element in the HTML document
- it loads URLs that don't have `target="_blank"` via XHR
- uses `history.pushState` to update the URL
- handles the back button via `popstate` event

This Demo is hosted on Netlify: <https://mini-spa.netlify.app/>

## Alternative approaches

The site <https://sbg.wtf> is a little simulator of the gender recognition law in Germany. It points out the problems with the law. It is implemented using an `aria-live` region (see [mdn](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)).

As the whole content of the live region is read in this case after a page changes, this approach is not suited well for sites with lots of content inside.