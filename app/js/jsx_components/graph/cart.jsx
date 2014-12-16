"use strict";

var React = require('react');

var Page = React.createClass({

  render: function () {
    return (
      <div 
        className = "cart">
        {this.props.material? this.props.material.name : '?'}
      </div>
    );
  }
});

module.exports = Page;