"use strict";

var React = require('react');
var uploaderActions = require('../../actions/uploaderActions')
var cx = React.addons.classSet



var CountrySelector = React.createClass({

  listCountries: function(material, countries) {
    if (material.minedIn && typeof material.minedIn[0] === 'object'){
      material.minedIn = material.minedIn.map(function(country) {
        return country.id
      })
    }

    return countries.map(function(country) {
      var classes = cx({
        'country':  true,
        'selected': (material.minedIn && material.minedIn.indexOf(country.id) >= 0),
      })

      return (
        <li 
          key = {country.id} 
          className = {classes}
          onClick   = {uploaderActions.toggleCountry.bind(null, material, country.id)}
        >
          {country.name}
        </li>
      )
    })
  },

  render: function () {
    return (
      <ul className = "resource-list">
        {this.listCountries(this.props.material, this.props.countries)}
      </ul>
    );

  }
});

module.exports = CountrySelector;
