/* ---------------------------------------------------
## CONNECTS THE REACT MODULES TO THE FRONTEND WEB PAGE
   -------------------------------------------------*/

require('es5-shim-sham'); // polyfills
var React = require('react');
var Page  = React.createFactory(require('/js/page.jsx'));

// add Page to html
var content = document.getElementById('content');
React.render(Page(null), content);