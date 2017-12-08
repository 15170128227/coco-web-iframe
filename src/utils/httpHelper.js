/**
 * Created by Administrator on 2017/11/24.
 */
import Vue from 'vue'
// 测试环境api请求地址
const rootUrl1 = '//www.test.cocosurprise.com'
const rootUrl2 = '//open-center.test.cocosurprise.com'
const rootUrl3 = 'http://192.168.1.48:8007'

const api = {
  HOME: {},
  // 文档中心
  DOCUMENT: {
    POST_API_APIDETAIL: rootUrl1 + '/tsh-api/api/apidetail' // 文档中心--H5或API
  },
  // 登录
  LOGIN: {
    POST_LOGINUSER: rootUrl2 + '/tsh-mg/user/loginByUserPassword', // 校验用户名及密码
    POST_JUMPLOGIN: rootUrl2 + '/tsh-mg/login' // 跳转中台接口
  },
  RETRIEVEPSW: {
    POST_MODIFYPWDBYMOBFROMPAGE: rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByMobFormPage', // 找回密码
    POST_: rootUrl3 + '' // 重置密码
  }
}
Vue.prototype.$api = api
