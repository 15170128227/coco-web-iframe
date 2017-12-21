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

// 注册一个全局自定义指令 `v-focus`
// const pubImgPath = '//static-sz-cocosurprise.oss-cn-shenzhen.aliyuncs.com/images/coco-web/'
let pubImgPath = '//static.cocosurprise.com/images/coco-web/'
const imgCacheParams = '?x-oss-process=image/format,webp/interlace,1'
const imgpathFn = function (el) {
  let src = el.getAttribute('src')
  let arr, imgName, params
  if (src.indexOf('?') > -1) {
    arr = src.split('?')
    imgName = arr[0]
    params = arr[1]
  } else {
    imgName = src
  }
  let newSrc = params ? pubImgPath + imgName + imgCacheParams + '/' + params : pubImgPath + imgName + imgCacheParams
  el.setAttribute('src', newSrc)
}
Vue.directive('imgpath', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: imgpathFn
})
