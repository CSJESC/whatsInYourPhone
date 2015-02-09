"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');


var InsertDataLink = React.createClass({
  popup: function () {
    if (this.props.logInPopupOpen) {
      return (
        <div className = "popup">
         <h3 className = "title">Most of the data is still Missing! Help us fill it in</h3>
         <a 
          className = "close"
          onClick   = {this.closePopup}>
          &#10005;
        </a>
        <a className = "log-in-link" href = "http://materia.localhorst.io/auth/twitter" target = "_blank">
        <img className = "log-in-logo" src = "./img/Twitter_logo_white.png" alt="twitter" />
          log in with twitter
        </a>
        <a className = "log-in-link" href = "http://materia.localhorst.io/auth/github" target = "_blank">
        <img className = "log-in-logo" src = "http://placehold.it/400x400" alt="github" />
          log in with github
        </a>
        </div>
      )
    } else {
      return false
    }
  },

  closePopup: function (e) {
    e.stopPropagation();
    guiActions.logInCloseClicked();
  },

  render: function () {
    return (
      <div 
        className = "inser-data-wrapper">
        <h3 className = "title">Help us collect data</h3>
        <p className = "text">
          The data we have is not complete.
          You fill in data about any device
          you have information about
        </p>
        <a 
          className = "log-in"
          onClick   = {guiActions.logInClicked}
        >
          <img src = "./img/addData.png" />
        </a>
        {this.popup()}
      </div>
    )
  }
});

module.exports = InsertDataLink;
