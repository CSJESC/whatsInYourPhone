var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var apiActions = Reflux.createActions([
  'loadDeviceMaterials',
  'loadSuccess'
]);

apiActions.loadDeviceMaterials.preEmit = function() {
  var materials = MaterialApi.loadDeviceMaterials();
  apiActions.loadSuccess(materials)
};

module.exports = apiActions;