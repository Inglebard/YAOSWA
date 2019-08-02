import Vue from 'vue'
import i18n from '@/i18n'
import VueResource from 'vue-resource'
Vue.use(VueResource);


import {
  SettingsService
} from '@/services/SettingsService.js'
import {
  UtilsService
} from '@/services/UtilsService.js'

export const WeatherService = new Vue({
  i18n,
  data: function() {
    return {

    }
  },
  methods: {

    getWeatherParam: function() {
      var param = new Object();
      param.location = SettingsService.getCity();
      param.accurate = SettingsService.getIsAccurate();
      param.geolocate = SettingsService.getIsGeolocate();
      param.tempUnit = SettingsService.getTempUnit().owm;
      param.cnt = SettingsService.getCnt();
      param.apiId = SettingsService.getApiId();
      param.lang = SettingsService.getWeatherLanguage().label;
      param.cordovaOpt = {
        timeout: 60000,
        maximumAge: 100000
      };
      if (param.accurate === true) {
        param.type = "accurate";
      } else {
        param.type = "like";
      }
      return param;
    },
    getCurrentWeather: function() {
      var param = this.getWeatherParam();
      var base_current_weather_url = "https://api.openweathermap.org/data/2.5/weather?";

      var current_weather_url_not_geo = "q=" + escape(param.location);
      var current_weather_url_geo = "lat=%lat%&lon=%lon%";

      var current_weather_end_url = "&units=" + param.tempUnit;
      current_weather_end_url += "&type=" + param.type;
      current_weather_end_url += "&lang=" + param.lang;
      current_weather_end_url += "&APPID=" + param.apiId;

      var request_return;
      if (param.geolocate && navigator.geolocation) {
        request_return = new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              current_weather_url_geo = current_weather_url_geo.replace('%lat%', position.coords.latitude).replace('%lon%', position.coords.longitude);
              resolve(this.$http.get(base_current_weather_url + current_weather_url_geo + current_weather_end_url));
            }.bind(this),
            function() {
              resolve(this.$http.get(base_current_weather_url + current_weather_url_not_geo + current_weather_end_url));
            }.bind(this),
            param.cordovaOpt
          )
        }.bind(this));
      } else {
        request_return = this.$http.get(base_current_weather_url + current_weather_url_not_geo + current_weather_end_url);
      }
      return request_return;

    },
    getHourlyForecastWeather: function() {

      var param = this.getWeatherParam();
      var base_hourly_weather_url = "https://api.openweathermap.org/data/2.5/forecast?";

      var hourly_weather_url_not_geo = "q=" + param.location;
      var hourly_weather_url_geo = "lat=%lat%&lon=%lon%";

      var hourly_weather_end_url = "&units=" + escape(param.tempUnit);
      hourly_weather_end_url += "&type=" + param.type;
      hourly_weather_end_url += "&lang=" + param.lang;
      hourly_weather_end_url += "&cnt=" + escape(param.cnt);
      hourly_weather_end_url += "&APPID=" + param.apiId;

      var request_return;

      if (param.geolocate && navigator.geolocation) {
        request_return = new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              hourly_weather_url_geo = hourly_weather_url_geo.replace('%lat%', position.coords.latitude).replace('%lon%', position.coords.longitude);
              resolve(this.$http.get(base_hourly_weather_url + hourly_weather_url_geo + hourly_weather_end_url));
            }.bind(this),
            function() {
              resolve(this.$http.get(base_hourly_weather_url + hourly_weather_url_not_geo + hourly_weather_end_url));
            }.bind(this),
            param.cordovaOpt
          )
        }.bind(this));
      } else {
        request_return = this.$http.get(base_hourly_weather_url + hourly_weather_url_not_geo + hourly_weather_end_url);

      }
      return request_return;

    },
    getDailyForecastWeather: function() {

      var param = this.getWeatherParam();
      var base_daily_weather_url = "https://api.openweathermap.org/data/2.5/forecast/daily?";

      var daily_weather_url_not_geo = "q=" + escape(param.location);
      var daily_weather_url_geo = "lat=%lat%&lon=%lon%";

      var daily_weather_end_url = "&units=" + param.tempUnit;
      daily_weather_end_url += "&type=" + param.type;
      daily_weather_end_url += "&lang=" + param.lang;
      daily_weather_end_url += "&cnt=" + escape(param.cnt);
      daily_weather_end_url += "&APPID=" + param.apiId;

      var request_return;

      if (param.geolocate && navigator.geolocation) {
        request_return = new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              daily_weather_url_geo = daily_weather_url_geo.replace('%lat%', position.coords.latitude).replace('%lon%', position.coords.longitude);
              resolve(this.$http.get(base_daily_weather_url + daily_weather_url_geo + daily_weather_end_url));
            }.bind(this),
            function() {
              resolve(this.$http.get(base_daily_weather_url + daily_weather_url_not_geo + daily_weather_end_url));
            }.bind(this),
            param.cordovaOpt
          )
        }.bind(this));
      } else {
        request_return = this.$http.get(base_daily_weather_url + daily_weather_url_not_geo + daily_weather_end_url);

      }
      return request_return;
    },
    formatWeatherData: function(HTTPresponse, type_weather) {
      console.log(HTTPresponse);

      var weatherObj = new Object();
      var param = new Object();

      weatherObj.cod = HTTPresponse.cod;
      if (weatherObj.cod == 404) {
        return weatherObj;
      }

      if (typeof(weatherObj.cod) == 'undefined') {
        weatherObj.cod = 500;
        return weatherObj;
      }

      var temp_unit_id = SettingsService.getTempUnitId();
      var speed_unit_id = SettingsService.getSpeedUnitId();

      weatherObj.percUnitLab = this.$t(SettingsService.getPercUnit().unit);
      weatherObj.pressureUnitLab = this.$t(SettingsService.getPressureUnit().unit);
      weatherObj.precUnitLab = this.$t(SettingsService.getPrecipUnit().unit);
      weatherObj.tempUnitLab = this.$t(SettingsService.getTempUnit().unit);
      weatherObj.speedUnitLab = this.$t(SettingsService.getSpeedUnit().unit);

      if (type_weather === 0) {
        weatherObj.dt = HTTPresponse.dt * 1000;
        weatherObj.city = HTTPresponse.name;

        if (typeof(HTTPresponse.coord) !== "undefined") {
          weatherObj.lon = HTTPresponse.coord.lon;
          weatherObj.lat = HTTPresponse.coord.lat;
        }

        if (typeof(HTTPresponse.sys) !== "undefined") {
          weatherObj.country = HTTPresponse.sys.country;
          weatherObj.sunrise = HTTPresponse.sys.sunrise * 1000;
          weatherObj.sunset = HTTPresponse.sys.sunset * 1000;
          weatherObj.pod = "d";

          var dt_date = new Date(weatherObj.dt * 1000);
          var sunrise_date = new Date(weatherObj.sunrise * 1000);
          var sunset_date = new Date(weatherObj.sunset * 1000);
          if (!(sunrise_date <= dt_date && dt_date < sunset_date)) {
            weatherObj.pod = "n";
          }
        }


        if (typeof(HTTPresponse.main) !== "undefined") {
          weatherObj.temp = HTTPresponse.main.temp;
          weatherObj.temp_min = HTTPresponse.main.temp_min;
          weatherObj.temp_max = HTTPresponse.main.temp_max;
          weatherObj.pressure = HTTPresponse.main.pressure;
          weatherObj.humidity = HTTPresponse.main.humidity;
        }

        if (typeof(HTTPresponse.weather) !== "undefined") {
          weatherObj.description = HTTPresponse.weather[0].description;
          weatherObj.weather_id = HTTPresponse.weather[0].id;
          weatherObj.customInfo = UtilsService.getCustomWeatherInfo(weatherObj.weather_id, weatherObj.pod);
          if (typeof(weatherObj.customInfo.description) !== "undefined") {
            weatherObj.description = weatherObj.customInfo.description;
          }
        }

        if (typeof(HTTPresponse.clouds) !== "undefined") {
          weatherObj.clouds = HTTPresponse.clouds["1h"] || HTTPresponse.clouds["3h"] || HTTPresponse.clouds["all"] || 0;
        }
        if (typeof(HTTPresponse.rain) !== "undefined") {
          weatherObj.rain = HTTPresponse.rain["1h"] || HTTPresponse.rain["3h"] || HTTPresponse.rain["all"] || null;
        }
        if (typeof(HTTPresponse.snow) !== "undefined") {
          weatherObj.snow = HTTPresponse.snow["1h"] || HTTPresponse.snow["3h"] || HTTPresponse.snow["all"] || null;
        }
        if (typeof(HTTPresponse.wind) !== "undefined") {
          weatherObj.wind_deg = HTTPresponse.wind.deg;
          weatherObj.wind_orient = UtilsService.getOrientationFromDegree(weatherObj.wind_deg);

          weatherObj.wind_gust = UtilsService.getSpeedData(temp_unit_id, speed_unit_id, HTTPresponse.wind.gust);
          weatherObj.wind_speed = UtilsService.getSpeedData(temp_unit_id, speed_unit_id, HTTPresponse.wind.speed);
        }
      }
      if (type_weather === 1) {
        if (typeof(HTTPresponse.city) !== "undefined") {
          weatherObj.city = HTTPresponse.city.name;
          weatherObj.country = HTTPresponse.city.country;

          if (typeof(HTTPresponse.city.coord) !== "undefined") {
            weatherObj.lon = HTTPresponse.city.coord.lon;
            weatherObj.lat = HTTPresponse.city.coord.lat;
          }
        }



        if (typeof(HTTPresponse.list) !== "undefined") {
          weatherObj.list = new Array();
          for (var i in HTTPresponse.list) {
            weatherObj.list[i] = new Object();
            weatherObj.list[i].dt = HTTPresponse.list[i].dt * 1000;
            weatherObj.list[i].description = HTTPresponse.list[i].description;

            if (typeof(HTTPresponse.list[i].clouds) !== "undefined") {
              weatherObj.list[i].clouds = HTTPresponse.list[i].clouds["1h"] || HTTPresponse.list[i].clouds["3h"] || HTTPresponse.list[i].clouds["all"] || 0;
            }

            if (typeof(HTTPresponse.list[i].main) !== "undefined") {
              weatherObj.list[i].temp = HTTPresponse.list[i].main.temp;
              weatherObj.list[i].temp_min = HTTPresponse.list[i].main.temp_min;
              weatherObj.list[i].temp_max = HTTPresponse.list[i].main.temp_max;
              weatherObj.list[i].pressure = HTTPresponse.list[i].main.pressure;
              weatherObj.list[i].humidity = HTTPresponse.list[i].main.humidity;
            }

            if (typeof(HTTPresponse.list[i].sys) !== "undefined") {
              weatherObj.list[i].pod = HTTPresponse.list[i].sys.pod || "u";
            }

            if (typeof(HTTPresponse.list[i].weather) !== "undefined") {
              weatherObj.list[i].description = HTTPresponse.list[i].weather[0].description;
              weatherObj.list[i].weather_id = HTTPresponse.list[i].weather[0].id;
              weatherObj.list[i].customInfo = UtilsService.getCustomWeatherInfo(weatherObj.list[i].weather_id, weatherObj.list[i].pod);

              if (typeof(weatherObj.list[i].customInfo.description) !== "undefined") {
                weatherObj.list[i].description = weatherObj.list[i].customInfo.description;
              }
            }

            if (typeof(HTTPresponse.list[i].rain) !== "undefined") {
              weatherObj.list[i].rain = HTTPresponse.list[i].rain["1h"] || HTTPresponse.list[i].rain["3h"] || HTTPresponse.list[i].rain["all"] || null;
            }
            if (typeof(HTTPresponse.list[i].snow) !== "undefined") {
              weatherObj.list[i].snow = HTTPresponse.list[i].snow["1h"] || HTTPresponse.list[i].snow["3h"] || HTTPresponse.list[i].snow["all"] || null;
            }
            if (typeof(HTTPresponse.list[i].wind) !== "undefined") {
              weatherObj.list[i].wind_deg = HTTPresponse.list[i].wind.deg;
              weatherObj.list[i].wind_orient = UtilsService.getOrientationFromDegree(weatherObj.list[i].wind_deg);

              weatherObj.list[i].wind_speed = UtilsService.getSpeedData(temp_unit_id, speed_unit_id, HTTPresponse.list[i].wind.speed);
              weatherObj.list[i].wind_gust = UtilsService.getSpeedData(temp_unit_id, speed_unit_id, HTTPresponse.list[i].wind.gust);

            }
          }
        }
      }
      if (type_weather === 2) {
        if (typeof(HTTPresponse.city) !== "undefined") {
          weatherObj.city = HTTPresponse.city.name;
          weatherObj.country = HTTPresponse.city.country;
          if (typeof(HTTPresponse.city.coord) !== "undefined") {
            weatherObj.lon = HTTPresponse.city.coord.lon;
            weatherObj.lat = HTTPresponse.city.coord.lat;
          }
        }

        if (typeof(HTTPresponse.list) !== "undefined") {
          weatherObj.list = new Array();
          for (var j in HTTPresponse.list) {
            weatherObj.list[j] = new Object();
            weatherObj.list[j].dt = HTTPresponse.list[j].dt * 1000;
            weatherObj.list[j].description = HTTPresponse.list[j].description;



            if (typeof(HTTPresponse.list[j].temp) !== "undefined") {
              weatherObj.list[j].temp = HTTPresponse.list[j].temp.day;
              weatherObj.list[j].temp_min = HTTPresponse.list[j].temp.min;
              weatherObj.list[j].temp_max = HTTPresponse.list[j].temp.max;
            }

            if (typeof(HTTPresponse.list[j].sys) !== "undefined") {
              weatherObj.list[j].pod = "d";
            }

            if (typeof(HTTPresponse.list[j].weather) !== "undefined") {
              weatherObj.list[j].description = HTTPresponse.list[j].weather[0].description;
              weatherObj.list[j].weather_id = HTTPresponse.list[j].weather[0].id;
              weatherObj.list[j].customInfo = UtilsService.getCustomWeatherInfo(weatherObj.list[j].weather_id, weatherObj.list[j].pod);

              if (typeof(weatherObj.list[j].customInfo.description) !== "undefined") {
                weatherObj.list[j].description = weatherObj.list[j].customInfo.description;
              }

            }
            weatherObj.list[j].clouds = HTTPresponse.list[j].clouds;
            weatherObj.list[j].pressure = HTTPresponse.list[j].pressure;
            weatherObj.list[j].humidity = HTTPresponse.list[j].humidity;
            weatherObj.list[j].rain = HTTPresponse.list[j].rain;
            weatherObj.list[j].snow = HTTPresponse.list[j].snow;
            weatherObj.list[j].wind_deg = HTTPresponse.list[j].deg;
            weatherObj.list[j].wind_orient = UtilsService.getOrientationFromDegree(weatherObj.list[j].wind_deg);

            weatherObj.list[j].wind_gust = UtilsService.getSpeedData(speed_unit_id, HTTPresponse.list[j].gust);
            weatherObj.list[j].wind_speed = UtilsService.getSpeedData(speed_unit_id, HTTPresponse.list[j].wind_speed);
          }
        }
      }
      console.log(weatherObj);
      return weatherObj;
    },
    emitCurrentWeatherData: function() {
      this.getCurrentWeather().then(function(response) {
          var weatherObj = this.formatWeatherData(response.data, 0);
          this.$emit('currentWeatherData', weatherObj);
        }.bind(this),
        function(response) {
          var weatherObj = new Object();
          weatherObj.cod = 500;
          this.$emit('currentWeatherData', weatherObj);
        }.bind(this));

    },
    emitHourlyWeatherData: function() {
      this.getHourlyForecastWeather().then(function(response) {
          var weatherObj = this.formatWeatherData(response.data, 1);
          this.$emit('hourlyWeatherData', weatherObj);

        }.bind(this),
        function(response) {
          var weatherObj = new Object();
          weatherObj.cod = 500;
          this.$emit('hourlyWeatherData', weatherObj);

        }.bind(this));

    },
    emitDailyWeatherData: function() {
      this.getDailyForecastWeather().then(function(response) {
          var weatherObj = this.formatWeatherData(response.data, 2);
          this.$emit('dailyWeatherData', weatherObj);
        }.bind(this),
        function(response) {
          var weatherObj = new Object();
          weatherObj.cod = 500;
          this.$emit('dailyWeatherData', weatherObj);
        }.bind(this));

    }
  },
  created: function() {

    this.$on('emitCurrentWeatherData', function(dataEvent) {
      this.emitCurrentWeatherData();
    }.bind(this));

    this.$on('emitHourlyWeatherData', function(dataEvent) {
      this.emitHourlyWeatherData();
    }.bind(this));

    this.$on('emitDailyWeatherData', function(dataEvent) {
      this.emitDailyWeatherData();
    }.bind(this));

  }
});
