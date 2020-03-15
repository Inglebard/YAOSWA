<template>
    <div class="weather_data_wrapper" v-if="hourlyWeather">
      <hourlyweatheritem
      v-bind:key="index"
      v-bind:index="index"
      v-bind:weather="weather"
      v-bind:hourlyWeather="hourlyWeather"
      v-bind:imgsrcoverlay="imgsrcoverlay"
      v-bind:lazyLoadCache="lazyLoadCache"
      v-for="(weather, index) in hourlyWeather.list"></hourlyweatheritem>
    </div>
</template>

<script>
import HourlyWeatherItem from '@/components/HourlyWeatherItem.vue'

export default {
  name: 'hourlyweatherlist',
  components: {
    'hourlyweatheritem': HourlyWeatherItem
  },
  props: [
    'hourlyWeather',
    'imgsrcoverlay',
    'lazyLoadCache'
  ],
  data: function () {
    return {}
  },
  methods: {
  },
  beforeMount: function () {
  }
}
</script>
