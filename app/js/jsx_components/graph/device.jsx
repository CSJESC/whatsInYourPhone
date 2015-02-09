"use strict";

var React = require('react/addons');

var guiActions = require('../../actions/guiActions');
var InfosInner = require('./infosInner.jsx');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Page = React.createClass({

  listMaterials: function () {
    var list = this.props.materials.map(function(material, i) {
      var cx = React.addons.classSet;
      var classes = cx({
        'device-material': true,
        'unshure':         material.unshureFlag,
        'active':          (this.props.selectedMaterial && material.id == this.props.selectedMaterial.id)
      })

      return (
        <li 
          key       = {i}
          className = {classes + ' ' + material.color}
          onClick   = {guiActions.selectDeviceMaterial.bind(null, material)}
        >
          {material.name}
        </li>
      );
    }.bind(this));

    list.reverse();
    return list
  },

  materialInformationPopup: function (material) {
    if (material && this.props.showInner) {
      return (
        <InfosInner
          material        = {material}
          ratingPopup     = {this.props.ratingPopup}
          selectedCountry = {this.props.selectedCountry}
        />
      )
    } else {
      return null
    }
  },

  render: function () {
    return (
      <div 
        className = "device">
        <p className = "questionnaire">?</p>
        <ul className = "device-materials">
          <ReactCSSTransitionGroup transitionName = "slide-up">
            {this.listMaterials()}
          </ReactCSSTransitionGroup>
        </ul>
        
        {this.materialInformationPopup(this.props.selectedMaterial)}
      </div>
    );
  }
});

module.exports = Page;