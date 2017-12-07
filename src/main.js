// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import banner from './components/banner/banner.vue'
import Common from './utils/common.js' // 公共函数组件注册
import './utils/httpHelper'
import './utils/util'
import api from './config/dev'
require('swiper/dist/css/swiper.css')

Vue.config.productionTip = false
Vue.use(Common) // 公共函数 $common
Vue.use(VueAwesomeSwiper)
Vue.component('coco-banner', banner)
Vue.prototype.interface = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
