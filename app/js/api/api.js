var data    = require('json!./device_material_data.json');

var Api = {
  loadDeviceMaterials: function() {
    return data
  }
}
module.exports = Api;