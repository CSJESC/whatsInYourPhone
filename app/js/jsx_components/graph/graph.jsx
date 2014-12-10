"use strict";

var React = require('react');

var Device = require('./device.jsx');
var Carts  = require('./carts.jsx');
var Infos  = require('./infos.jsx');

var Page = React.createClass({

  getAllMaterials: function () {
    var allMaterials = [];
    this.props.stateFromApiStore.device[0].parts.forEach(function (part) {
      part.materials.forEach(function (material) {
        // TODO: handle materials that exist in different parts
        allMaterials.push(material);
      });
    });
    return allMaterials;
  },

  render: function () {
    return (
      <div 
        className = "graph">
        <Device />
        <Carts 
          materials = {this.getAllMaterials()}
          offset    = {0}
        />
      </div>
    );
  }
});

module.exports = Page;