"use strict";

var React = require('react');

var Page = React.createClass({

  listMaterials: function () {
    return this.props.materials.map(function(material, i) {
      return (
        <p key = {i}>
          {material.name}
        </p>
      );
    });
  },

  render: function () {
    return (
      <div 
        className = "device">
        <h2>Device</h2>
        {this.listMaterials()}
      </div>
    );
  }
});

module.exports = Page;