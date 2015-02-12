var reqwest = require('reqwest');
var url = require('url');

// TODO: move this to a JSON file ?
var config = {
  apiPrefix: '/api/v1',
  endpoints: {
    materials:    '/materials',
    countries:    '/countries',
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

  loadCountries: function() {
    return reqwest({
      url: config.apiPrefix + config.endpoints.countries + '?sort=name',
      type: 'json'
    });
  },

  updateCountry: function (country) {
    return reqwest({
      url:  config.apiPrefix + config.endpoints.countries + '/update/' + country.id,
      data: country
    });
  },

  createCountry: function (country) {
    return reqwest({
      url:  config.apiPrefix + config.endpoints.countries + '/create/',
      data: country
    });
  },

  updateMaterial: function (material) {
    // clean up material before we send it
    delete material.usedIn

    return reqwest({
      url:  config.apiPrefix + config.endpoints.materials + '/update/' + material.id,
      data: material
    });
  },

  createMaterial: function (material) {
    var dataString = JSON.stringify(material)
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
