import Vue from 'vue'


export const HeaderService = new Vue({
  data: function() {
    return {
      showBackButton: true,
      showAboutButton: true,
      showSettingsButton: true,
      showHeader: true,
    }
  },
  methods: {
    getHeaderTitle: function() {
      return this.headerTitle;
    },
    setHeaderTitle: function(title) {
      this.headerTitle = title;
    },
    getShowBackButton: function() {
      return this.showBackButton;
    },
    setShowBackButton: function(state) {
      this.showBackButton = state;
    },
    getShowAboutButton: function() {
      return this.showAboutButton;
    },
    setShowAboutButton: function(state) {
      this.showAboutButton = state;
    },
    getShowSettingsButton: function() {
      return this.showSettingsButton;
    },
    setShowSettingsButton: function(state) {
      this.showSettingsButton = state;
    },
    getShowHeader: function() {
      return this.showHeader;
    },
    setShowHeader: function(state) {
      this.showHeader = state;
    },
    emitShowBackButton: function(state) {
      this.$emit('backButton', this.getShowBackButton());
    }
  },
  created: function() {
    this.$on('showBackButton', function() {
      this.setShowBackButton(true);
      this.emitShowBackButton();
    });
    this.$on('hideBackButton', function() {
      this.setShowBackButton(false);
      this.emitShowBackButton();
    });
  }
});
