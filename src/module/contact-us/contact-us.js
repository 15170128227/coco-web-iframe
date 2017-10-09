/**
 * Created by Administrator on 2017/10/9.
 */
import Vue from 'vue'
import App from './App'
import Header from '../../components/head'

Vue.component('vue-head', Header)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
