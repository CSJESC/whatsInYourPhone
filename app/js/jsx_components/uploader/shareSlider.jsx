"use strict";

var React = require('react');
var uploaderActions = require('../../actions/uploaderActions')
var cx = React.addons.classSet



var ShareSlider = React.createClass({

  prevX:       0,
  mousedown:   false,
  intervallId: 0,
  dragStart: function (evt) {
    this.prevX       = evt.pageX
    this.mousedown   = true
  },

  dragStop: function (evt) {
    this.mousedown = false
  },

  updateShare: function (countryId, evt) {  
    if (!this.mousedown)
      return

    var xDiff = evt.pageX - this.prevX
    this.prevX = evt.pageX
    uploaderActions.updateShare(this.props.material, countryId, xDiff)
  },

  listCountries: function(material) {
    return material.minedIn.map(function(countryId) {
      var country = this.getCountry(countryId)
      if (!material.shares)
        material.shares = {}
      if (material.shares[country.id] === undefined)
        material.shares[country.id] = 100 / material.minedIn.length
      var share = material.shares[country.id]

      return (
        <div 
          key          = {country.id} 
          className    = 'country'
          onMouseDown  = {this.dragStart}
          onMouseUp    = {this.dragStop}
          onMouseLeave = {this.dragStop}
          onMouseMove  = {this.updateShare.bind(null, country.id)}
        >
          <div 
            className   = 'slider'
            style       = {{width: share * 4}} 
          />
          {country.name} {parseInt(share)}%
        </div>
      )
    }.bind(this))
  },

  getCountry: function (countryId) {
    var found = {}
    this.props.countries.forEach(function (country) {
      if (country.id == countryId)
        found = country
    })
    return found
  },

  render: function () {
    return (
      <div className = "share-slider">
        {this.listCountries(this.props.material)}
      </div>
    );

  }
});

module.exports = ShareSlider;
