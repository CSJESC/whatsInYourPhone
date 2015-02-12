"use strict";

var React = require('react');
var apiActions      = require('../../actions/apiActions')
var uploaderActions = require('../../actions/uploaderActions')

var EditMaterial = React.createClass({

  componentDidEnter: function() {
    setTimeout(function() {this.getDOMNode().setAttribute("class", "add-menu visible")}.bind(this), 20)
  },

  componentWillLeave: function(callback) {
    this.getDOMNode().setAttribute("class", "add-menu")
    setTimeout(callback, 200)
  },

  getDefaultProps: function() {
    return {
      country: {
        isNew: true
      }
    }
  },

  saveValues: function (evt) {
    evt.preventDefault()
    if (this.props.country.isNew) {
      apiActions.createCountry(this.props.country)
    } else {
      apiActions.updateCountry(this.props.country)
    }
  },

  updateTextfield: function (field, evt) {
    var value = evt.target.value

    if (value == '') value = null
    this.props.country[field] = value
    uploaderActions.triggerState()
  },

  render: function () {
    var country = this.props.country
    return (
      <div className="add-menu" id="resources">
        <a 
          className = "close-add-menus pop-up-navigation" 
          onClick   = {uploaderActions.closePopup}>
          X
        </a>
        <h2>{country.isNew? 'New' : 'Edit'} Country</h2>
        <p>Please fill out all pieces of data which are necessary to add a new country to the collection.</p>
        <form id="new_resource">
            <div className="group">
                <input 
                  id           = "res_name" 
                  name         = "res_name" 
                  type         = "text" 
                  required     = "" 
                  defaultValue = {country? country.name : ''}
                  onChange     = {this.updateTextfield.bind(null,'name')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Name</label>
            </div>
            <div className="group">
                <input 
                  type     = "text" 
                  required = "" 
                  defaultValue = {country? country.humanRightsRating : ''}
                  onChange = {this.updateTextfield.bind(null,'humanRightsRating')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>humanRightsRating (0 - 100)</label>
            </div>
            <div className="group">
                <input 
                  id           = "res_nfpa_health" 
                  name         = "res_nfpa_health" 
                  type         = "text" 
                  required     = "" 
                  defaultValue = {country? country.mineralIndustryRating : ''}
                  onChange     = {this.updateTextfield.bind(null,'mineralIndustryRating')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>mineral Industry Rating (0- 70)</label>
            </div>
            <div className="group">
                <input 
                  id           = "res_youtube" 
                  name         = "res_youtube" 
                  type         = "text" 
                  required     = "" 
                  defaultValue = {country? country.workingConditionsRating : ''}
                  onChange     = {this.updateTextfield.bind(null,'workingConditionsRating')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>working Conditions Rating (0 - 4)</label>
            </div>
            <div className="submit-wrapper">
                <button
                  onClick = {this.saveValues}
                >
                  Submit
                </button>
            </div>
        </form>
      </div>
    );

  }
});

module.exports = EditMaterial;
