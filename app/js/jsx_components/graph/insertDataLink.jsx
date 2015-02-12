"use strict";

var React      = require('react');
var guiActions = require('../../actions/guiActions');


var InsertDataLink = React.createClass({
  popup: function () {
    if (this.props.logInPopupOpen) {
      return (
        <div className = "popup">
         <h3 className = "title">Most of the data is still Missing! Help us fill it in</h3>
         <a 
          className = "close"
          onClick   = {this.closePopup}>
          &#10005;
        </a>
        <a className = "log-in-link" href = "/auth/twitter" target = "_blank">
          <span className = "log-in-icon icono-twitter"/>
          log in with twitter
        </a>
        <a className = "log-in-link" href = "/auth/github" target = "_blank">
          <svg className="log-in-icon github" width="100" viewBox="0 0 2856.857 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M552.73 332.135H311.557c-6.205 0-11.25 5.045-11.25 11.297v117.887c0 6.252 5.045 11.272 11.25 11.272h94.109v146.542c0 0-21.145 7.057-79.496 7.057-68.914 0-165.156-25.244-165.156-236.795 0-211.642 100.197-239.491 194.307-239.491 81.465 0 116.514 14.304 138.869 21.241 7.01 2.203 13.404-4.831 13.404-11.105L534.543 46.129999999999995c0-2.912-1.041-6.417-4.262-8.785C521.186 30.951999999999998 465.865 0 326.168 0 165.133 0 0 68.48699999999997 0 397.757 0 726.979 189.051 776 348.381 776c131.883 0 212.021-56.314 212.021-56.314 3.268-1.801 3.6-6.395 3.6-8.479V343.432C563.955 337.227 558.887 332.135 552.73 332.135zM1772.381 28.134000000000015h-135.695c-6.252 0-11.271 5.044-11.271 11.296v262.393h-211.619V39.42999999999995c0-6.252-5.068-11.296-11.178-11.296h-135.838c-6.111 0-11.084 5.044-11.084 11.296v710.473c0 6.299 5.021 11.32 11.084 11.32h135.838c6.203 0 11.178-5.068 11.178-11.32V446.067h211.619l-0.475 303.883c0 6.3 5.021 11.272 11.084 11.272h135.885c6.252 0 11.131-5.068 11.131-11.272l0.473-710.521C1783.607 33.178 1778.539 28.134000000000015 1772.381 28.134000000000015zM714.949 44.236999999999966c-48.357 0-87.574 39.572-87.574 88.403 0 48.855 39.217 88.428 87.574 88.428s87.527-39.572 87.527-88.428C802.477 83.80999999999995 763.307 44.236999999999966 714.949 44.236999999999966zM792.861 272.126c0-6.205-5.02-11.344-11.131-11.344H646.32c-6.348 0-11.746 6.394-11.746 12.67 0 0 0 394.654 0 469.867 0 13.735 8.572 17.903 19.703 17.903 0 0 57.688 0 121.959 0 13.311 0 16.814-6.536 16.814-18.188-0.094-25.197-0.094-123.808-0.094-142.942C792.861 581.905 792.861 272.126 792.861 272.126zM2297.973 261.84799999999996h-134.701c-6.158 0-11.084 5.092-11.084 11.344v348.31c0 0-34.244 25.197-82.934 25.197-48.547 0-61.525-22.024-61.525-69.719 0-47.553 0-303.835 0-303.835 0-6.252-5.068-11.345-11.131-11.345h-136.643c-6.252 0-11.178 5.093-11.178 11.345 0 0 0 185.521 0 326.807 0 141.284 78.766 175.906 186.99 175.906 88.854 0 160.609-49.115 160.609-49.115s3.363 25.766 5.068 28.844c1.422 3.078 5.447 6.158 9.852 6.158h86.58c6.158 0 11.178-5.069 11.178-11.321l0.379-477.278C2309.15 266.9390000000001 2304.129 261.84799999999996 2297.973 261.84799999999996zM2666.932 245.83899999999994c-76.539 0-128.592 34.148-128.592 34.148V39.42999999999995c0-6.252-5.068-11.296-11.131-11.296h-136.264c-6.109 0-11.131 5.044-11.131 11.296l-0.379 710.521c0 6.3 5.068 11.272 11.225 11.272 0 0 94.773 0 94.869 0 4.215 0 7.389-2.179 9.805-5.968 2.369-3.837 5.73-32.775 5.73-32.775s55.557 52.763 161.035 52.763c123.807 0 194.758-62.804 194.758-281.906C2856.859 274.51800000000003 2743.471 245.83899999999994 2666.932 245.83899999999994zM2613.791 646.225c-46.701-1.421-78.34-22.64-78.34-22.64v-225.07c0 0 31.307-19.206 69.672-22.593 48.547-4.31 95.438 10.326 95.438 126.13C2700.322 624.059 2679.199 648.166 2613.791 646.225zM1185.125 643.667c-5.969 0-21.219 2.368-36.85 2.368-49.92 0-66.971-23.256-66.971-53.331 0-30.218 0-199.85 0-199.85h101.926c6.252 0 11.178-5.044 11.178-11.343v-109.48c0.094-6.299-4.926-11.344-11.178-11.344h-101.926l-0.143-134.535c0-5.092-2.699-7.625-8.572-7.625H933.861c-5.352 0-8.336 2.391-8.336 7.578v139.035c0 0-69.576 16.79-74.266 18.188-4.641 1.326-8.051 5.684-8.051 10.822v87.408c0 6.252 5.068 11.344 11.178 11.344h71.139c0 0 0 91.34 0 210.222 0 156.109 109.553 171.455 183.439 171.455 33.723 0 74.076-10.988 80.848-13.356 4.074-1.421 6.395-5.637 6.395-10.136l0.047-96.101C1196.254 648.688 1190.998 643.572 1185.125 643.667z" />
          </svg>
          log in with github
        </a>
        </div>
      )
    } else {
      return false
    }
  },

  closePopup: function (e) {
    e.stopPropagation();
    guiActions.logInCloseClicked();
  },

  render: function () {
    return (
      <div 
        className = "inser-data-wrapper">
        <h3 className = "title">Help us collect data</h3>
        <p className = "text">
          The data we have is not complete.
          You can fill in data about any device
          or material you have information about
        </p>
        <a 
          className = "log-in"
          onClick   = {guiActions.logInClicked}
        >
          <img src = "./img/addData.png" />
        </a>
        {this.popup()}
      </div>
    )
  }
});

module.exports = InsertDataLink;
