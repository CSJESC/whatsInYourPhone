var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var apiActions = Reflux.createActions([
  'loadDeviceMaterials',
  'loadSuccess'
]);

apiActions.loadDeviceMaterials.preEmit = function() {
   MaterialApi.loadDeviceMaterials().then(apiActions.loadSuccess,apiActions.error);
};

module.exports = apiActions;
