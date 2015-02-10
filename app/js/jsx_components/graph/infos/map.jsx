"use strict";

var React = require('react');
var d3 = require('d3');
var topojson = require('topojson');

var world = require('json!../../../api/world-110m.json');
var borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });
var land = topojson.feature(world, world.objects.countries);
var countries = topojson.feature(world, world.objects.countries).features;

var WorldMap = React.createClass({
  projection: {},
  borders: {},
  land: {},
  countries: [],

  componentDidMount: function() {
    this.borders   = borders
    this.land      = land
    this.countries = countries
    this.projection = d3.geo.orthographic().scale(200).translate([this.props.width / 2, this.props.height / 2]).clipAngle(90)

    this.renderMap({canvas: this.getMap()});
  },
  shouldComponentUpdate: function (nextProps) {
    return  nextProps.country !== this.props.country
  },
  getCountry() {
    var country = this.countries.filter(function(country) {
      return country.properties.name === this.props.country;
    }.bind(this));
    if (typeof country[0] !== 'undefined') var selectedCountry = country[0];

    return selectedCountry;
  },
  getMap: function() {
      var canvas = this.refs.mapCanvas.getDOMNode();
      canvas = canvas.getContext("2d");

      return canvas;
  },
  drawPolygon: function(params) {
    params.canvas.fillStyle = params.fill;
    params.canvas.beginPath();
    params.path(params.area);
    params.canvas.fill();

    params.canvas.strokeStyle = params.strokeFill;
    params.canvas.lineWidth = params.lineWidth;
    params.canvas.beginPath();
    params.path(params.borderPath);
    params.canvas.stroke();
  },
  drawMap: function(params) {
    params.canvas.clearRect(0, 0, this.props.width, this.props.height);

    this.drawPolygon({ fill: '#bbb', area: this.land, strokeFill: '#fff', lineWidth : .5, borderPath : this.borders, canvas: params.canvas, path: params.path});
    this.drawPolygon({ fill: '#f26522', area: params.selectedCountry, strokeFill: '#000', lineWidth: 2, borderPath: {type: "Sphere"}, canvas: params.canvas, path: params.path});
  },
  rotate: function(params) {
    var selectedCountry = this.getCountry();

    d3.transition()
      .duration(1250)
      .tween("rotate", function() {
        var p = [0,0]
        if (selectedCountry)
          p = d3.geo.centroid(selectedCountry)

        var r = d3.interpolate(this.projection.rotate(), [-p[0], -p[1]]);
        return function(t) {
          this.projection.rotate(r(t));
          if (!params.path) params.path = this.getPath({canvas: params.canvas});
          this.drawMap({path: params.path, canvas: params.canvas, selectedCountry: selectedCountry});
        }.bind(this);
      }.bind(this));
  },
  getPath(params) {
    return d3.geo.path()
      .projection(this.projection)
      .context(params.canvas);
  },
  renderMap: function(params) {

    var path = this.getPath({canvas: params.canvas});

    this.rotate({path: path, canvas: params.canvas});
  },
  render: function () {
    if (this.refs.mapCanvas) this.renderMap({canvas: this.getMap()});
    return(
      <canvas className="globe" ref="mapCanvas" width={this.props.width} height={this.props.height}></canvas>
    );
  }
});

module.exports = WorldMap;
