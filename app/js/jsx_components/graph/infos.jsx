"use strict";

var React      = require('react');
var apiActions = require('../../actions/apiActions');
var guiActions = require('../../actions/guiActions');

var InfosInner     = require('./infosInner.jsx');
var InsertDataLink = require('./insertDataLink.jsx');
var StartPage      = require('./startPage.jsx');

var Infos = React.createClass({

  innerInfos: function () {
    var showInner = !this.props.fromStore.deviceSelectedMaterial
    if (this.props.material && showInner) {
      return (
        <InfosInner
          material        = {this.props.material}
          ratingPopup     = {this.props.fromStore.ratingPopupOpen}
          selectedCountry = {this.props.fromStore.selectedCountry}
        />
      )
    } else {
      return (<StartPage />)
    }
  },

  render: function () {
    return (
      <div className = "infos">
        {this.innerInfos()}
        <InsertDataLink 
          logedIn        = {this.props.fromStore.logedIn}
          logInPopupOpen = {this.props.fromStore.logInPopupOpen} 
        />
      </div>
    )
  }
});

module.exports = Infos;
