"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');

var StopLight = React.createClass({

  closePopup: function (e) {
    e.stopPropagation();
    guiActions.stopLightCloseClicked();
  },

  popup: function () {
    if (this.props.popupIsOpen) {
      return (
        <div className = "popup">
          <a 
            className = "close"
            onClick   = {this.closePopup}
          >
            &#10005;
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
    } else {
      return null
    }
  },

  render: function () {
    var lights = []
    for (var color in this.props.colors) {
      var showColor = (color == this.props.color) ? color : ''
      lights.push(
        <span
          key       = {color}
          className = {showColor + ' light'}
        />
      )
    }

    return (
      <div 
        className = {"stop-Light " + (this.props.unshure? 'unshure' : '')}
        onClick   = {guiActions.stopLightClicked}
      >
        {lights}
        {this.popup()}
      </div>
    );
  }
});

module.exports = StopLight;