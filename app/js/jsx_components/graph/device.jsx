"use strict";

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Page = React.createClass({

  listMaterials: function () {
    var list = this.props.materials.map(function(material, i) {
      var cx = React.addons.classSet;
      var classes = cx({
        'device-material': true,
        'unshure':         material.unshureFlag
      })
      
      return (
        <li 
          key       = {i}
          className = {classes + ' ' + material.color}>
          {material.name}
        </li>
      );
    });

    list.reverse();
    return list
  },

  render: function () {
    return (
      <div 
        className = "device">
        <ul className = "device-materials">
          <ReactCSSTransitionGroup transitionName = "slide-up">
            {this.listMaterials()}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
});

module.exports = Page;