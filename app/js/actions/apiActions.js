var Reflux = require('reflux');
var MaterialApi = require('../api/api');
var apiActions = Reflux.createActions([
  'loadDevice',
  'loadSuccess'
]);

apiActions.loadDevice.preEmit = function() {
  var device = MaterialApi.loadDevice();
  apiActions.loadSuccess(device)
};

module.exports = apiActions;