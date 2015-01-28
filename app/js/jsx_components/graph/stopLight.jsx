"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');

var StopLight = React.createClass({

  closePopup: function (e) {
    e.stopPropagation();
    guiActions.stopLightCloseClicked();
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
        <h3 className = "color-legend-title">Points you need for a color</h3>
        <p>
          red:         {this.props.colors.red}        / 100 <br/>
          orange:      {this.props.colors.orange}     / 100 <br/>
          yellow:      {this.props.colors.yellow}     / 100 <br/>
          light-green: {this.props.colors.lightGreen} / 100 <br/>
          green:       {this.props.colors.green}      / 100 <br/>
        </p>
      </div>
    )
  },

  render: function () {
    var lights = []
    for (var color in this.props.colors) {
      var showColor = (color == this.props.color) ? color : ''
      lights.push(
        <span
          className = {showColor + ' light'}
        />
      )
    }

    return (
      <div 
        className = "stop-Light"
        onClick   = {guiActions.stopLightClicked}
      >
        {lights}
        {this.props.popupIsOpen? this.popup() : null}
      </div>
    );
  }
});

module.exports = StopLight;