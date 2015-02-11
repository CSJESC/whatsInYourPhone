"use strict";

var React = require('react');

var store      = require('../stores/store');
var apiActions = require('../actions/apiActions');

var Graph      = require('./graph.jsx');
var Navigation = require('./general/navigation.jsx');

var Page = React.createClass({
  getInitialState: function () {
    return null
  },

  componentDidMount: function() {
    this.unsubscribeStore = store.listen(this.guiStoreChanged);
    apiActions.loadDeviceMaterials();
  },

  componentWillUnmount: function() {
    this.unsubscribeStore();
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
