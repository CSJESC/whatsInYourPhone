"use strict";

var React = require('react');
var uploaderActions = require('../../actions/uploaderActions')

var CountryList = React.createClass({
  componentDidEnter: function() {
    setTimeout(function() {this.getDOMNode().setAttribute("class", "add-menu visible")}.bind(this), 20)
  },

  componentWillLeave: function(callback) {
    this.getDOMNode().setAttribute("class", "add-menu")
    setTimeout(callback, 200)
  },

  listCountries: function(countries) {
    var even = true;
    var evenString;
    var countryList = []
    countries.forEach(function (country, n) {
        if (even) {
            evenString = 'even';
        } else {
            evenString = 'uneven';
        }
        even = !even;
        countryList.push(
          <div 
            key       = {country.id}
            className = {'country-item ' + evenString}
          >
            <div className="headline-left">
            <h3>{country.name}</h3>
          </div>
          <div className="edit">
            <a 
              onClick = {uploaderActions.editCountry.bind(null, country)}>
              Edit >>
            </a>
          </div>
        </div>
        );
    });

    return countryList
  },

  render: function () {
    return (
      <div className="add-menu" id="countries">
        <a 
          className = "close-add-menus pop-up-navigation" 
          onClick   = {uploaderActions.closePopup}
        >
          X
        </a>
        <h2>
          Country Ratings & Info
        </h2>
        <p><a id="add-country-btn" href="#">Add Country >></a></p>
        <div id="country-list">
          {this.listCountries(this.props.countries)}
        </div>
      </div>
    )

  }
});

module.exports = CountryList;
