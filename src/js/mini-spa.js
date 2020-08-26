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
