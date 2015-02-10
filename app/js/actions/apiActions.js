var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var apiActions = Reflux.createActions([
  'loadDeviceMaterials',
  'loadCountryShares',
  'loadMaterialSuccess',
  'loadCountrySharesSuccess'
]);

apiActions.loadDeviceMaterials.preEmit = function() {
  MaterialApi.loadDeviceMaterials().then(apiActions.loadMaterialSuccess,apiActions.error);
};

apiActions.loadCountryShares.preEmit = function() {
  MaterialApi.loadCountryShares().then(apiActions.loadCountrySharesSuccess.bind(null, arguments[0]),apiActions.error);
};

module.exports = apiActions;
