"use strict";

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var guiActions = require('../../actions/guiActions');

var Cart      = require('./cart.jsx');
var Infos     = require('./infos.jsx');
var StopLight = require('./stopLight.jsx');


var Page = React.createClass({
  numberOfCarts: 3,

  getNextCarts: function () {
    var carts  = []
    ,   offset = this.props.fromStore.cartOffset

    if (offset < 0) offset = 0 // always show 3 carts

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

  reload: function () {
    location.reload()
  },

  nextLink: function (isLastCart) {
    var offset = this.props.fromStore.cartOffset

    if (!isLastCart) {
      return (
        <a 
          className = "next" 
          onClick   = {guiActions.moveCarts}
        > 
          <span className = 'icono-caretLeft'/>
          {offset < 0 ? 'start' : 'next'}
          
        </a>
      )
    } else {
      return null
    }
  },

  skipLink: function (isLastCart, isRunning) {
    if (!isLastCart) {
      return (
        <a 
          className = "skip"
          onClick   = {guiActions.skipCarts}
        > 
          <span className = {isRunning? 'icono-pause' : 'icono-rewind'}/>
          {isRunning? 'stop' : 'Mine all'}
        </a>
      )
    } else {
      return (
        <a 
          className = "skip"
          onClick   = {this.reload}
        > 
          &#8634;
        </a>
      )
    }
  },

  render: function () {
    var allMaterials   = this.props.fromStore.allMaterials
    ,   offset         = this.props.fromStore.cartOffset
    ,   isAutoSkipping = this.props.fromStore.isAutoSkipping

    var isLastCart      = (offset >= allMaterials.length);
    var currentMaterial = allMaterials[offset];

    return (
      <div className = "carts">
        {this.nextLink(isLastCart)}
        {this.skipLink(isLastCart, isAutoSkipping)}
        <span className = "carts-list">
          <ReactCSSTransitionGroup transitionName = "move-carts">
            {this.getNextCarts()}
          </ReactCSSTransitionGroup>
        </span>

        <Infos 
          material       = {currentMaterial} 
          colors         = {this.props.fromStore.COLORS}
          fromStore      = {this.props.fromStore}
        />
        <StopLight 
          color       = {currentMaterial? currentMaterial.color : null} 
          colors      = {this.props.fromStore.COLORS}
          unshure     = {currentMaterial? currentMaterial.unshureFlag : null}
          popupIsOpen = {this.props.fromStore.stopLightPopupOpen}
        />
      </div>
    );
  }
});

module.exports = Page;