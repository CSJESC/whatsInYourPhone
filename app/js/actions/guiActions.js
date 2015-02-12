var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var guiActions = Reflux.createActions([
  'moveCarts',
  'autoMoveCarts',
  'skipCarts',
  'ratingCalculated',
  'stopLightClicked',
  'stopLightCloseClicked',
  'openRatingPopup',
  'closeRatingPopup',
  'selectDeviceMaterial',
  'logInClicked',
  'logInCloseClicked',
  'selectCountry',
  'checkLogin'
]);

module.exports = guiActions;