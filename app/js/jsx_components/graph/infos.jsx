"use strict";

var React = require('react');
var guiActions = require('../../actions/guiActions');

var Infos = React.createClass({

  FACTORS: {
    material: {
      'recycling-rate':  function (rating) {
        // from 0 to 4 (higer is better)
        var normalized = rating * 25; 
        return normalized * 0.2; // (0.2) + 0.2 + 0.6 = 1
      }, 
      'health': function (rating) {
        // from 0 to 4 (lower is better)
        var normalized = (rating - 4) * -25; 
        return normalized * 0.2; // 0.2 + (0.2) + 0.6 = 1
      }
    },
    country_factor: 0.6,         // 0.2 + 0.2 + (0.6) = 1
    country: {
      'working-rights': function (rating) {
        // from 1 to 5 (higer is better)
        var normalized = (rating - 1) * 25;
        return normalized * 0.5; // (0.5) + 0.3 + 0.2 = 1
      },    
      'human-rights': function (rating) {
        // from 0 to 100 (higer is better)
        return rating     * 0.3; // 0.5 + (0.3) + 0.2 = 1
      },     
      'mineral-industry-rating': function (rating) {
        // from 0 to 70 (higer is better)
        var normalized = rating * 1.428;
        return normalized * 0.2; // 0.5 + 0.3 + (0.2) = 1
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
    for (var criterion in matRatings) {
      finalRating      += this.FACTORS.material[criterion](matRatings[criterion]);
    }

    // the rating for the countries the material is mined in
    var countryRating = 0;
    material.minedIn.forEach(function (country) {
      var currentCountryRating       = 0;
      for (var criterion in country.rating) {
        currentCountryRating       += this.FACTORS.country[criterion](country.rating[criterion]);
      }
      // average contry rating normalized by its share on mining the material
      countryRating += currentCountryRating * country.share;
    }.bind(this));
    countryRating /= material.minedIn.length;

    finalRating += countryRating * this.FACTORS.country_factor;
    // calc average (+1 for country rating)
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