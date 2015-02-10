"use strict";

var React = require('react/addons');
var guiActions = require('../../../actions/guiActions');


var List = React.createClass({

  listParts: function () {
    var partList = this.props.items.map(function(part) {
      var action
      if (this.props.itemAction) {
        action = this.props.itemAction.bind(null, part)
      }

      var cx = React.addons.classSet;
      var classes = cx({
        'item-name': true,
        'clickable': this.props.itemAction,
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
          className = "item-name clickable"
          onClick   = {guiActions.logInClicked}>
          missing Data
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

module.exports = List;