"use strict";

var React      = require('react');

var UsedInList  = require('./infos/usedIn.jsx');
var Description = require('./infos/description.jsx');
var RatingInfo  = require('./infos/rating.jsx');

var Infos = React.createClass({
  render: function () {
    return (
      <div 
        className = "infos-inner">
        <div className = "left-col">
          <RatingInfo 
            material  = {this.props.material} 
            popupOpen = {this.props.ratingPopup}
          />
          <Description
            description = {this.props.material.description}
            links       = {this.props.material.links}
          />
          <UsedInList usedIn = {this.props.material.usedIn} />
        </div>
      </div>
    )
  }
});

module.exports = Infos;
