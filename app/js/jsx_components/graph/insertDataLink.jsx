"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');


var InsertDataLink = React.createClass({
  popup: function () {
    if (this.props.logInPopupOpen) {
      return (
        <div className = "popup">
         <h3 className = "title">Please log In to insert Data</h3>
         <a 
          className = "close"
          onClick   = {this.closePopup}>
          &#10005;
        </a>
        <a href = "http://materia.localhorst.io/auth/twitter" target = "_blank">
          twitter hardcoded
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
