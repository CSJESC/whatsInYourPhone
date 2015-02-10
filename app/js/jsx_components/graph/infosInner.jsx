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
        <h2 className = {'title ' + this.props.material.color}>
          {this.props.material.name}
        </h2>
          <RatingInfo
            material  = {this.props.material}
            popupOpen = {this.props.ratingPopup}
          />
          <Description
            description = {this.props.material.description}
            links       = {this.props.material.links}
            youtube     = {this.props.material.youtube}
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
          <WorldMap country = {this.props.selectedCountry} width ="400" height = "400"/>
        </div>
      </div>
    )
  }
});

module.exports = Infos;
