"use strict";

var React = require('react');

var Page = React.createClass({

  render: function () {
    var color = ''
    if (this.props.material) 
      color = this.props.material.color
    return (
      <div 
        className = {'cart ' + color}>
        {this.props.material? this.props.material.name : '?'}
        {this.props.material? this.props.material.calculatedRating : ''}
      </div>
    );
  }
});

module.exports = Page;