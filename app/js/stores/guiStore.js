var Reflux = require('reflux');
var guiActions = require('../actions/guiActions');
var GuiStore = Reflux.createStore({
  init: function() {
    this.state = {
      cartOffset: 0,
      deviceMaterials: []
    };

    this.listenTo(guiActions.moveCarts, this.onCartMoved);
  },
  
  onCartMoved: function(material) {
    this.state.cartOffset += 1;
    this.state.deviceMaterials.push(material);
    this.trigger(this.state);
  }
});

module.exports = GuiStore;