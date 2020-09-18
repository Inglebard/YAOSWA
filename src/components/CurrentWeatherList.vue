<template>
  <div class="weather_data_wrapper" v-if="currentWeather">
    <div v-bind:class="'current_weather weather_data weather_'+currentWeather.weather_id+' '+currentWeather.customInfo.day_status">
      <div class="summary_info_current_weather summary_info_weather">
        <div v-show="currentWeather.dt">
          <span class="current_weather_date">{{$d(currentWeather.dt, 'short')}}</span>
        </div>
        <div v-show="currentWeather.dt">
          <span class="current_weather_date">{{$d(currentWeather.dt, 'timehourmin')}}</span>
        </div>
        <div class="current_weather_logo_wrapper" v-show="currentWeather.customInfo.image">
          <img class="current_weather_logo" v-bind:src="currentWeather.customInfo.image+'?lazyload='+lazyLoadCache" />
        </div>
        <div v-show="currentWeather.description">
          <span class="current_weather_desc">{{currentWeather.description}}</span>
        </div>
      </div>
      <div class="detail_info_current_weather detail_info_weather" v-show="currentWeather">
        <div class="separator">
          <span></span>
        </div>
        <div class="row">
          <div class="col-xs-6" v-show="currentWeather.sunrise">
            <div>
              <img class="detail_icon detail_icon_sunrise" src="img/details_icon/icon_sunrise.svg" />
              <span>{{$d(currentWeather.sunrise, 'timehourminsec')}}</span>
            </div>
          </div>
          <div class="col-xs-6" v-show="currentWeather.sunset">
            <img class="detail_icon detail_icon_sunset" src="img/details_icon/icon_sunset.svg" />
            <span>{{$d(currentWeather.sunset, 'timehourminsec')}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.temp">
            <img class="detail_icon detail_icon_temp" src="img/details_icon/icon_temp.svg" />
            <span>{{currentWeather.temp}} {{currentWeather.tempUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="typeof(currentWeather.clouds)!='undefined' || currentWeather.clouds!=null">
            <img class="detail_icon detail_icon_cloud" src="img/details_icon/icon_cloud.svg" />
            <span>{{currentWeather.clouds | round(0)}} {{currentWeather.percUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.temp_min">
            <img class="detail_icon detail_icon_temp_min" src="img/details_icon/icon_temp_min.svg" />
            <span>{{currentWeather.temp_min}} {{currentWeather.tempUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.temp_max">
            <img class="detail_icon detail_icon_temp_max" src="img/details_icon/icon_temp_max.svg" />
            <span>{{currentWeather.temp_max}} {{currentWeather.tempUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.pressure">
            <img class="detail_icon detail_icon_pressure" src="img/details_icon/icon_pressure.svg" />
            <span>{{currentWeather.pressure}} {{currentWeather.pressureUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.humidity">
            <img class="detail_icon detail_icon_humidity" src="img/details_icon/icon_humidity.svg" />
            <span>{{currentWeather.humidity}} {{currentWeather.percUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.wind_deg">
            <img class="detail_icon detail_icon_wind_orientation" src="img/details_icon/icon_wind_orientation.svg" />
            <span>{{currentWeather.wind_deg | round(0)}}° ({{$t(currentWeather.wind_orient)}})</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.wind_speed">
            <img class="detail_icon detail_icon_wind_speed" src="img/details_icon/icon_wind_speed.svg" />
            <span>{{currentWeather.wind_speed | round(2)}} {{currentWeather.speedUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.rain">
            <img class="detail_icon detail_icon_rain" src="img/details_icon/icon_rain.svg" />
            <span>{{currentWeather.rain| round(2)}} {{currentWeather.precUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="currentWeather.snow">
            <img class="detail_icon detail_icon_snow" src="img/details_icon/icon_snow.svg" />
            <span>{{currentWeather.snow | round(2)}} {{currentWeather.precUnitLab}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'currentweatherlist',
  props: [
    'currentWeather',
    'lazyLoadCache'

  ],
  data: function () {
    return {
    }
  },
  methods: {
  },
  beforeMount: function () {
  }
}
</script>
