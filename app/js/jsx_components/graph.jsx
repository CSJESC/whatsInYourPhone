"use strict";

var React = require('react');

var Device    = require('./graph/device.jsx');
var Carts     = require('./graph/carts.jsx');

var Page = React.createClass({

  render: function () {
    return (
      <div 
        className = "graph">
        <Device 
          materials        = {this.props.fromStore.deviceMaterials}
          selectedMaterial = {this.props.fromStore.deviceSelectedMaterial}
          selectedCountry  = {this.props.fromStore.selectedCountry}
          ratingPopup      = {this.props.fromStore.ratingPopupOpen}
          showInner        = {!this.props.fromStore.logInPopupOpen}
        />
        <Carts fromStore = {this.props.fromStore} />
      </div>
    );
  }
});

module.exports = Page;