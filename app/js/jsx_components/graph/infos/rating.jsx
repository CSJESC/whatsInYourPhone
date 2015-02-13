"use strict";

var React = require('react');
var guiActions = require('../../../actions/guiActions');


var Rating = React.createClass({

  closePopup: function (e) {
    e.stopPropagation()
    guiActions.closeRatingPopup()
  },

  popup: function () {
    if (this.props.popupOpen) {
      return (
        <div className = "popup">
          <a 
            className = "close"
            onClick   = {this.closePopup}
          >
            &#10005;
          </a>
          <h3 className = "title">Weighting</h3>

          <ul className = "weighting-chart">
            <li className ="health block">Health: 20%</li>
            <li className ="recicling block">Recyclability: 20%</li>
            <li className ="country block">
              Country Rating: 60%
              <ul className = "country-chart">
                <li className ="working block">working Conditions: 50%</li>
                <li className ="human block">human Rights: 30%</li>
                <li className ="mineral block">mineral Industry Rating: 20%</li>
              </ul>
            </li>
          </ul>
        </div>
      )
    } else {
      return null
    }
  },

  render: function () {
    var positiveHealthRating = (this.props.material.healthRating - 4) * -1

    return (
      <ul 
        className = "rating"
        onClick   = {guiActions.openRatingPopup}
      >
        <li className = "rating-item">
          <dd className = "rating-number">
            {(this.props.material.healthRating !== undefined)? positiveHealthRating + ' / 4' : '?'}
          </dd>
          <dt className = "rating-type">Health</dt>
        </li>
        <li className = "rating-item">
          <dd className = "rating-number">
            {(this.props.material.recyclingRating !== undefined)? this.props.material.recyclingRating + ' / 4' : '?'}
          </dd>
          <dt className = "rating-type">Recyclability</dt>
        </li>
        <li className = "rating-item">
          <dd className = "rating-number">
            {(this.props.material.countryRating !== undefined)? this.props.material.countryRating + ' / 100' : '?'}
          </dd>
          <dt className = "rating-type">Country Rating</dt>
        </li>

        {this.popup()}
      </ul>
    );
  }
});

module.exports = Rating;
