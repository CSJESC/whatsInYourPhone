"use strict";

var React = require('react');
var guiActions = require('../../actions/guiActions');

var Cart = require('./cart.jsx');

var Page = React.createClass({
  numberOfCarts: 3,

  getNextCarts: function () {
    var carts = [];
    for (var i = 0; i < this.numberOfCarts; i++) {
      var material = this.props.materials[i + this.props.offset];
      if (i == 0) {
        this.highlightedMaterial = material;
      }
      carts.push(
        <Cart 
          key      = {i}
          material = {material} />
      );
    }
    return carts;
  },

  moveCarts: function () {
    guiActions.moveCarts(this.highlightedMaterial);
  },

  render: function () {
    return (
      <div 
        className = "carts">
        Carts:
        {this.getNextCarts()}
        <a 
          onClick = {this.moveCarts}>
          next
        </a>

      </div>
    );
  }
});

module.exports = Page;