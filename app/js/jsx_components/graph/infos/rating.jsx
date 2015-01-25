"use strict";

var React = require('react');

var Rating = React.createClass({

  render: function () {

    return (
      <ul className = "rating">
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
      </ul>
    );
  }
});

module.exports = Rating;