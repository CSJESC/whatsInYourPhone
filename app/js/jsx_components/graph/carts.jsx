"use strict";

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var guiActions = require('../../actions/guiActions');

var Cart      = require('./cart.jsx');
var Infos     = require('./infos.jsx');
var StopLight = require('./stopLight.jsx');
var NextLink  = require('./nextLink.jsx');


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
        material = {material}
        animate  = {!this.props.fromStore.isAllSkipping} />
      );
    }
    return carts;
  },

  reload: function () {
    location.reload()
  },

  skipLink: function (isLastCart, isRunning) {
    if (!isLastCart) {
      var skipIcon = <span className = 'icono-previous'/>
      return (
        <div className = "skip">
          <a 
            className = "skip-link"
            onClick   = {guiActions.skipCarts}
          > 
            {!isRunning? skipIcon : null}
          </a>
          <a 
            className = "skip-link"
            onClick   = {guiActions.autoMoveCarts}
          > 
            <span className = {isRunning? 'icono-pause' : 'icono-rewind'}/>
          </a>
        </div>
      )
    } else {
      return (
        <div className = "skip">
          <a 
            className = "skip-link"
            onClick   = {this.reload}
          > 
            &#8634;
          </a>
        </div>
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
        <NextLink 
          isLastCart = {isLastCart}
          cartOffset = {this.props.fromStore.cartOffset}
        />
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
          isLastCart     = {isLastCart}
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