var data    = require('json!./device_material_data.json');
var reqwest = require('reqwest');
var url = require('url');

// TODO: move this to a JSON file ?
var config = {
  apiPrefix: '/api/v1',
  endpoints: {
    materials: '/materials'
  }
};

var Api = {
  loadDeviceMaterials: function() {
    return reqwest({
      url: config.apiPrefix + config.endpoints.materials,
      type: 'json'
    });
  }
}
module.exports = Api;
