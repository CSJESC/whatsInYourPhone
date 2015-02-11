var Reflux    = require('reflux');
var apiActions      = require('../actions/apiActions');
var uploaderActions = require('../actions/uploaderActions');

var Store = Reflux.createStore({
  init: function() {
    this.state = {
      allMaterials:    [],
      currentMaterial: null,

      editWindowOpen: false
    };

    this.listenTo(apiActions.loadMaterialSuccess,  this.onApiDidLoadMaterials);
    this.listenTo(uploaderActions.editMaterial,    this.onEditMaterial);
    this.listenTo(uploaderActions.closeEditWindow, this.onCloseEditWindow);
    this.listenTo(uploaderActions.updateMaterial,  this.onUpdateMaterial);
  },

  onApiDidLoadMaterials: function (materials, err) {
    this.state.allMaterials = materials
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
  }


});

module.exports = Store;