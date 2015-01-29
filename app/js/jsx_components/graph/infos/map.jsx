"use strict";

var React = require('react');
var d3 = require('d3');
var topojson = require('topojson');

var world = require('json!../../../api/world-110m.json');
var names = require('dsv!../../../api/world-country-names.csv');

var WorldMap = React.createClass({
  componentDidMount: function() {
      var canvas = this.refs.mapCanvas.getDOMNode();
      this.canvas = canvas.getContext("2d");

      this.renderMap();
  },

  drawMap: function() {
    this.canvas.clearRect(0, 0, this.props.width, this.props.height);
    this.canvas.fillStyle = "#bbb", this.canvas.beginPath(), this.path(this.land), this.canvas.fill();
    this.canvas.fillStyle = "#ED1C24", this.canvas.beginPath(), this.path(this.countries[this.selectedCountry]), this.canvas.fill();
    this.canvas.strokeStyle = "#fff", this.canvas.lineWidth = .5, this.canvas.beginPath(), this.path(this.borders), this.canvas.stroke();
    this.canvas.strokeStyle = "#000", this.canvas.lineWidth = 2, this.canvas.beginPath(), this.path(this.globe), this.canvas.stroke();
  },
  rotate: function() {

    var country = names.filter(function(c) {
      return this.props.country === c.name;
    }.bind(this));

    this.selectedCountry = country[0].id;

    d3.transition()
      .duration(1250)
      .each("start", function() {
        // this.title.text(countries[i = (i + 1) % n].name);
      })
      .tween("rotate", function() {
        var p = d3.geo.centroid(this.countries[this.selectedCountry]),
            r = d3.interpolate(this.projection.rotate(), [-p[0], -p[1]]);
        return function(t) {
          this.projection.rotate(r(t));
          this.drawMap();
        }.bind(this);
      }.bind(this));
  },
  renderMap: function() {
    this.projection = d3.geo.orthographic()
      .scale(200)
      .translate([this.props.width / 2, this.props.height / 2])
      .clipAngle(90);

    this.path = d3.geo.path()
      .projection(this.projection)
      .context(this.canvas);

    this.borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });
    this.countries = topojson.feature(world, world.objects.countries).features;
    this.globe = {type: "Sphere"};
    this.land = topojson.feature(world, world.objects.land);

    this.rotate();
  },
  render: function () {
    this.rotate();

    return(
      <canvas className="globe" ref="mapCanvas" width={this.props.width} height={this.props.height}></canvas>
    );
  }
});

module.exports = WorldMap;
