var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var guiActions = Reflux.createActions([
  'moveCarts',
  'skipCarts',
  'ratingCalculated'
]);

module.exports = guiActions;