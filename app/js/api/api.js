var data    = require('json!./device_data.json');

var Api = {
  loadDevice: function() {
    return data
  }
}
module.exports = Api;