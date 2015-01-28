"use strict";

var React = require('react/addons');

var UsedIn = React.createClass({

  listParts: function () {
    var partList = this.props.items.map(function(part) {
      var action
      if (this.props.itemAction) {
        action = this.props.itemAction.bind(null, part)
      }

      var cx = React.addons.classSet;
      var classes = cx({
        'item-name': true,
        'active':    (this.props.selected == part)
      })

      return (
        <li 
          key       = {part.name}
          className = {classes}
          onClick   = {action}
        >
          {part.name}
        </li>
      );
    }.bind(this));

    if (partList.length === 0) {
      partList[0] = (
        <li 
          key       = 'unkown'
          className = "item-name">
          ????
        </li>
      )
    }

    return partList
  },

  render: function () {
    return (
      <ul className = "list">
        <h3 className ="list-title">
          {this.props.title}
        </h3>
        {this.listParts()}
      </ul>
    );
  }
});

module.exports = UsedIn;