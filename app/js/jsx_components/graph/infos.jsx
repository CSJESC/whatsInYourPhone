"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');

var InfosInner     = require('./infosInner.jsx');
var InsertDataLink = require('./insertDataLink.jsx');

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
    // the rating for the material itself
    var finalRating = 0
    var unshureFlag = false

    for (var criterion in this.FACTORS.material) {
      var formula = this.FACTORS.material[criterion]
      finalRating += formula(material[criterion])
      if (material[criterion] === undefined) {
        unshureFlag = true
      }
    }

    // the rating for the countries the material is mined in
    var countryRating
    if (material.minedIn.length > 0) {
      countryRating = 0
      var fallbackShare = 1 / material.minedIn.length

      material.minedIn.forEach(function (country) {
        var currentCountryRating = 0;
        for (var criterion in country) {
          if (Object.keys(this.FACTORS.country).indexOf(criterion) !== -1) {
            currentCountryRating += this.FACTORS.country[criterion](country[criterion]);
          }
        }
        // average contry rating normalized by its share on mining the material
        countryRating += currentCountryRating * (country.share || fallbackShare);
      }.bind(this));

      finalRating += countryRating * this.FACTORS.country_factor;
      countryRating = parseInt(countryRating)
    } else {
      unshureFlag = true
    }
    finalRating = parseInt(finalRating + 0.5); // round to whole number

    var color = this.getColor(finalRating);
    guiActions.ratingCalculated(material, finalRating, color, countryRating, unshureFlag);
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


  // LAYOUT

  innerInfos: function () {
    if (this.props.material && this.props.showInner) {
      return (
        <InfosInner
          material    = {this.props.material}
          ratingPopup = {this.props.ratingPopup}
        />
      )
    } else {
      return null
    }
  },

  render: function () {
    return (
      <div className = "infos">
        {this.innerInfos()}
        <InsertDataLink logInPopupOpen = {this.props.logInPopupOpen} />
      </div>
    )
  }
});

module.exports = Infos;
