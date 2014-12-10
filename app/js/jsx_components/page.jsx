"use strict";

var React = require('react');

var apiStore   = require('../stores/apiStore');
var apiActions = require('../actions/apiActions');

var Graph = require('./graph/graph.jsx');

var Page = React.createClass({
  getInitialState: function () {
    return {
      fromApiStore: null
    }
  },

  componentDidMount: function() {
    this.unsubscribeApiStore = apiStore.listen(this.apiStoreChanged);
    apiActions.loadDevice();
  },

  componentWillUnmount: function() {
    this.unsubscribeApiStore();
  },

  apiStoreChanged: function (apiState) {
    this.setState({ fromApiStore: apiState });
    console.log(this.state.fromApiStore);
  },

  render: function () {
    if (this.state.fromApiStore) {
      return (
        <div 
          className = "view">
          <Graph
            stateFromApiStore = {this.state.fromApiStore} />
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = Page;