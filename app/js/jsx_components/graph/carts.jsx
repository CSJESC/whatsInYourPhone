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

  skipCarts: function () {
    window.setInterval(this.moveCarts, 200);
  },

  render: function () {
    var isLastCart = (this.props.offset >= this.props.allMaterials.length);
    var nextLink = (
      <a 
        onClick = {this.moveCarts}>
        next
      </a>
    );
    var skipLink = (
      <a 
        onClick = {this.skipCarts}>
        skip
      </a>
    );

    return (
      <div 
        className = "carts">
        <h2>Carts:</h2>
        {isLastCart? null : nextLink}
        {this.getNextCarts()}

        <Infos
          material = {this.highlightedMaterial} 
        />
        {isLastCart? null : skipLink}

      </div>
    );
  }
});

module.exports = Page;