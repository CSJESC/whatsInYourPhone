var Reflux    = require('reflux');
var apiActions = require('../actions/apiActions');
var guiActions = require('../actions/guiActions');

var GuiStore = Reflux.createStore({
  init: function() {
    this.state = {
      cartOffset:         0,
      deviceMaterials:    [],
      allMaterials:       [],
      stopLightPopupOpen: false,
      ratingPopupOpen:    false
    };

    this.listenTo(apiActions.loadSuccess,           this.onApiDidLoad);
    this.listenTo(guiActions.moveCarts,             this.onCartMoved);
    this.listenTo(guiActions.skipCarts,             this.onSkipCharts);
    this.listenTo(guiActions.ratingCalculated,      this.onRatingCalculated);
    this.listenTo(guiActions.stopLightClicked,      this.onStopLightClicked);
    this.listenTo(guiActions.stopLightCloseClicked, this.onStopLightClose);
    this.listenTo(guiActions.openRatingPopup,       this.onOpenRatingPopup);
    this.listenTo(guiActions.closeRatingPopup,      this.onCloseRatingPopup);
  },

  onOpenRatingPopup: function () {
    this.state.ratingPopupOpen = true;
    this.trigger(this.state);
  },

  onCloseRatingPopup: function () {
    this.state.ratingPopupOpen = false;
    this.trigger(this.state);
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
    var currentMaterial = this.state.allMaterials[this.state.cartOffset];
    if (currentMaterial) {
      this.state.deviceMaterials.push(currentMaterial);
      this.state.cartOffset += 1;
      this.trigger(this.state);
    } else {
      clearInterval(this.skipIntervall);
    }
  },

  onSkipCharts: function () {
    this.skipIntervall = setInterval(this.onCartMoved.bind(this), 800);
  },

  onRatingCalculated: function (material, rating, color, countryRating) {
    // material should be in this.state.allMaterials
    material.calculatedRating = rating
    material.color            = color
    material.countryRating    = parseInt(countryRating)
    this.trigger(this.state);
  },

  onApiDidLoad: function (materials) {
    this.state.allMaterials = materials
    this.trigger(this.state);
  },
});

module.exports = GuiStore;