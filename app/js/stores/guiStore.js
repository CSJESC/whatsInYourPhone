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

    this.listenTo(apiActions.loadSuccess, this.onApiDidLoad);
    this.listenTo(guiActions.moveCarts, this.onCartMoved);
    this.listenTo(guiActions.skipCarts, this.onSkipCharts);
  },
  
  onCartMoved: function () {
    var currentMaterial = this.state.allMaterials[this.state.cartOffset];
    if (currentMaterial) {
      this.state.deviceMaterials.push(currentMaterial);
      this.state.cartOffset += 1;
      this.trigger(this.state);
    } else {
      clearInterval(this.skipIntervall);
    }
  },

  onSkipCharts: function () {
    this.skipIntervall = setInterval(this.onCartMoved.bind(this), 200);
  },

  onApiDidLoad: function (materials) {
    this.state.allMaterials = materials
    this.trigger(this.state);
  },
});

module.exports = GuiStore;