import Vue from 'vue'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    let params = new URLSearchParams()
    Object.keys(config.data).forEach(v => {
      params.append(v, config.data[v])
    })
    config.data = params
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
Vue.prototype.axios = axios
