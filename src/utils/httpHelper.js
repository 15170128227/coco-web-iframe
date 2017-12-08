/**
 * Created by Administrator on 2017/11/24.
 */
import Vue from 'vue'
// 测试环境api请求地址
const rootUrl1 = 'http://www.test.cocosurprise.com'
const rootUrl2 = 'http://open-center.test.cocosurprise.com'
// const rootUrl3 = 'http://192.168.1.48:8007'

const api = {
  HOME: {},
  // 文档中心
  DOCUMENT: {
    // 文档中心
    POST_API_APIDETAIL: rootUrl1 + '/tsh-api/api/apidetail'
  },
  // 登录
  LOGIN: {
    POST_LOGINUSER: rootUrl1 + '/tsh-mg/user/loginByUserPassword',
    POST_JUMPLOGIN: rootUrl1 + '/tsh-mg/login'
  },
  RETRIEVEPSW: {
    // 找回密码
    POST_MODIFYPWDBYMOBFROMPAGE: rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByMobFormPage'
  }
}
Vue.prototype.$api = api
