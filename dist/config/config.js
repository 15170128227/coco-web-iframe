'use strict'
/**
 * Created by Administrator on 2017/11/24.
 */
// 测试环境api请求地址
// const protocol = 'http:'
var rootUrl1 = 'www.test.cocosurprise.com'
var rootUrl2 = 'open-center.test.cocosurprise.com'
// const rootUrl3 = 'http://192.168.1.48:8007'
var protocol = location.protocol + '//'
window.webApi = {
  HOME: {},
  // 文档中心
  DOCUMENT: {
    // 文档中心
    POST_API_APIDETAIL: protocol + rootUrl1 + '/tsh-api/api/apidetail'
  },
  // 登录
  LOGIN: {
    POST_LOGINUSER: protocol + rootUrl2 + '/tsh-mg/user/loginByUserPassword',
    POST_JUMPLOGIN: protocol + rootUrl1 + '/tsh-mg/login'
  },
  RETRIEVEPSW: {
    // 找回密码
    POST_MODIFYPWDBYMOBFROMPAGE: protocol + rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByMobFormPage'
  }
}
window.sessionStorage.setItem('webApi', JSON.stringify(window.webApi))
