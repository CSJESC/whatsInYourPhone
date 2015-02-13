"use strict";

var React = require('react');
var guiActions = require('../../actions/guiActions');



var NextLink = React.createClass({

  render: function () {
    var offset = this.props.cartOffset

    if (!this.props.isLastCart) {
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
  }
});

module.exports = NextLink;