var Reflux = require('reflux');
var apiActions = require('../actions/apiActions');
var ApiStore = Reflux.createStore({
  init: function() {
    this.state = {
      device: null
    };

    this.listenTo(apiActions.loadSuccess, this.onLoadSuccess);
  },
  
  onLoadSuccess: function(data) {
    this.state.device = data;
    this.trigger(this.state);
  }
});

module.exports = ApiStore;