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
          materials        = {this.props.fromStore.deviceMaterials}
          selectedMaterial = {this.props.fromStore.deviceSelectedMaterial}
          ratingPopup      = {this.props.fromStore.ratingPopupOpen}
        />
        <Carts fromStore = {this.props.fromStore} />
      </div>
    );
  }
});

module.exports = Page;