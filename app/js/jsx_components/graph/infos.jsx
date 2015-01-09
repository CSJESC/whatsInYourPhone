"use strict";

var React = require('react');
var guiActions = require('../../actions/guiActions');

var Infos = React.createClass({

  FACTORS: {
    material: {
      'recycling-rate':  function (rating) {
        // from 0 to 4
        var normalized = rating * 25; 
        return normalized * 0.5; // (0.5) + 0.5 + 2 = 3
      }, 
      'health': function (rating) {
        // from 0 to -4
        var normalized = (rating - 4) * -25; 
        return normalized * 0.5; // 0.5 + (0.5) + 2 = 3
      }
    },
    country_factor: 2,           // 0.5 + 0.5 + (2) = 3
    country: {
      'working-rights': function (rating) {
        // from 1 to 5
        var normalized = (rating - 1) * 25;
        return normalized * 1.5; // (1.5) + 0.8 + 0.7 = 3
      },    
      'human-rights': function (rating) {
        // from 0 to 100
        return rating     * 0.8; // 1.5 + (0.8) + 0.7 = 3
      },     
      'mineral-industry-rating': function (rating) {
        // from 0 to 70
        var normalized = rating * 1.428;
        return normalized * 0.7; // 1.5 + 0.8 + (0.7) = 3
      }
    } 
  },

  componentWillMount: function () {
    this.calcRating(this.props.material);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.material && typeof(nextProps.material.calculatedRating) == 'undefined') 
      this.calcRating(nextProps.material);
  },

  calcRating: function (material) {
    var matRatings = material.rating;

    // the rating for the material itself
    var finalRating      = 0;
    var numberOfCriteria = 0;
    for (var criterion in matRatings) {
      finalRating      += this.FACTORS.material[criterion](matRatings[criterion]);
      numberOfCriteria ++;
    }

    // the rating for the countries the material is mined in
    var countryRating = 0;
    material.minedIn.forEach(function (country) {
      var currentCountryRating       = 0;
      var currentCountryRatingLength = 0;
      for (var criterion in country.rating) {
        currentCountryRating       += this.FACTORS.country[criterion](country.rating[criterion]);
        currentCountryRatingLength ++;
      }
      // average contry rating normalized by its share on mining the material
      countryRating += currentCountryRating / currentCountryRatingLength * country.share;
    }.bind(this));
    countryRating /= material.minedIn.length;

    finalRating += countryRating * this.FACTORS.country_factor;
    // calc average (+1 for country rating)
    finalRating /= numberOfCriteria + 1;
    finalRating = parseInt(finalRating + 0.5); // round to whole number
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