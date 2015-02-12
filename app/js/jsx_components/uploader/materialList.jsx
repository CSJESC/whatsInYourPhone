"use strict";

var React = require('react');
var uploaderActions = require('../../actions/uploaderActions')



var MaterialList = React.createClass({
  listMaterials: function(materials) {
    var even = true;
    var evenString;
    var materialCollection = []
    materials.forEach(function (material, n) {
        if (even) {
            evenString = 'even';
        } else {
            evenString = 'uneven';
        }
        even = !even;
        materialCollection.push(
          <div key = {material.id} className = {'resource-item ' + evenString}>
            <div className = "headline-left">
            <h3>{material.name}</h3>
            </div>
            <div className="edit">
                <a 
                  id      = {material.id} 
                  onClick = {uploaderActions.editMaterial.bind(null, material)}>
                  Edit >>
                </a>
            </div>
          </div>
        );
    });

    return materialCollection
  },

  render: function () {
    return (
      <div id="resource-list">
        {this.listMaterials(this.props.materials)}
      </div>
    );

  }
});

module.exports = MaterialList;
