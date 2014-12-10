"use strict";

var React = require('react');

var guiStore   = require('../stores/guiStore');
var apiStore   = require('../stores/apiStore');
var apiActions = require('../actions/apiActions');

var Graph = require('./graph/graph.jsx');

var Page = React.createClass({
  getInitialState: function () {
    return {
      fromApiStore: null,
      fromGuiStore: {}
    }
  },

  componentDidMount: function() {
    this.unsubscribeApiStore = apiStore.listen(this.apiStoreChanged);
    this.unsubscribeGuiStore = guiStore.listen(this.guiStoreChanged);
    apiActions.loadDevice();
  },

  componentWillUnmount: function() {
    this.unsubscribeApiStore();
    this.unsubscribeGuiStore();
  },

  apiStoreChanged: function (apiState) {
    this.setState({ fromApiStore: apiState });
  },

  guiStoreChanged: function (guiState) {
    this.setState({ fromGuiStore: guiState });
  },

  render: function () {
    if (this.state.fromApiStore) {
      return (
        <div 
          className = "view">
          <Graph
            stateFromApiStore = {this.state.fromApiStore}
            stateFromGuiStore = {this.state.fromGuiStore} />
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = Page;