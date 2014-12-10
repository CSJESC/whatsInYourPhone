"use strict";

var React = require('react');

var apiStore   = require('../stores/apiStore');
var apiActions = require('../actions/apiActions');


var Page = React.createClass({
  getInitialState: function () {
    return {
      fromApiStore: {}
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
    return (
      <div 
        className = "view">
      </div>
    );
  }
});

module.exports = Page;