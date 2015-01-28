"use strict";

var React = require('react');

var Page = React.createClass({

  render: function () {
    var color = ''
    if (this.props.material) 
      color = this.props.material.color
    return (
      <div 
        className = "cart">
        <img 
          className = {'cart-img' + color}
          src       = "./img/miningCartWhite.svg"
        />
        <p className = "cart-name">
          {this.props.material? this.props.material.name : '?'}
        </p>
      </div>
    );
  }
});

module.exports = Page;