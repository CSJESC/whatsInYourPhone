"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');


var List        = require('./infos/list.jsx');
var Description = require('./infos/description.jsx');
var RatingInfo  = require('./infos/rating.jsx');
var WorldMap     = require('./infos/worldMap.jsx');

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
          <List 
            title = "Used In:"
            items = {this.props.material.usedIn} />
        </div>
        <div className = "right-col">
          <List
            title      = "Mined In:"
            items      = {this.props.material.minedIn} 
            itemAction = {guiActions.selectCountry}
            selected   = {this.props.selectedCountry}
            />
          <WorldMap country = {this.props.selectedCountry} />
        </div>
      </div>
    )
  }
});

module.exports = Infos;
