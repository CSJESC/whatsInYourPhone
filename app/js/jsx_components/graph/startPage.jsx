"use strict";

var React      = require('react');

var StartPage = React.createClass({
  render: function () {
    return (
      <div className = "infos-inner start-page">
        <h2 className ="title">StartPage</h2>
        <p>
          Due to missing data and information about the electronics supply
          chain, it is, in fact, extremely difficult to produce an adequate
          analysis of the conditions under which people participate in various
          stages of the processes.
        </p>
        <p>
          The internet, however, may be able to play an important  role in
          helping gather information which could be used to improve general
          public understanding about some of the more troubling social and
          economic justice issues at hand.  If you want to help fill out our
          material models please (click on the right/contact us).
        </p>
      </div>
    )
  }
});

module.exports = StartPage;
