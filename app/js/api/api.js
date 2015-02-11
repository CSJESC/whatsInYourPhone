var reqwest = require('reqwest');
var url = require('url');

// TODO: move this to a JSON file ?
var config = {
  apiPrefix: '/api/v1',
  endpoints: {
    materials:    '/materials',
    countryShare: '/mined'
  }
};

var Api = {
  loadDeviceMaterials: function() {
    return reqwest({
      url: config.apiPrefix + config.endpoints.materials + '?sort=name',
      type: 'json'
    });
  },

  loadCountryShares: function(materialId) {
    return reqwest({
      url: config.apiPrefix + config.endpoints.countryShare + '?country_materials=' + materialId,
      type: 'json'
    });
  },

  updateMaterial: function (material) {
    console.log(material)
    return reqwest({
      url:  config.apiPrefix + config.endpoints.materials + '/update/' + material.id,
      data: {
        name:             material.name,
        description:      material.description,
        healthRating:     material.healthRating,
        recyclingRating:  material.recyclingRating,
        links:            material.links,
        youtube:          material.youtube
      }
    });
  },

  createMaterial: function (material) {
    var dataString = JSON.stringify(material)
    console.log(dataString)
    var req = reqwest({
      method: 'POST',
      contentType: 'application/json',
      url:  config.apiPrefix + config.endpoints.materials,
      data: dataString
    });
    return req

  }
}
module.exports = Api;
