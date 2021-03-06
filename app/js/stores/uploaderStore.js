var Reflux    = require('reflux');
var apiActions      = require('../actions/apiActions');
var uploaderActions = require('../actions/uploaderActions');

var Store = Reflux.createStore({
  init: function() {
    this.state = {
      countries:            [],
      allMaterials:         [],
      currentMaterial:      null,
      currentCountry:       null,

      editWindowOpen:          false,
      countriesWindowOpen:     false,
      countriesEditWindowOpen: false,
    };

    this.listenTo(apiActions.loadMaterialSuccess,      this.onApiDidLoadMaterials);
    this.listenTo(apiActions.materialChangeSuccess,    this.onMaterialChangeSuccess);
    this.listenTo(apiActions.loadCountriesSuccsess,    this.onLoadCountriesSuccsess);
    this.listenTo(apiActions.countryChangeSuccess,     this.onCountryChangeSuccess);
    this.listenTo(apiActions.loadCountrySharesSuccess, this.onloadCountrySharesSuccess);

    this.listenTo(uploaderActions.editMaterial,    this.onEditMaterial);
    this.listenTo(uploaderActions.toggleCountry,   this.onToggleCountry);
    this.listenTo(uploaderActions.updateShare,     this.onUpdateShare);
    this.listenTo(uploaderActions.resetShares,      this.onResetShares);

    this.listenTo(uploaderActions.listCountries,    this.onListCountries);
    this.listenTo(uploaderActions.editCountry,      this.onEditCountry);

    this.listenTo(uploaderActions.triggerState,     this.onTriggerState);
    this.listenTo(uploaderActions.closePopup,       this.onClosePopup);
  },

  onApiDidLoadMaterials: function (materials, err) {
    this.state.allMaterials = materials
    this.trigger(this.state)
  },

  onMaterialChangeSuccess: function() {
    this.closePopups()
    this.trigger(this.state)
  },

  onLoadCountriesSuccsess: function(countries) {
    this.state.countries = countries
    this.trigger(this.state)
  },

  onCountryChangeSuccess: function() {
    this.closePopups()
    this.trigger(this.state)
  },

  onloadCountrySharesSuccess: function(material, shares) {
    var shareObj = {}
    shares.forEach(function(share) {
      shareObj[share.country_materials] = share.share
    }.bind(this))

    material.shares = shareObj
    this.trigger(this.state)
  },

  onEditMaterial: function (material) {
    window.scrollTo(0,0)
    this.closePopups()
    this.state.currentMaterial     = material
    this.state.editWindowOpen      = true
    this.trigger(this.state)
  },

  onToggleCountry: function(material, countryId) {
    var index
    if (material.minedIn) {
      index = material.minedIn.indexOf(countryId)
    } else {
      material.minedIn = []
    }
    if (index >= 0) {
      material.minedIn.splice(index, 1)
    } else {
      material.minedIn.push(countryId)
    }

    if (material.minedIn.length === 0)
      delete material.minedIn

    this.onResetShares(material)
    
    this.trigger(this.state)
  },

  onUpdateShare: function(material, countryId, numberOfShares, xDiff) {
    var oldShare    = material.shares[countryId]
    var sliderWidth = oldShare * 4 + xDiff
    share = sliderWidth / 4

    if (share > 100) share = 100
    if (share < 1)   share = 1

    // reduce difference from other shares
    var leftover = 100 - share

    for (key in material.shares) {
      if (key != countryId) {
        // update all according to thier share
        
        updatedShare = leftover * material.shares[key] / (100 - oldShare)
        if (updatedShare < 1 || !isFinite(updatedShare)) {
          updatedShare = 1
          // make shure sum equals 100
          share = 100 - numberOfShares + 1
        }
        material.shares[key] = updatedShare
      }

    }
    material.shares[countryId] = share

    this.trigger(this.state)
  },

  onResetShares: function (material) {
    material.shares = {}
  },

  onListCountries: function() {
    window.scrollTo(0,0)
    this.closePopups()
    this.state.countriesWindowOpen = true
    this.trigger(this.state)
  },

  onEditCountry: function(country) {
    window.scrollTo(0,0)
    this.closePopups()
    this.state.countriesEditWindowOpen = true
    this.state.currentCountry          = country
    this.trigger(this.state)
  },

  onTriggerState: function () {
    this.trigger(this.state)
  },

  onClosePopup: function () {
    this.closePopups()
    this.trigger(this.state)
  },

  // helper
  closePopups: function () {
    this.state.editWindowOpen          = false
    this.state.countriesWindowOpen     = false
    this.state.countriesEditWindowOpen = false

    this.state.currentCountry  = null
    this.state.currentMaterial = null
  }


});

module.exports = Store;