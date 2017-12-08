import Vue from 'vue'
import axios from 'axios'
// import qs from 'qs'

// axios.interceptors.request.use(config => {
//     let str = ''
//     Object.keys(config.data).forEach(key => {
//         str += key + '=' + config.data[key] + '&'
//     })
//     str = str.substring(0, str.lastIndexOf('&'))
//     return Object.assign(config, {data: str})
// }, error => {
//     return Promise.reject(error)
// })
Vue.prototype.axios = axios
