var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var apiActions = Reflux.createActions([
  'loadDeviceMaterials',
  'loadMaterialSuccess',

  'loadCountryShares',
  'loadCountrySharesSuccess',

  'loadCountries',
  'loadCountriesSuccsess',

  'updateMaterial',
  'createMaterial',
  'materialChangeSuccess'
]);

apiActions.loadDeviceMaterials.preEmit = function() {
  MaterialApi.loadDeviceMaterials()
    .then(apiActions.loadMaterialSuccess, apiActions.error);
};

apiActions.loadCountryShares.preEmit = function() {
  var material = arguments[0]

  MaterialApi.loadCountryShares(material.id)
    .then(apiActions.loadCountrySharesSuccess.bind(null, material), apiActions.error);
};

apiActions.loadCountries.preEmit = function() {
  MaterialApi.loadCountries()
    .then(apiActions.loadCountriesSuccsess, apiActions.error);
};

apiActions.updateMaterial.preEmit = function() {
  var material = arguments[0]

  MaterialApi.updateMaterial(material)
    .then(apiActions.materialChangeSuccess, apiActions.error);
};

apiActions.createMaterial.preEmit = function() {
  var material = arguments[0]  
  MaterialApi.createMaterial(material)
    .then(apiActions.materialChangeSuccess, apiActions.error);
};

apiActions.materialChangeSuccess.preEmit = function() {
  apiActions.loadDeviceMaterials()
};

module.exports = apiActions;
