<template>
  <div class="about">
    		<div class="container">
    			<div class="about_logo_wrapper">
    				<img src="img/application_icon/ic_launcher.svg">
    			</div>
    			<div class="about_text_wrapper">
    				<span class="about_title mediumfont">YAOSWA v2.0.0</span>
    				<span class="about_subtitle">Yet Another Open Source Weather Application</span>
    				<p class="about_desc">
    					<span>YAOSWA is a weather application created for smarthphone.</span>
    					<br/>
    					<span>This app is powered by </span><a href="https://openweathermap.org/" target="_blank">OpenWeatherMap</a>&nbsp;<span>and</span>&nbsp;<a href="https://vuejs.org/" target="_blank">Vuejs</a>.
    				</p>
    				<ul>
    					<li><span>Website and support:</span>&nbsp;<a href="https://github.com/Inglebard/YAOSWA" target="_blank">YAOSWA</a></li>
    					<li><span>License:</span>&nbsp;<a href="https://opensource.org/licenses/GPL-2.0" target="_blank" >GPL2</a></li>
    				</ul>
    			</div>
    		</div>
  </div>
</template>

<script>
// @ is an alias to /src

import { HeaderService } from '@/services/HeaderService.js'

export default {
  'name': 'about',
  'components': {},
  'data': function () {
    return {
    }
  },
  methods: {
  },
  beforeMount: function () {
    HeaderService.$emit('showBackButton')
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
