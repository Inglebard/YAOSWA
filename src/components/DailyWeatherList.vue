<template>
  <div class="weather_data_wrapper" v-if="dailyWeather">
    <dailyweatheritem
    v-bind:index="index"
    v-bind:weather="weather"
    v-bind:dailyWeather="dailyWeather"
    v-bind:imgsrcoverlay="imgsrcoverlay"
    v-bind:lazyLoadCache="lazyLoadCache"
    v-for="(weather, index) in dailyWeather.list"></dailyweatheritem>
  </div>
</template>

<script>
import DailyWeatherItem from '@/components/DailyWeatherItem.vue';

export default {
  name: 'dailyweatherlist',
  components: {
    'dailyweatheritem': DailyWeatherItem,
  },
  props:[
    'dailyWeather',
    'imgsrcoverlay',
    'lazyLoadCache'
  ],
  data: function() {
    return {
    };
  },
  methods: {
  },
  beforeMount: function() {
  }
}
</script>

</style>
