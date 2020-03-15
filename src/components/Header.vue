<template>
<header v-bind:class="getBackButtonClass()" class="" id="header">
  <span v-if="showBackButton" class="header_icon pull-left" >
    <router-link to="/">
      <i class="fa fa-chevron-left"></i>
    </router-link>
  </span>

  <span id="headertitle" class="pull-left">
    {{$t($route.name)}}
  </span>

  <span class="header_icon pull-right">
    <router-link to="/about">
      <i class="fa fa-info-circle"></i>
    </router-link>
  </span>
  <span class="header_icon pull-right">
    <router-link to="/settings">
      <i class="fa fa-cog"></i>
    </router-link>
  </span>
</header>
</template>

<script>

import { HeaderService } from '@/services/HeaderService.js'
export default {
  name: 'Header',
  data: function () {
    return {
      showBackButton: false
    }
  },
  methods: {
    getHeaderTitle: function () {
      return 'YAOSWA'
    },
    getBackButtonClass: function () {
      if (this.showBackButton) {
        return ''
      } else {
        return 'header_no_back_button'
      }
    },
    setShowBackButton: function (data) {
      this.showBackButton = data
    }
  },
  created: function () {
    HeaderService.$on('backButton', this.setShowBackButton)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  box-sizing: border-box;
  height: 60px;
  line-height: 45px;
  text-align: center;
  width: 100%;
  background-color: #ecedec;
  color: #5c5c5c;
  padding: 5px;
  border-bottom: 10px solid #d7d7d7;
}

#headertitle,
.weather_header {
  font-family: 'ubuntu-light';
  padding-left: 10px;
  font-size: 20px;
  line-height: 42px;
}

.header_icon>a {
  font-size: 25px;
  padding: 0 7px;
  color: #5c5c5c;
}
</style>
