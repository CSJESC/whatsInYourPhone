"use strict";

var React = require('react');

var Cart = require('./cart.jsx');

var Page = React.createClass({
  numberOfCarts: 3,

  getNextCarts: function () {
    var carts = [];
    for (var i = 0; i < this.numberOfCarts; i++) {
      carts.push(
        <Cart material = {this.props.materials[i + this.props.offset]} />
      );
    }
    return carts;
  },

  render: function () {
    return (
      <div 
        className = "carts">
        {this.getNextCarts()}
      </div>
    );
  }
});

module.exports = Page;