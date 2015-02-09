"use strict";

var React = require('react');
var Map = require('./map.jsx');

var WorldMap = React.createClass({
  render: function () {
    if (this.props.country) {
      return (
        <div className = "world-map">
          <Map country = {this.props.country.name} width={this.props.width} height={this.props.height} />
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
        </div>
      );
    } else {
      return null
    }
  }
});

module.exports = WorldMap;
