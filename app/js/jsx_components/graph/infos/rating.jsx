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
          <p>health: 20%</p>
          <p>Recicability: 20%</p>
          <p>Country Rating: 60% <br/>
          -> working Conditions: 50% <br/>
          -> human Rights: 30% <br/>
          -> mineral Industry Rating: 20% <br/>
          </p>
        </div>
      )
    } else {
      return null
    }
  },

  render: function () {
    return (
      <ul 
        className = "rating"
        onClick   = {guiActions.openRatingPopup}
      >
        <li className = "rating-item">
          <dd className = "rating-number">
            {(this.props.material.healthRating !== undefined)? this.props.material.healthRating : '?'}
          </dd>
          <dt className = "rating-type">Health</dt>
        </li>
        <li className = "rating-item">
          <dd className = "rating-number">
            {(this.props.material.recyclingRating !== undefined)? this.props.material.recyclingRating : '?'}
          </dd>
          <dt className = "rating-type">Recyclability</dt>
        </li>
        <li className = "rating-item">
          <dd className = "rating-number">
            {(this.props.material.countryRating !== undefined)? this.props.material.countryRating : '?'}
          </dd>
          <dt className = "rating-type">Country Rating</dt>
        </li>

        {this.popup()}
      </ul>
    );
  }
});

module.exports = Rating;
