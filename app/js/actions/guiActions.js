var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var guiActions = Reflux.createActions([
  'moveCarts',
  'skipCarts',
  'ratingCalculated',
  'stopLightClicked',
  'stopLightCloseClicked',
  'openRatingPopup',
  'closeRatingPopup',
  'selectDeviceMaterial'
]);

module.exports = guiActions;