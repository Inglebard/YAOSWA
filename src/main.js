import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import filters from './filters.js'
import LazyLoadDirective from "@/directives/LazyLoadDirective.js";


import 'bootstrap/dist/css/bootstrap.css';
import '@/../public/css/style.css';
import '@/../public/css/checkbox.css';
import '@/../public/lib/font-awesome/4.3.0/css/font-awesome.min.css';




Vue.config.productionTip = false;

Vue.filter('round', filters.round);
Vue.directive("lazyload", LazyLoadDirective);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
