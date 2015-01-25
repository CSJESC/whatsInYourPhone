"use strict";

var React = require('react');

var StopLight = React.createClass({

  render: function () {
    return (
      <div className = {'stop-Light ' + this.props.color}>
      </div>
    );
  }
});

module.exports = StopLight;