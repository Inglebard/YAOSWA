<template>
  <div class="home_template">
    <div class="view">
      <div v-if="!errorOverlay()">
        <div class="weather_header">
          <div class="weather_header_wrapper">
            <div>
              <span class="current_weather_location">{{ getCityCountryTitle() }}</span>
            </div>
            <div class="separator" v-bind:class="{invisible: !getCityCountryTitle()}">
              <span></span>
            </div>
            <div class="weather_chooser">
              <span class="weather_type">{{weather_header_title}}</span>
              <span class="header_icon pull-left" v-show="!isMinTab()">
                <a v-on:click="prevTab()">
                  <i class="fa fa-chevron-left"></i>
                </a>
              </span>
              <span class="header_icon pull-right" v-show="!isMaxTab()">
                <a v-on:click="nextTab()">
                  <i class="fa fa-chevron-right"></i>
                </a>
              </span>
              <div class="clear_both"></div>
            </div>
          </div>
        </div>
        <div class="tab_list">
          <div class="tab" v-show="isActiveTab(0)">
            <currentweatherlist v-bind:currentWeather="currentWeather" v-bind:imgsrcoverlay="imgsrcoverlay" v-bind:lazyLoadCache="lazyLoadCache"></currentweatherlist>
          </div>
          <div class="tab" v-show="isActiveTab(1)">
            <hourlyweatherlist v-bind:hourlyWeather="hourlyWeather" v-bind:imgsrcoverlay="imgsrcoverlay" v-bind:lazyLoadCache="lazyLoadCache"></hourlyweatherlist>
          </div>
          <div class="tab" v-show="isActiveTab(2)">
            <dailyweatherlist v-bind:dailyWeather="dailyWeather" v-bind:imgsrcoverlay="imgsrcoverlay" v-bind:lazyLoadCache="lazyLoadCache"></dailyweatherlist>
          </div>
        </div>
      </div>
      <div id="errorOverlay" class="container-centered" v-show="errorOverlay()">
        <div class="elem-centered">
          <div class="text_wrapper">
            <span v-html="errorOverlaymsg"></span>
          </div>
          <div class="button_wrapper">
            <button v-on:click="refresh()">{{ $t('Refresh') }}</button>
          </div>
          <div class="button_wrapper">
            <a href="#settings">
              <router-link to="/settings" tag="button">{{ $t('Settings') }}</router-link>
            </a>
          </div>
        </div>
      </div>
      <div id="loadingOverlay" v-show="loaderOverlay">
        <div class="loading_overlay_wrapper">
          <div class="image_wrapper">
            <img v-bind:src="imgsrcoverlay" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  WeatherService
} from '@/services/WeatherService.js'
import {
  HeaderService
} from '@/services/HeaderService.js'
import {
  SettingsService
} from '@/services/SettingsService.js'
import CurrentWeatherList from '@/components/CurrentWeatherList.vue'
import HourlyWeatherList from '@/components/HourlyWeatherList.vue'
import DailyWeatherList from '@/components/DailyWeatherList.vue'

