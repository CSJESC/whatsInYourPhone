"use strict";

var React = require('react');
var Map = require('./map.jsx');

var WorldMap = React.createClass({
  countryData: function(country) {
    if (!country)
      return null
    else
      return (
        <ul className = "country-ratings">
          <li className = "rating-item">
            <dt>Human Rights: </dt>
            <dd>{this.props.country.humanRightsRating? this.props.country.humanRightsRating : '?'} / 100</dd>
          </li>
          <li className = "rating-item">
            <dt>Working Rights: </dt>
            <dd>{this.props.country.workingConditionsRating? this.props.country.workingConditionsRating - 1 : '?'} / 4</dd>
          </li>
          <li className = "rating-item">
            <dt>Mining Industry:</dt>
            <dd>{this.props.country.mineralIndustryRating? this.props.country.mineralIndustryRating : '?'} / 70</dd>
          </li>
        </ul>
      )
  },

  render: function () {
    var countryName = this.props.country? this.props.country.name : null
    
    return (
      <div className = "world-map">
        <Map country = {countryName} width={this.props.width} height={this.props.height} />
        {this.countryData(this.props.country)}
      </div>
    );
  }
});

module.exports = WorldMap;
