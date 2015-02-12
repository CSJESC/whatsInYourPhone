"use strict";

var React = require('react/addons');

var uploaderStore   = require('../stores/uploaderStore')
var apiActions      = require('../actions/apiActions')
var uploaderActions = require('../actions/uploaderActions')

var TransitionGroup = React.addons.TransitionGroup

var MaterialList = require('./uploader/materialList.jsx')
var EditMaterial = require('./uploader/editMaterial.jsx')
var Navigation   = require('./general/navigation.jsx')

var Uploader = React.createClass({
  getInitialState: function () {
    return null
  },

  componentDidMount: function() {
    this.unsubscribeStore = uploaderStore.listen(function(storeState){
      this.setState(storeState)
    }.bind(this))
    apiActions.loadDeviceMaterials()
    apiActions.loadCountries()
  },

  componentWillUnmount: function() {
    this.unsubscribeStore()
  },

  getPopup: function() {
    if (this.state.editWindowOpen && this.state.currentMaterial)
      return (
        <EditMaterial 
          material  = {this.state.currentMaterial} 
          countries = {this.state.countries}
        />
      )
    if (this.state.editWindowOpen)
      return <EditMaterial countries = {this.state.countries} />
  },

  render: function () {
    if (!this.state) {
      return <p>hhh</p>;
    }

    return (
      <div className = "uploader">
        <div id="wrapper">
          <TransitionGroup >
            {this.getPopup()}
          </TransitionGroup>
          <div id="content">
            <h1>Resource Management</h1>
            <p>This panel allows you to add, review and edit data related to resources and countries.</p>
            <div id="navigation">
                <a 
                  id="country-btn" 
                  className="button"
                >
                    <span>Edit Countries</span>
                </a>
                {/* bind null so we dont get click event as material */}
                <a 
                  id        = "resource-btn" 
                  className = "button"
                  onClick   = {uploaderActions.editMaterial.bind(null, null)}>
                    <span>Add Resource</span>
                </a>
            </div>
            <MaterialList materials = {this.state.allMaterials} />
          </div>
        </div>
        <Navigation />
      </div>
    );

  }
});

module.exports = Uploader;