"use strict";

var React = require('react');

var Device = require('./device.jsx');
var Carts  = require('./carts.jsx');

var Page = React.createClass({

  // getAllMaterials: function () {
  //   var allMaterials = []; //blub
  //   this.props.stateFromApiStore.device[0].parts.forEach(function (part) {
  //     part.materials.forEach(function (material) {
  //       // TODO: handle materials that exist in different parts
  //       allMaterials.push(material);
  //     });
  //   });
  //   return allMaterials;
  // },

  render: function () {
    return (
      <div 
        className = "graph">
        <Device 
          materials = {this.props.fromStore.deviceMaterials || []}/>
        <Carts 
          allMaterials = {this.props.fromStore.allMaterials}
          offset       = {this.props.fromStore.cartOffset || 0}
        />
      </div>
    );
  }
});

module.exports = Page;