"use strict";

var React = require('react');

var Device    = require('./device.jsx');
var Carts     = require('./carts.jsx');

var Page = React.createClass({

  render: function () {
    return (
      <div 
        className = "graph">
        <Device 
          materials = {this.props.fromStore.deviceMaterials}/>
        <Carts 
          allMaterials   = {this.props.fromStore.allMaterials}
          offset         = {this.props.fromStore.cartOffset}
          stopLightPopup = {this.props.fromStore.stopLightPopupOpen}
          ratingPopup    = {this.props.fromStore.ratingPopup}
        />
      </div>
    );
  }
});

module.exports = Page;