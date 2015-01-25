"use strict";

var React = require('react');
var guiActions = require('../../../actions/guiActions');


var Rating = React.createClass({

  closePopup: function (e) {
    e.stopPropagation()
    guiActions.closeRatingPopup()
  },

  render: function () {
    var popup = (
      <div className = "popup">
        <a 
          className = "close"
          onClick   = {this.closePopup}
        >
          x
        </a>
        <p>health: 20%</p>
        <p>Recicability: 20%</p>
        <p>Country Rating: 60% <br/>
        -> working Conditions: 50% <br/>
        -> human Rights: 30% <br/>
        -> mineral Industry Rating: 20% <br/>
        </p>
      </div>
    )

    return (
      <ul 
        className = "rating"
        onClick   = {guiActions.openRatingPopup}
      >
        <li className = "rating-item">
          <dt>Health</dt>
          <dd
            className = {this.props.getColor(this.props.material.healthRating * 25)}
          >
            {this.props.material.healthRating} / 4
          </dd>
        </li>
        <li className = "rating-item">
          <dt>Recicability</dt>
          <dd
            className = {this.props.getColor(this.props.material.recyclingRating * 25)}
          >
            {this.props.material.recyclingRating} / 4
          </dd>
        </li>
        <li className = "rating-item">
          <dt>Country Rating</dt>
          <dd
            className = {this.props.getColor(this.props.material.countryRating)}
          >
            {this.props.material.countryRating} / 100
          </dd>
        </li>

        {this.props.popupOpen? popup : null}
      </ul>
    );
  }
});

module.exports = Rating;