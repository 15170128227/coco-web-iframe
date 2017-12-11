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
  // 找回密码
  RETRIEVEPSW: {
    POST_MODIFYPWDBYMOBFROMPAGE: protocol + rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByMobFormPage', // 通过手机号验证找回密码
    POST_MODIFYPWDBYUSERNAMEFROMPAGE: protocol + rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByNameFormPage', // 通过用户名验证找回密码
    POST_MODIFYPWDBYEMAILFROMPAGE: protocol + rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByEmailFormPage', // 通过邮箱验证找回密码
    POST_MODIFYPWDBYMOB: protocol + rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByMob', // 通过手机号和用户名找回密码
    POST_MODIFYPWDBYEMAIL: protocol + rootUrl2 + '/tsh-mg/distributionInfo/modifyPwdByEmail' // 通过邮箱找回密码
  }
}
window.sessionStorage.setItem('webApi', JSON.stringify(window.webApi))
