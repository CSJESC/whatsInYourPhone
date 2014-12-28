"use strict";

var React = require('react');

var Page = React.createClass({

  render: function () {
    return (
      <div 
        className = "cart">
        {this.props.material? this.props.material.name : '?'}
        {this.props.material? this.props.material.calculatedRating : ''}
      </div>
    );
  }
});

module.exports = Page;