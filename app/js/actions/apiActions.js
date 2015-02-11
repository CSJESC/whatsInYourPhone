var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var apiActions = Reflux.createActions([
  'loadDeviceMaterials',
  'loadCountryShares',
  'loadMaterialSuccess',
  'loadCountrySharesSuccess',

  'updateMaterial',
  'createMaterial'
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


apiActions.updateMaterial.preEmit = function() {
  var material = arguments[0]

  MaterialApi.updateMaterial(material)
    // .then(apiActions.loadMaterialSuccess, apiActions.error);
};

apiActions.createMaterial.preEmit = function() {
  var material = arguments[0]  
  MaterialApi.createMaterial(material)
};

module.exports = apiActions;
