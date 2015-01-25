"use strict";

var React = require('react');

var Page = React.createClass({

  listMaterials: function () {
    return this.props.materials.map(function(material, i) {
      return (
        <li 
          key       = {i}
          className = {'device-material ' + material.color}>
          {material.name}
        </li>
      );
    });
  },

  render: function () {
    return (
      <div 
        className = "device">
        <ul className = "device-materials">
        {this.listMaterials()}
        </ul>
      </div>
    );
  }
});

module.exports = Page;