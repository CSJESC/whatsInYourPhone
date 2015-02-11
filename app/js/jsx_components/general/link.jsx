"use strict";

var React = require('react');

var Link = React.createClass({

  render: function () {
    var href = this.props.href == '=>' ? this.props.children : this.props.href
    return(
      <a {...this.props} href = {href}>
        {this.props.children}
      </a>
    )
  }
});

module.exports = Link;
