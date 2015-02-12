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
  'materialChangeSuccess',

  'updateCountry',
  'createCountry',
  'countryChangeSuccess'
]);

apiActions.loadDeviceMaterials.preEmit = function() {
  MaterialApi.loadDeviceMaterials()
    .then(apiActions.loadMaterialSuccess, apiActions.error);
};

apiActions.loadCountryShares.preEmit = function() {
  var material = arguments[0]

  MaterialApi.loadCountryShares(material.id)
    .always(apiActions.loadCountrySharesSuccess.bind(null, material));
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

apiActions.updateCountry.preEmit = function() {
  var country = arguments[0]  
  MaterialApi.updateCountry(country)
    .then(apiActions.countryChangeSuccess, apiActions.error);
};

apiActions.createCountry.preEmit = function() {
  var country = arguments[0]  
  MaterialApi.createCountry(country)
    .then(apiActions.countryChangeSuccess, apiActions.error);
};

module.exports = apiActions;
