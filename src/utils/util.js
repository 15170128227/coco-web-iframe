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
const pubImgPath = '//static.cocosurprise.com/images/coco-web/'
const jpgImg = '?x-oss-process=image/format,jpg/interlace,1'
const pngImg = '?x-oss-process=image/format,png/interlace,1'
let imgCacheParams, newSrc
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
  if (imgName.indexOf('.png') > -1) {
    if (params && params.indexOf('format=jpg') > -1) {
      params = params.replace('format=jpg', '')
      imgCacheParams = jpgImg
    } else {
      imgCacheParams = pngImg
    }
  } else {
    imgCacheParams = jpgImg
  }
  newSrc = params ? pubImgPath + imgName + imgCacheParams + '/' + params : pubImgPath + imgName + imgCacheParams
  el.setAttribute('src', newSrc)
}
Vue.directive('imgpath', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: imgpathFn
})
