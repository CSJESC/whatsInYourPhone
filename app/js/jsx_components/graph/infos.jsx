"use strict";

var React = require('react');

var Page = React.createClass({

  render: function () {
    if (this.props.material) {
      return (
        <div 
          className = "infos">
          <h2>Infos</h2>
          <p>{this.props.material.name} / {this.props.material.mg}mg </p>
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = Page;