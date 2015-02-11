/* ---------------------------------------------------
## CONNECTS THE REACT MODULES TO THE FRONTEND WEB PAGE
   -------------------------------------------------*/

require('es5-shim-sham'); // polyfills
var React = require('react');
var Page         = React.createFactory(require('./js/jsx_components/page.jsx'));
var Methodology  = React.createFactory(require('./js/jsx_components/methodology.jsx'));

// add Page to html
var loadPage = function () {
  var content = document.getElementById('content');
  var hash    = location.hash
  hash = hash.replace('#','')

  switch (hash) {
    case 'methodology':
      React.render(Methodology(null), content)
      break
    default:
      React.render(Page(null), content)
  }
}

window.onload       = loadPage 
window.onhashchange = loadPage
