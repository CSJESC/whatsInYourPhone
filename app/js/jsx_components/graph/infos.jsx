"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');

var UsedInList = require('./infos/usedIn.jsx');
var RatingInfo = require('./infos/rating.jsx');

var Infos = React.createClass({

  FACTORS: {
    material: {
      'recyclingRating':  function (rating) {
        // from 0 to 4 (higer is better)
        var normalized = rating * 25; 
        return normalized * 0.2; // (0.2) + 0.2 + 0.6 = 1
      }, 
      'healthRating': function (rating) {
        // from 0 to 4 (lower is better)
        var normalized = (rating - 4) * -25; 
        return normalized * 0.2; // 0.2 + (0.2) + 0.6 = 1
      }
    },
    country_factor: 0.6,         // 0.2 + 0.2 + (0.6) = 1
    country: {
      'workingConditionsRating': function (rating) {
        // from 1 to 5 (higer is better)
        var normalized = (rating - 1) * 25;
        return normalized * 0.5; // (0.5) + 0.3 + 0.2 = 1
      },    
      'humanRightsRating': function (rating) {
        // from 0 to 100 (higer is better)
        return rating     * 0.3; // 0.5 + (0.3) + 0.2 = 1
      },     
      'mineralIndustryRating': function (rating) {
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
    var matRatings = material;

    // the rating for the material itself
    var finalRating = 0;
    for (var criterion in matRatings) {
      if (Object.keys(this.FACTORS.material).indexOf(criterion) !== -1) {
        finalRating += this.FACTORS.material[criterion](matRatings[criterion]);
      }
    }

    // the rating for the countries the material is mined in
    var countryRating = 0;
    material.minedIn.forEach(function (country) {
      var currentCountryRating = 0;
      for (var criterion in country) {
        if (Object.keys(this.FACTORS.country).indexOf(criterion) !== -1) {
          currentCountryRating += this.FACTORS.country[criterion](country[criterion]);
        }
      }
      // average contry rating normalized by its share on mining the material
      countryRating += currentCountryRating * country.share;
    }.bind(this));

    finalRating += countryRating * this.FACTORS.country_factor;
    finalRating = parseInt(finalRating + 0.5); // round to whole number

    var color = this.getColor(finalRating);
    guiActions.ratingCalculated(material, finalRating, color, countryRating);
  },

  getColor: function (rating) {
    var colors = this.props.colors
    var colorName = 'red'
    for (var color in colors) {
      if (rating >= colors[color] && colors[color] > colors[colorName])
        colorName = color
    }
    return colorName
  },

  render: function () {
    if (this.props.material) {
      return (
        <div 
          className = "infos">
          <h2>{this.props.material.name}</h2>
          <RatingInfo 
            material  = {this.props.material} 
            getColor  = {this.getColor}
            colors    = {this.colors}
            popupOpen = {this.props.ratingPopup}
          />
          <UsedInList usedIn   = {this.props.material.usedIn} />
        </div>
      );
    } else {
      return (<div className = "empty infos" />);
    }
  }
});

module.exports = Infos;
