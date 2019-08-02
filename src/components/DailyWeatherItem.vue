<template>
  <div class="weather_dailyitem" v-if="weather && dailyWeather">
    <div v-bind:class="'daily_weather weather_data weather_'+weather.weather_id+' '+weather.customInfo.day_status+' '+weatherDetailClass()" v-on:click="toggleWeatherDetail()">
      <div class="summary_info_daily_weather summary_info_weather">
        <div class="row row_weather align-items-center">
          <div class="col-xs-4">
            <div>
              <div class="daily_weather_logo_wrapper">
                <div v-lazyload class="daily_weather_logo">
                  <img v-bind:src="imgsrcoverlay" v-bind:data-url="weather.customInfo.image+'?numdaily='+index+'-'+lazyLoadCache" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-4">
            <div>
              <span class="daily_weather_date_day">{{$d(weather.dt, 'short')}}</span>
              <span class="daily_weather_date">{{$d(weather.dt, 'timehourmin')}}</span>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="vcenter">
              <div class="align-left">
                <span class="daily_weather_desc">{{weather.description}}</span>
                <span class="daily_weather_temp">{{weather.temp}} {{dailyWeather.tempUnitLab}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail_info_daily_weather detail_info_weather">
        <div class="separator">
          <span></span>
        </div>
        <div class="row">
          <div class="col-xs-6" v-show="weather.temp">
            <img class="detail_icon detail_icon_temp" src="img/details_icon/icon_temp.svg" />
            <span>{{weather.temp}} {{dailyWeather.tempUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="typeof(weather.clouds)!='undefined' || weather.clouds!=null">
            <img class="detail_icon detail_icon_cloud" src="img/details_icon/icon_cloud.svg" />
            <span>{{weather.clouds | round(0)}} {{dailyWeather.percUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="weather.temp_min">
            <img class="detail_icon detail_icon_temp_min" src="img/details_icon/icon_temp_min.svg" />
            <span>{{weather.temp_min}} {{dailyWeather.tempUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="weather.temp_max">
            <img class="detail_icon detail_icon_temp_max" src="img/details_icon/icon_temp_max.svg" />
            <span>{{weather.temp_max}} {{dailyWeather.tempUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="weather.pressure">
            <img class="detail_icon detail_icon_pressure" src="img/details_icon/icon_pressure.svg" />
            <span>{{weather.pressure}} {{dailyWeather.pressureUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="weather.humidity">
            <img class="detail_icon detail_icon_humidity" src="img/details_icon/icon_humidity.svg" />
            <span>{{weather.humidity}} {{dailyWeather.percUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="weather.wind_deg">
            <img class="detail_icon detail_icon_wind_orientation" src="img/details_icon/icon_wind_orientation.svg" />
            <span>{{weather.wind_deg | round(0) }}° ({{weather.wind_orient}})</span>
          </div>
          <div class="col-xs-6" v-show="weather.wind_speed">
            <img class="detail_icon detail_icon_wind_speed" src="img/details_icon/icon_wind_speed.svg" />
            <span>{{weather.wind_speed | round(2) }} {{dailyWeather.speedUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="weather.rain">
            <img class="detail_icon detail_icon_rain" src="img/details_icon/icon_rain.svg" />
            <span>{{weather.rain | round(2) }} {{dailyWeather.precUnitLab}}</span>
          </div>
          <div class="col-xs-6" v-show="weather.snow">
            <img class="detail_icon detail_icon_snow" src="img/details_icon/icon_snow.svg" />
            <span>{{weather.snow | round(2) }} {{dailyWeather.precUnitLab}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dailyweatheritem',
  props:[
    'index',
    'weather',
    'dailyWeather',
    'imgsrcoverlay',
    'lazyLoadCache'
  ],
  data: function() {
    return {
      weatherDetail:false,
    };
  },
  methods: {
    toggleWeatherDetail: function() {
      this.weatherDetail=!this.weatherDetail;
  	},
    weatherDetailClass: function() {
  		if(this.weatherDetail)
  		{
  			return "show_weather_detail";
  		}
      return '';
  	}
  },
  beforeMount: function() {
  }
}
</script>

</style>
