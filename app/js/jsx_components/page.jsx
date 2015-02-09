"use strict";

var React = require('react');

var guiStore   = require('../stores/guiStore');
var apiActions = require('../actions/apiActions');

var Graph      = require('./graph.jsx');
var Navigation = require('./navigation.jsx');

var Page = React.createClass({
  getInitialState: function () {
    return null
  },

  componentDidMount: function() {
    this.unsubscribeGuiStore = guiStore.listen(this.guiStoreChanged);
    apiActions.loadDeviceMaterials();
  },

  componentWillUnmount: function() {
    this.unsubscribeGuiStore();
  },

  guiStoreChanged: function (storeState) {
    this.setState( storeState );
  },

  render: function () {
    if (!this.state) {
      return false;
    }

    return (
      <div
        className = "view">
        <Graph fromStore = {this.state} />
        <Navigation />
      </div>
    );

  }
});

module.exports = Page;
