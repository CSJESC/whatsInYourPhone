var Reflux    = require('reflux');
var apiActions = require('../actions/apiActions');
var guiActions = require('../actions/guiActions');

var Store = Reflux.createStore({
  init: function() {
    this.state = {
      cartOffset:      -1,
      deviceMaterials: [],
      allMaterials:    [],

      deviceSelectedMaterial: false,
      selectedCountry:        null,

      stopLightPopupOpen: false,
      ratingPopupOpen:    false,
      logInPopupOpen:     false,

      isAutoSkipping: false,
      isAllSkipping:  false,

      logedIn: false,

      COLORS: {
        red:        0,
        orange:     25,
        yellow:     50,
        lightGreen: 70,
        green:      90,
      }
    };

    this.listenTo(apiActions.loadMaterialSuccess,      this.onApiDidLoadMaterials);
    this.listenTo(apiActions.loadCountrySharesSuccess, this.onloadCountrySharesSuccess);

    this.listenTo(guiActions.moveCarts,                this.onCartMoved);
    this.listenTo(guiActions.autoMoveCarts,            this.onAutoMoveCarts);
    this.listenTo(guiActions.skipCarts,                this.onSkipCharts);
    this.listenTo(guiActions.ratingCalculated,         this.onRatingCalculated);
    this.listenTo(guiActions.stopLightClicked,         this.onStopLightClicked);
    this.listenTo(guiActions.stopLightCloseClicked,    this.onStopLightClose);
    this.listenTo(guiActions.openRatingPopup,          this.onOpenRatingPopup);
    this.listenTo(guiActions.closeRatingPopup,         this.onCloseRatingPopup);
    this.listenTo(guiActions.selectDeviceMaterial,     this.onSelectDeviceMaterial);
    this.listenTo(guiActions.logInClicked,             this.onLogInClicked);
    this.listenTo(guiActions.logInCloseClicked,        this.onLogInCloseClicked);
    this.listenTo(guiActions.selectCountry,            this.onSelectCountry);
    this.listenTo(guiActions.checkLogin,               this.onCheckLogin);
  },

  onCheckLogin: function () {
    this.state.logedIn = (this.getCookie('OA') == 'true')
    this.trigger(this.state)
  },

  onSelectCountry: function (country, e) {
    this.state.selectedCountry = country
    this.trigger(this.state)
  },

  onLogInCloseClicked: function () {
    this.state.logInPopupOpen = false
    this.trigger(this.state)
  },

  onLogInClicked: function () {
    if (this.getCookie('OA') == 'true') {
      location.hash = '#uploader'
    } else {
      this.state.logInPopupOpen = true
      this.trigger(this.state)
    }
  },

  onSelectDeviceMaterial: function (material) {
    this.state.logInPopupOpen = false
    
    this.state.deviceSelectedMaterial = material
    this.clearInfoWindow()
    this.trigger(this.state)
  },

  onOpenRatingPopup: function () {
    this.state.ratingPopupOpen = true
    this.trigger(this.state)
  },

  onCloseRatingPopup: function () {
    this.state.ratingPopupOpen = false
    this.trigger(this.state)
  },

  onStopLightClicked: function () {
    this.state.stopLightPopupOpen = true;
    this.trigger(this.state);
  },

  onStopLightClose: function () {
    this.state.stopLightPopupOpen = false;
    this.trigger(this.state);
  },
  
  onCartMoved: function () {
    var currentMaterial = this.state.allMaterials[this.state.cartOffset]
    ,   nextMaterial    = this.state.allMaterials[this.state.cartOffset + 1]
    this.state.cartOffset += 1;

    this.state.deviceSelectedMaterial = false
    this.clearInfoWindow()

    if (currentMaterial) {
      this.state.deviceMaterials.push(currentMaterial);
    }
    if (this.state.cartOffset >= this.state.allMaterials.length) {
      clearInterval(this.skipIntervall)
      // open log in popup
      this.state.logedIn        = (this.getCookie('OA') == 'true')
      this.state.logInPopupOpen = true
      this.trigger(this.state);
    } else {
      apiActions.loadCountryShares(nextMaterial)
    }
  },

  onAutoMoveCarts: function () {
    clearInterval(this.skipIntervall)
    if (!this.state.isAutoSkipping)
      this.skipIntervall = setInterval(this.onCartMoved.bind(this), 900)
    this.state.isAutoSkipping = !this.state.isAutoSkipping
    this.trigger(this.state);
  },

  onSkipCharts: function () {
    clearInterval(this.skipIntervall)
    if (!this.state.isAutoSkipping)
      this.skipIntervall = setInterval(this.onCartMoved.bind(this), 0)
    this.state.isAutoSkipping = !this.state.isAutoSkipping
    this.state.isAllSkipping  = true
    this.trigger(this.state);
  },

  onRatingCalculated: function (ratingValues) {
    // material should be in this.state.allMaterials
    var material = ratingValues.material

    material.calculatedRating = ratingValues.rating
    material.color            = ratingValues.color
    material.countryRating    = ratingValues.countryRating
    material.unshureFlag      = ratingValues.unshureFlag
    this.trigger(this.state);
  },

  onloadCountrySharesSuccess: function(material, countryShares) {
    var ratingValues = this.calcMaterialRating(material, countryShares)
    if (ratingValues)
      this.onRatingCalculated(ratingValues)
  },

  onApiDidLoadMaterials: function (materials) {
    this.state.allMaterials = materials
    this.trigger(this.state)
  },

  // helpers
  clearInfoWindow: function () {
    var currentMaterial = this.state.deviceSelectedMaterial || this.state.allMaterials[this.state.cartOffset];

    this.state.ratingPopupOpen = false
    this.state.selectedCountry = currentMaterial? currentMaterial.minedIn[0] : null
  },

  calcMaterialRating: function (material, countryShares) {
    if (!material)
      return false

    var FACTORS = {
      material: {
        'recyclingRating':  function (rating) {
          // from 0 to 4 (higer is better)
          var normalized = rating * 25; 
          return normalized * 0.2; // (0.2) + 0.2 + 0.6 = 1
        }, 
        'healthRating': function (rating) {
          // from 0 to 4 (lower is better)
          var normalized = (rating - 4) * -25; 
          return normalized * 0.2; // 0.2 + (0.2) + 0.6 = 1
        }
      },
      country_factor: 0.6,         // 0.2 + 0.2 + (0.6) = 1
      country: {
        'workingConditionsRating': function (rating) {
          // from 1 to 5 (higer is better)
          var normalized = (rating - 1) * 25;
          return normalized * 0.5; // (0.5) + 0.3 + 0.2 = 1
        },    
        'humanRightsRating': function (rating) {
          // from 0 to 100 (higer is better)
          return rating     * 0.3; // 0.5 + (0.3) + 0.2 = 1
        },     
        'mineralIndustryRating': function (rating) {
          // from 0 to 70 (higer is better)
          var normalized = rating * 1.428;
          return normalized * 0.2; // 0.5 + 0.3 + (0.2) = 1
        }
      } 
    }

    // the rating for the material itself
    var finalRating = 0
    var unshureFlag = false

    for (var criterion in FACTORS.material) {
      var formula = FACTORS.material[criterion]
      finalRating += formula(material[criterion])
      if (material[criterion] === undefined) {
        unshureFlag = true
      }
    }

    // the rating for the countries the material is mined in
    var countryRating
    if (material.minedIn.length > 0) {
      countryRating = 0

      material.minedIn.forEach(function (country) {
        var currentCountryRating = 0;
        for (var criterion in country) {
          if (Object.keys(FACTORS.country).indexOf(criterion) !== -1) {
            currentCountryRating += FACTORS.country[criterion](country[criterion]);
          }
        }
        // average contry rating normalized by its share on mining the material
        var countryShare = this.getCountryShare(material, country, countryShares)
        countryRating += currentCountryRating * countryShare;
      }.bind(this));

      finalRating += countryRating * FACTORS.country_factor;
      countryRating = parseInt(countryRating)

    } else {
      unshureFlag = true
    }
    finalRating = parseInt(finalRating + 0.5); // round to whole number

    var color = this.getColor(finalRating);
    return {material: material, color: color, countryRating: countryRating, unshureFlag: unshureFlag}
  },

  getCountryShare: function (material, country, countryShares) {
    for (var share in countryShares) {
      if (share.country_materials == country.id && share.share) {
        return share.share / 100
      }
    }
    // fallback use equal weigting for countries
    return 1 / material.minedIn.length
  },

  getColor: function (rating) {
    var colors = this.state.COLORS
    var colorName = 'red'
    for (var color in colors) {
      if (rating >= colors[color] && colors[color] > colors[colorName])
        colorName = color
    }
    return colorName
  },

  // extracted from
  /*\
  |*|
  |*|  :: cookies.js ::
  |*|
  |*|  A complete cookies reader/writer framework with full unicode support.
  |*|
  |*|  Revision #1 - September 4, 2014
  |*|
  |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
  |*|  https://developer.mozilla.org/User:fusionchess
  |*|
  |*|  This framework is released under the GNU Public License, version 3 or later.
  |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
  |*|
  |*|  Syntaxes:
  |*|
  |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
  |*|  * docCookies.getItem(name)
  |*|  * docCookies.removeItem(name[, path[, domain]])
  |*|  * docCookies.hasItem(name)
  |*|  * docCookies.keys()
  |*|
  \*/
  getCookie: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }
  // end extracted from
});

module.exports = Store;