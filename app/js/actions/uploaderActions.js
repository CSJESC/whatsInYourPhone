var Reflux = require('reflux');
var uploaderActions = Reflux.createActions([
  'editMaterial',
  'closePopup',
  'triggerState',
  'toggleCountry',
  'listCountries',
  'editCountry',
  'updateShare'
]);

module.exports = uploaderActions;
