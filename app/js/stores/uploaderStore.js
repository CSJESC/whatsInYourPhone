var Reflux    = require('reflux');
var apiActions      = require('../actions/apiActions');
var uploaderActions = require('../actions/uploaderActions');

var Store = Reflux.createStore({
  init: function() {
    this.state = {
      countries:       [],
      allMaterials:    [],
      currentMaterial: null,

      editWindowOpen: false
    };

    this.listenTo(apiActions.loadMaterialSuccess,   this.onApiDidLoadMaterials);
    this.listenTo(apiActions.materialChangeSuccess, this.onMaterialChangeSuccess);
    this.listenTo(apiActions.loadCountriesSuccsess, this.onLoadCountriesSuccsess);

    this.listenTo(uploaderActions.editMaterial,    this.onEditMaterial);
    this.listenTo(uploaderActions.closeEditWindow, this.onCloseEditWindow);
    this.listenTo(uploaderActions.updateMaterial,  this.onUpdateMaterial);
    this.listenTo(uploaderActions.toggleCountry,   this.onToggleCountry);
  },

  onApiDidLoadMaterials: function (materials, err) {
    this.state.allMaterials = materials
    this.trigger(this.state)
  },

  onMaterialChangeSuccess: function() {
    this.state.editWindowOpen = false
    this.trigger(this.state)
  },

  onLoadCountriesSuccsess: function(countries) {
    this.state.countries = countries
    this.trigger(this.state)
  },

  onEditMaterial: function (material) {
    this.state.currentMaterial = material
    this.state.editWindowOpen  = true
    this.trigger(this.state)
  },

  onCloseEditWindow: function () {
    this.state.editWindowOpen = false
    this.trigger(this.state)
  },

  onUpdateMaterial: function () {
    this.trigger(this.state)
  },

  onToggleCountry: function(material, countryId) {
    var index = material.minedIn.indexOf(countryId)
    if (index >= 0) {
      material.minedIn.splice(index, 1)
    } else {
      material.minedIn.push(countryId)
    }
    
    this.trigger(this.state)
  }


});

module.exports = Store;