"use strict";

var React = require('react/addons');

var Page = React.createClass({

  render: function () {
    var color, unshure
    if (this.props.material) {
      color   = this.props.material.color
      unshure = this.props.material.unshureFlag
    }

    var cx = React.addons.classSet;
    var classes = cx({
      'cart':         true,
      'unshure':      unshure,
      'unkown':       !this.props.material,
      'dont-animate': !this.props.animate
    })

    return (
      <div 
        className = {classes + ' ' + color}>
        <svg version="1.1" id="Vrstva_1" x="0px" y="0px"
           width="171px" height="145px" viewBox="0 0 170.5 144.729" enable-background="new 0 0 170.5 144.729">
        <path className="cart-plane" d="M1.58,40.068l16.667-5.333l6-4.667c0,0,4-1.334,6,1.333s4-1.333,4-1.333s-2-1.333,1.333-5.333s6,0,6,0
          s4-9.333,8-9.333s4.667-6.667,8.667-6s-1.333-3.333,10-4.667c0,0,0.667-8,10.667-1.333c0,0,6-6.666,10-1.333
          c0,0,3.333-5.333,10.667,2c0,0,6-2,13.333,4.667c0,0,10-3.333,12.667,8.667c0,0,1.334-5.333,6.667,2.667c0,0,8.667-2.667,8,8
          c0,0-1.333,0,6,5.333s20,6.667,20,6.667H1.58z"/>
        <g id="XMLID_1_">
          <g>
            <path className="cart-plane" d="M170.25,44.738l-30,66h-2.82c-3.18-10.82-13.06-18.72-24.76-18.72c-11.7,0-21.57,7.9-24.75,18.72h-9.08
              c-3.18-10.82-13.06-18.72-24.76-18.72s-21.57,7.9-24.75,18.72h-2.42l-26.66-66H170.25z"/>
          </g>
          <g>
          </g>
        </g>
        <polygon fill="#F2EBDE" points="153.08,81.402 15.331,81.402 5.58,56.069 164.663,56.069 "/>
        <g id="XMLID_2_">
          <g>
            <path className="cart-plane" d="M54.08,96.588c12.52,0,22.66,10.3,22.66,23.01c0,12.71-10.14,23.01-22.66,23.01s-22.67-10.3-22.67-23.01
              C31.41,106.888,41.56,96.588,54.08,96.588z M70.51,119.598c0-8.85-7.36-16.02-16.43-16.02c-9.08,0-16.44,7.17-16.44,16.02
              c0,8.85,7.36,16.02,16.44,16.02C63.15,135.618,70.51,128.448,70.51,119.598z"/>
          </g>
          <g>
          </g>
        </g>
        <rect x="51.078" y="102.264" transform="matrix(0.601 -0.7992 0.7992 0.601 -74.0111 90.9405)" className="cart-plane" width="6" height="34.666"/>
        <rect x="50.911" y="102.264" transform="matrix(0.8057 0.5923 -0.5923 0.8057 81.3479 -8.7938)" className="cart-plane" width="6.334" height="34.667"/>
        <g id="XMLID_3_">
          <g>
            <path className="cart-plane" d="M112.74,96.588c12.52,0,22.67,10.3,22.67,23.01c0,12.71-10.15,23.01-22.67,23.01
              c-12.51,0-22.66-10.3-22.66-23.01C90.08,106.888,100.23,96.588,112.74,96.588z M129.18,119.598c0-8.85-7.36-16.02-16.44-16.02
              c-9.07,0-16.43,7.17-16.43,16.02c0,8.85,7.36,16.02,16.43,16.02C121.82,135.618,129.18,128.448,129.18,119.598z"/>
          </g>
          <g>
          </g>
        </g>
        <rect x="109.744" y="102.264" transform="matrix(0.601 -0.7992 0.7992 0.601 -50.6033 137.8296)" className="cart-plane" width="6" height="34.666"/>
        <rect x="109.577" y="102.264" transform="matrix(0.8057 0.5923 -0.5923 0.8057 92.7469 -43.5435)" className="cart-plane" width="6.334" height="34.667"/>
        </svg>

        <p className = "cart-name">
          {this.props.material? this.props.material.name : '?'}
        </p>
      </div>
    );
  }
});

module.exports = Page;