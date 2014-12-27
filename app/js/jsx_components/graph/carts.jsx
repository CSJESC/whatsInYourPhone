"use strict";

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var guiActions = require('../../actions/guiActions');

var Cart  = require('./cart.jsx');
var Infos = require('./infos.jsx');

var Page = React.createClass({
  numberOfCarts: 3,

  getNextCarts: function () {
    var carts = [];
    for (var i = 0; i < this.numberOfCarts; i++) {
      var key      = i + this.props.offset;
      var material = this.props.allMaterials[key];
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
    var isLastCart = (this.props.offset >= this.props.allMaterials.length);

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

    return (
      <div className = "carts">
        {isLastCart? null : nextLink}
        {isLastCart? null : skipLink}
        <ReactCSSTransitionGroup transitionName = "move-carts">
          {this.getNextCarts()}
        </ReactCSSTransitionGroup>
        <Infos material = {this.props.allMaterials[this.props.offset]} />
      </div>
    );
  }
});

module.exports = Page;