"use strict";

var React = require('react');
var guiActions = require('../../actions/guiActions');

var Cart  = require('./cart.jsx');
var Infos = require('./infos.jsx');

var Page = React.createClass({
  numberOfCarts: 3,

  getNextCarts: function () {
    var carts = [];
    for (var i = 0; i < this.numberOfCarts; i++) {
      var material = this.props.allMaterials[i + this.props.offset];
      // a cart can have material = null it knows what to do
      carts.push(
        <Cart 
        key      = {i}
        material = {material} />
      );
      
    }
    return carts;
  },

  render: function () {
    var isLastCart = (this.props.offset >= this.props.allMaterials.length);

    var nextLink = (
      <a onClick = {guiActions.moveCarts}> next </a>
    );
    var skipLink = (
      <a onClick = {guiActions.skipCarts}> skip </a>
    );

    return (
      <div className = "carts">
        <h2>Carts:</h2>
        {isLastCart? null : nextLink}
        {this.getNextCarts()}
        <Infos material = {this.props.allMaterials[this.props.offset]} />
        {isLastCart? null : skipLink}
      </div>
    );
  }
});

module.exports = Page;