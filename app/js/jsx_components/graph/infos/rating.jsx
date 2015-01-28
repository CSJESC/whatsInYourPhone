"use strict";

var React = require('react');
var guiActions = require('../../../actions/guiActions');


var Rating = React.createClass({

  closePopup: function (e) {
    e.stopPropagation()
    guiActions.closeRatingPopup()
  },

  popup: function () {
    return (
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
  },

  render: function () {
    return (
      <ul 
        className = "rating"
        onClick   = {guiActions.openRatingPopup}
      >
        <li className = "rating-item">
          <dd className = "rating-number">
            {this.props.material.healthRating}
          </dd>
          <dt className = "rating-type">Health</dt>
        </li>
        <li className = "rating-item">
          <dd className = "rating-number">
            {this.props.material.recyclingRating}
          </dd>
          <dt className = "rating-type">Recicability</dt>
        </li>
        <li className = "rating-item">
          
          <dd className = "rating-number">
            {this.props.material.countryRating}
          </dd>
          <dt className = "rating-type">Country Rating</dt>
        </li>

        {this.props.popupOpen? this.popup() : null}
      </ul>
    );
  }
});

module.exports = Rating;