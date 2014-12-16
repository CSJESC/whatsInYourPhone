"use strict";

var React = require('react');

var Infos = React.createClass({

  FACTORS: {
    material: {
      'key1': 1,
      'key2': 2,
      'key3': 1
    },
    country: {
      'key1': 1,
      'key2': 1
    }
  },

  calcRating: function () {
    var matRatings = this.props.material.rating;

    // the rating for the material itself
    var finalRating      = 0;
    var numberOfCriteria = 0;
    for (var criterion in matRatings) {
      finalRating      += matRatings[criterion] * this.FACTORS.material[criterion];
      numberOfCriteria ++;
    }

    // the rating for the countries the material is mined in
    var countryRating = 0;
    this.props.material.minedIn.forEach(function (country) {
      var currentCountryRating       = 0;
      var currentCountryRatingLength = 0;
      for (var criterion in country.rating) {
        currentCountryRating       += country.rating[criterion] * this.FACTORS.country[criterion];
        currentCountryRatingLength ++;
      }
      countryRating += currentCountryRating / currentCountryRatingLength * country.share;
      console.log(country.share);
    }.bind(this));
    countryRating /= this.props.material.minedIn.length;
    console.log(countryRating);

    finalRating += countryRating;
    // calc average (+1 for country rating)
    finalRating /= numberOfCriteria + 1;
    
    return finalRating;
  },

  render: function () {
    if (this.props.material) {
      return (
        <div 
          className = "infos">
          <h2>Infos</h2>
          <p>{this.props.material.name} Rating: {this.calcRating()} </p>
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = Infos;