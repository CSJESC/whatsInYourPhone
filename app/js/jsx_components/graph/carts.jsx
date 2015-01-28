"use strict";

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var guiActions = require('../../actions/guiActions');

var Cart      = require('./cart.jsx');
var Infos     = require('./infos.jsx');
var StopLight = require('./stopLight.jsx');


var Page = React.createClass({
  numberOfCarts: 3,

  COLORS: {
    red:        0,
    orange:     25,
    yellow:     50,
    lightGreen: 70,
    green:      90,
  },

  getNextCarts: function () {
    var carts  = []
    ,   offset = this.props.fromStore.cartOffset

    for (var i = 0; i < this.numberOfCarts; i++) {
      var key      = i + offset;
      var material = this.props.fromStore.allMaterials[key];
      // a cart can have "material = null" it knows what to do
      carts.push(
        <Cart 
        key      = {key}
        material = {material} />
      );
      
    }
    return carts;
  },

  render: function () {
    var allMaterials = this.props.fromStore.allMaterials
    ,   offset       = this.props.fromStore.cartOffset

    var isLastCart   = (offset >= allMaterials.length);

    var nextLink = (
      <a 
        className = "next" 
        onClick   = {guiActions.moveCarts}
      > 
        next
      </a>
    );
    var skipLink = (
      <a 
        className = "skip"
        onClick   = {guiActions.skipCarts}
      > 
        skip 
      </a>
    );

    var currentMaterial = allMaterials[offset];

    return (
      <div className = "carts">
        {isLastCart? null : nextLink}
        {isLastCart? null : skipLink}
        <ReactCSSTransitionGroup transitionName = "move-carts">
          {this.getNextCarts()}
        </ReactCSSTransitionGroup>

        <Infos 
          material    = {currentMaterial} 
          colors      = {this.COLORS}
          ratingPopup = {this.props.fromStore.ratingPopup}
          showInner   = {!this.props.fromStore.deviceSelectedMaterial}
        />
        <StopLight 
          color       = {currentMaterial? currentMaterial.color : null} 
          colors      = {this.COLORS}
          unshure     = {currentMaterial? currentMaterial.unshureFlag : null}
          popupIsOpen = {this.props.fromStore.stopLightPopup}
        />
      </div>
    );
  }
});

module.exports = Page;