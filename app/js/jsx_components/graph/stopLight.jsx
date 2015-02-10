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
          <h3 className = "title">Weighting</h3>
          <ul className = "stop-light-chart">
            <li className = "color red">        > {this.props.colors.red}%       </li>
            <li className = "color orange">     > {this.props.colors.orange}%    </li>
            <li className = "color yellow">     > {this.props.colors.yellow}%   </li>
            <li className = "color lightGreen"> > {this.props.colors.lightGreen}%</li>
            <li className = "color green">      > {this.props.colors.green}%     </li>
          </ul>
        </div>
      ) 
    } else {
      return null
    }
  },

  render: function () {
    var lights = []
    for (var color in this.props.colors) {
      var showColor = (color == this.props.color) ? 'on ' + color : ''
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