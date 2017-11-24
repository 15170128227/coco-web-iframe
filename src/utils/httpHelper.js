/**
 * Created by Administrator on 2017/11/24.
 */
import Vue from 'vue'
// 测试环境api请求地址
// const rootUrl ='http://www.test.cocosurprise.com'
const rootUrl = 'http://www.test.cocosurprise.com'

const api = {
  HOME: {},
  // 文档中心
  DOCUMENT: {
    // H5文档中心
    // API文档中心
    POST_API_APIDETAIL: rootUrl + '/tsh-api/api/apidetail'
  }
}
Vue.prototype.$api = api
