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
var updateCountryShares = function (material) {
  if (material.minedIn.length == 0) {
    apiActions.materialChangeSuccess()
    return
  }

  var count = 0
  var isSuccess = function (data) {
    count += 1
    if (count >= material.minedIn.length)
      apiActions.materialChangeSuccess()
  }
  // get list of shares for material
  MaterialApi.loadCountryShares(material.id)
    .then(function (shares) {
      if (shares.length == 0) {
        apiActions.materialChangeSuccess()
      }
      shares.forEach(function (share) {
        share.share = parseInt(material.shares[share.country_materials])
        MaterialApi.updateCountryShares(share)
          .then(isSuccess, apiActions.error);
      })
    })
    .fail(apiActions.error)
};

apiActions.updateMaterial.preEmit = function() {
  var material  = arguments[0]
  var shareData = arguments[1]

  MaterialApi.updateMaterial(material)
    .then(updateCountryShares.bind(null, material), apiActions.error);
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
