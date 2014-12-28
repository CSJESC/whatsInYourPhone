"use strict";

var React = require('react');
var guiActions = require('../../actions/guiActions');

var Infos = React.createClass({

  FACTORS: {
    material: {
      'key1': 1,
      'key2': 2,
      'key3': 1
    },
    country_factor: 1,
    country: {
      'key1': 1,
      'key2': 1
    } 
  },

  componentWillMount: function () {
    this.calcRating(this.props.material);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.material && !nextProps.material.calculatedRating) this.calcRating(nextProps.material);
  },

  calcRating: function (material) {
    var matRatings = material.rating;

    // the rating for the material itself
    var finalRating      = 0;
    var numberOfCriteria = 0;
    for (var criterion in matRatings) {
      finalRating      += matRatings[criterion] * this.FACTORS.material[criterion];
      numberOfCriteria ++;
    }

    // the rating for the countries the material is mined in
    var countryRating = 0;
    material.minedIn.forEach(function (country) {
      var currentCountryRating       = 0;
      var currentCountryRatingLength = 0;
      for (var criterion in country.rating) {
        currentCountryRating       += country.rating[criterion] * this.FACTORS.country[criterion];
        currentCountryRatingLength ++;
      }
      // average contry rating normalized by its share on mining the material
      countryRating += currentCountryRating / currentCountryRatingLength * country.share;
    }.bind(this));
    countryRating /= material.minedIn.length;

    finalRating += countryRating * this.FACTORS.country_factor;
    // calc average (+1 for country rating)
    finalRating /= numberOfCriteria + 1;
    
    guiActions.ratingCalculated(material, finalRating);
  },

  render: function () {
    if (this.props.material) {
      return (
        <div 
          className = "infos">
          <h2>Infos</h2>
          <p>{this.props.material.name} __ Rating: {this.props.material.calculatedRating} </p>
        </div>
      );
    } else {
      return (<div className = "empty infos" />);
    }
  }
});

module.exports = Infos;