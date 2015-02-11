"use strict";

var React = require('react');
var apiActions      = require('../../actions/apiActions')
var uploaderActions = require('../../actions/uploaderActions')




var EditMaterial = React.createClass({
  getDefaultProps: function() {
    return {
      material: {
        isNew: true
      }
    }
  },

  saveValues: function (evt) {
    evt.preventDefault()
    if (this.props.material.isNew) {
      console.log('post', this.props.material)
      apiActions.createMaterial(this.props.material)
    } else {
      apiActions.updateMaterial(this.props.material)
      console.log('put', this.props.material)
    }
  },

  updateTextfield: function (field, evt) {
    var value = evt.target.value
    if (['usedIn','links'].indexOf(field) >= 0) {
      value = value.split(',')
    }
    if (value == '') value = null
    this.props.material[field] = value
    uploaderActions.updateMaterial()
  },

  buildStringFromArray: function(arr) {
    var str = ''
    arr.forEach(function(item , i) {
      if (i > 0)
        str += ', '
      str += item.name
    })
    return str
  },

  render: function () {
    var material = this.props.material
    return (
      <div className="add-menu" id="resources">
        <a 
          className = "close-add-menus pop-up-navigation" 
          onClick   = {uploaderActions.closeEditWindow}>
          X
        </a>
        <h2>New Resource</h2>
        <p>Please fill out all pieces of data which are necessary to add a new resource to the resource collection.</p>
        <form id="new_resource">
            <div className="group">
                <input 
                  id       = "res_name" 
                  name     = "res_name" 
                  type     = "text" 
                  required = "" 
                  value    = {material? material.name : ''}
                  onChange = {this.updateTextfield.bind(null,'name')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Name</label>
            </div>
            <div className="group">
                <input 
                  id       = "res_recyclability" 
                  name     = "res_recyclability" 
                  type     = "text" 
                  required = "" 
                  value    = {material? material.recyclingRating : ''}
                  onChange = {this.updateTextfield.bind(null,'recyclingRating')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Recyclability (%)</label>
            </div>
            <div className="group">
                <input 
                  id       = "res_nfpa_health" 
                  name     = "res_nfpa_health" 
                  type     = "text" 
                  required = "" 
                  value    = {material? material.healthRating : ''}
                  onChange = {this.updateTextfield.bind(null,'healthRating')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>NFPA Health Rating</label>
            </div>
            <div className="group">
                <input 
                  id       = "res_youtube" 
                  name     = "res_youtube" 
                  type     = "text" 
                  required = "" 
                  value    = {material? material.youtube : ''}
                  onChange = {this.updateTextfield.bind(null,'youtube')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>YouTube Link</label>
            </div>
            <div className="group">
                <input 
                  id       = "res_wikipedia_en" 
                  name     = "res_wikipedia_en" 
                  type     = "text" 
                  required = "" 
                  value    = {(material && material.links)? material.links.join(',') : ''}
                  onChange = {this.updateTextfield.bind(null,'links')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Links (comma-separated)</label>
            </div>
            <div className="group">
                <textarea 
                  id       = "res_description" 
                  name     = "res_description" 
                  cols     = "40" 
                  rows     = "5" 
                  required = ""
                  value    = {material? material.description : ''}
                  onChange = {this.updateTextfield.bind(null,'description')}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="desc_label">Description</label>
            </div>
            <div className="multiselect-wrapper">
                <select multiple id="countries-multiselect" name="countries">
                </select>
            </div>
            <div className="slider-wrapper">
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
