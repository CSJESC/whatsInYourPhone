var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var apiActions = Reflux.createActions([
  'loadDeviceMaterials',
  'loadSuccess'
]);

apiActions.loadDeviceMaterials.preEmit = function() {
  var device = MaterialApi.loadDeviceMaterials();
  apiActions.loadSuccess(device)
};

module.exports = apiActions;