var Reflux    = require('reflux');
var apiActions = require('../actions/apiActions');
var guiActions = require('../actions/guiActions');

var GuiStore = Reflux.createStore({
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

      isAutoSkipping: false
    };

    this.listenTo(apiActions.loadSuccess,           this.onApiDidLoad);
    this.listenTo(guiActions.moveCarts,             this.onCartMoved);
    this.listenTo(guiActions.skipCarts,             this.onSkipCharts);
    this.listenTo(guiActions.ratingCalculated,      this.onRatingCalculated);
    this.listenTo(guiActions.stopLightClicked,      this.onStopLightClicked);
    this.listenTo(guiActions.stopLightCloseClicked, this.onStopLightClose);
    this.listenTo(guiActions.openRatingPopup,       this.onOpenRatingPopup);
    this.listenTo(guiActions.closeRatingPopup,      this.onCloseRatingPopup);
    this.listenTo(guiActions.selectDeviceMaterial,  this.onSelectDeviceMaterial);
    this.listenTo(guiActions.logInClicked,          this.onLogInClicked);
    this.listenTo(guiActions.logInCloseClicked,     this.onLogInCloseClicked);
    this.listenTo(guiActions.selectCountry,         this.onSelectCountry);
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
    this.state.logInPopupOpen = true
    this.trigger(this.state)
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
    if (this.moveIsBlocked)
      return false

    this.moveIsBlocked = true

    var currentMaterial = this.state.allMaterials[this.state.cartOffset];
    this.state.cartOffset += 1;

    this.state.deviceSelectedMaterial = false
    this.clearInfoWindow()

    if (currentMaterial) {
      this.state.deviceMaterials.push(currentMaterial);
    }
    if (this.state.cartOffset >= this.state.allMaterials.length) {
      clearInterval(this.skipIntervall)
      this.state.logInPopupOpen = true
    }
    this.trigger(this.state);
    setTimeout(function(){this.moveIsBlocked = false}.bind(this),800)
  },

  onSkipCharts: function () {
    clearInterval(this.skipIntervall)
    if (!this.state.isAutoSkipping)
      this.skipIntervall = setInterval(this.onCartMoved.bind(this), 800)
    this.state.isAutoSkipping = !this.state.isAutoSkipping
    this.trigger(this.state);
  },

  onRatingCalculated: function (material, rating, color, countryRating, unshureFlag) {
    // material should be in this.state.allMaterials
    material.calculatedRating = rating
    material.color            = color
    material.countryRating    = countryRating
    material.unshureFlag      = unshureFlag
    this.trigger(this.state);
  },

  onApiDidLoad: function (materials, err) {
    this.state.allMaterials = materials
    this.trigger(this.state)
  },

  // helper
  clearInfoWindow: function () {
    var currentMaterial = this.state.deviceSelectedMaterial || this.state.allMaterials[this.state.cartOffset];

    this.state.ratingPopupOpen = false
    this.state.selectedCountry = currentMaterial? currentMaterial.minedIn[0] : null
  }
});

module.exports = GuiStore;