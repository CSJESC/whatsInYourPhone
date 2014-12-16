var Reflux    = require('reflux');
var apiActions = require('../actions/apiActions');
var guiActions = require('../actions/guiActions');

var GuiStore = Reflux.createStore({
  init: function() {
    this.state = {
      cartOffset:       0,
      deviceMaterials:  [],
      allMaterials:     []
    };

    this.listenTo(guiActions.moveCarts, this.onCartMoved);
    this.listenTo(apiActions.loadSuccess, this.onApiDidLoad);
  },
  
  onCartMoved: function(material) {
    this.state.deviceMaterials.push(this.state.allMaterials[this.state.cartOffset]);
    this.state.cartOffset += 1;
    this.trigger(this.state);
  },

  onApiDidLoad: function (materials) {
    this.state.allMaterials = materials
    this.trigger(this.state);
  },
});

module.exports = GuiStore;