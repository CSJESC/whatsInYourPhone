"use strict";

var React = require('react');

var Description = React.createClass({
  listLinks: function (links) {
    if (!links)
      return false
    
    var linkList = links.map(function(link, i) {
      return (
        <li 
          key       = {i}
          className = "link-list-item">
          <a href = {link} target = "_blank">
            {(i === 0) ? 'read more' : ', and more'}
          </a>
        </li>
      )
    })
    return (
      <ul className = "link-list">
        {linkList}
        <li className = "link-list-item youtube">
          <a href = {this.props.youtube} target = "_blank">
            Periodic Table of Videos
          </a>
        </li>
      </ul>
    )
  },

  render: function () {
    return (
      <div className = "description">
        <p className = "text">
          {this.props.description}
        </p>
       
        {this.listLinks(this.props.links)}
      </div>
    );
  }
});

module.exports = Description;