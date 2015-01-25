"use strict";

var React = require('react');

var UsedIn = React.createClass({

  listParts: function (parts) {
    var partList = this.props.usedIn.map(function(part) {
      return (
        <li 
          key       = {part.name}
          className = "part-name">
          {part.name}
        </li>
      );
    });

    if (partList.length === 0) {
      partList[0] = (
        <li 
          key       = 'unkown'
          className = "part-name">
          ????
        </li>
      )
    }

    return partList
  },

  render: function () {
    

    return (
      <ul className = "used-in">
        <h3 className ="used-in-title">
          Used In:
        </h3>
        {this.listParts()}
      </ul>
    );
  }
});

module.exports = UsedIn;