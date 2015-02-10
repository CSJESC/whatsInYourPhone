"use strict";

var React      = require('react');

var StartPage = React.createClass({
  render: function () {
    return (
      <div className = "infos-inner start-page">
        <h2 className ="title">StartPage</h2>
        <p>
          Due to missing data and information about the electronics supply chain, it is, in fact, objectively 
          impossible to analyse these problems in depth and investigate their relative consequences.
        </p>
        <p>
          The internet, however, could play an essential role in gathering information to increase public awareness 
          about the topic and, ultimately, improve corporate responsibility of manufacturers.
        </p>
      </div>
    )
  }
});

module.exports = StartPage;