export default {
  name: 'home',
  components: {
    'currentweatherlist': CurrentWeatherList,
    'hourlyweatherlist': HourlyWeatherList,
    'dailyweatherlist': DailyWeatherList
  },
  'data': function () {
    return {
      settingsData: {},
      city_header_title: '',
      country_header_title: '',
      lon_header_title: '',
      lat_header_title: '',
      weather_header_title: '',
      activeTab: 0,
      loaderOverlay: false,
      errorOverlaymsg: '',
      minTab: 0,
      maxTab: 2,
      currentWeather: null,
      hourlyWeather: null,
      dailyWeather: null,
      currentWeatherLoaded: null,
      hourlyWeatherLoaded: null,
      dailyWeatherLoaded: null,
      lazyLoadCache: 0,
      imgsrcoverlay: 'img/application_icon/loader_animate.svg',
      weather_title: new Array(
        'Now',
        'Next Hours',
        'Next Days'
      )

    }
  },
  methods: {
    init: function (dataEvent) {
      this.settingsData.city = dataEvent.city
      this.settingsData.isaccurate = dataEvent.isaccurate
      this.settingsData.isgeolocate = dataEvent.isgeolocate
      this.settingsData.cnt = dataEvent.cnt
      this.settingsData.isanimate = dataEvent.isanimate
      this.settingsData.tempunitid = dataEvent.tempunitid,
      this.settingsData.speedunitid = dataEvent.speedunitid
      this.settingsData.applanguageid = dataEvent.applanguageid
      this.settingsData.weatherlanguageid = dataEvent.weatherlanguageid

      this.settingsData.tempunit = dataEvent.tempunit,
      this.settingsData.speedunit = dataEvent.speedunit
      this.settingsData.applanguage = dataEvent.applanguage
      this.settingsData.weatherlanguage = dataEvent.weatherlanguage

      this.settingsData.pressureunit = dataEvent.pressureunit
      this.settingsData.percunit = dataEvent.percunit

      this.settingsData.apiId = dataEvent.apiId

      /* Tanslation for WeatherService */
      this.settingsData.pressureUnitLab = this.$t(this.settingsData.pressureunit.unit),
      this.settingsData.precUnitLab = this.$t(this.settingsData.percunit.unit)
      this.settingsData.tempUnitLab = this.$t(this.settingsData.tempunit.unit)
      this.settingsData.speedUnitLab = this.$t(this.settingsData.speedunit.unit)
      /* End tanslation for WeatherService */

      this.loadWeather(this.activeTab, this.settingsData)
    },
    getCityCountryTitle: function () {
      if (this.city_header_title && this.country_header_title) {
        return this.city_header_title + ' / ' + this.country_header_title
      } else if (this.city_header_title) {
        return this.city_header_title
      } else if (this.lon_header_title && this.lat_header_title) {
        return this.$t('Lon :  {{LON}}, Lat :  {{LAT}}', {
          LON: this.lon_header_title,
          LAT: this.lat_header_title
        })
      } else {
        return null
      }
    },
    isMinTab: function () {
      if (this.activeTab == this.minTab) {
        return true
      }
      return false
    },
    isMaxTab: function () {
      if (this.activeTab == this.maxTab) {
        return true
      }
      return false
    },
    nextTab: function () {
      this.activeTab++
      this.loadWeather(this.activeTab, this.settingsData)
      this.weather_header_title = this.$t(this.weather_title[this.activeTab])
    },
    prevTab: function () {
      this.activeTab--
      this.loadWeather(this.activeTab, this.settingsData)
      this.weather_header_title = this.$t(this.weather_title[this.activeTab])
    },
    isActiveTab: function (index) {
      if (this.activeTab == index) {
        return true
      }
      return false
    },
    isReadyTab: function (index) {
      if (this.activeTab == index && this.loaderOverlay === false) {
        return true
      }
      return false
    },
    errorOverlay: function () {
      var weather_test
      if (typeof (this.currentWeather) !== 'undefined' && this.currentWeather != null) {
        weather_test = this.currentWeather
      } else if (typeof (this.hourlyWeather) !== 'undefined' && this.hourlyWeather != null) {
        weather_test = this.hourlyWeather
      } else if (typeof (this.dailyWeather) !== 'undefined' && this.dailyWeather != null) {
        weather_test = this.dailyWeather
      }
      if (typeof (weather_test) !== 'undefined' && weather_test != null) {
        if (weather_test.cod == 404) {
          this.errorOverlaymsg = this.$t('City not Found.')
          return true
        } else if (weather_test.cod == 500) {
          this.errorOverlaymsg = this.$t('Unable to get data.<br/>Check your network connection.')
          return true
        }
      }
      return false
    },
    refresh: function () {
      this.weather_header_title = this.$t(this.weather_title[this.activeTab])
      this.loadWeather(this.activeTab, this.settingsData)
    },
    loadDisplayedWeather: function (type_weather) {
      this.currentWeather = undefined
      this.hourlyWeather = undefined
      this.dailyWeather = undefined
      switch (type_weather) {
        case 0:
          this.currentWeather = this.currentWeatherLoaded
          break
        case 1:
          this.hourlyWeather = this.hourlyWeatherLoaded
          break
        case 2:
          this.dailyWeather = this.dailyWeatherLoaded
          break
      }
      this.lazyLoadCache = (new Date()).getTime()
    },
    loadWeather: function (type_weather, settings) {
      this.imgsrcoverlay = 'img/application_icon/loader_animate.svg?lazyload=' + this.lazyLoadCache
      this.loaderOverlay = true

      switch (type_weather) {
        case 0:
          WeatherService.$emit('emitCurrentWeatherData', settings)
          break
        case 1:
          WeatherService.$emit('emitHourlyWeatherData', settings)
          break
        case 2:
          WeatherService.$emit('emitDailyWeatherData', settings)
          break
      }
    },
    setCurrentWeatherData: function (data) {
      if (data.cod != 500) {
        this.city_header_title = data.city
        this.country_header_title = data.country
        this.lon_header_title = data.lon
        this.lat_header_title = data.lat
      }
      this.currentWeatherLoaded = Object.assign({}, this.currentWeatherLoaded, data)
      this.loadDisplayedWeather(0)
      this.loaderOverlay = false
    },
    setHourlyWeatherData: function (data) {
      if (data.cod != 500) {
        this.city_header_title = data.city
        this.country_header_title = data.country
        this.lon_header_title = data.lon
        this.lat_header_title = data.lat
      }
      this.hourlyWeatherLoaded = Object.assign({}, this.hourlyWeatherLoaded, data)
      this.loadDisplayedWeather(1)
      this.loaderOverlay = false
    },
    setDailyWeatherData: function (data) {
      if (data.cod != 500) {
        this.city_header_title = data.city
        this.country_header_title = data.country
        this.lon_header_title = data.lon
        this.lat_header_title = data.lat
      }
      this.dailyWeatherLoaded = Object.assign({}, this.dailyWeatherLoaded, data)
      this.loadDisplayedWeather(2)
      this.loaderOverlay = false
    }
  },
  created: function () {
    SettingsService.$on('settingsData', this.init)

    WeatherService.$on('currentWeatherData', this.setCurrentWeatherData)
    WeatherService.$on('hourlyWeatherData', this.setHourlyWeatherData)
    WeatherService.$on('dailyWeatherData', this.setDailyWeatherData)
  },
  mounted: function () {
    SettingsService.$emit('emitSettingsData', null)
    HeaderService.$emit('hideBackButton')
    this.weather_header_title = this.$t(this.weather_title[this.activeTab])
  }
}
</script>
