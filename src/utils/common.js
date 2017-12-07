/**
 * Created by Administrator on 2017/11/29.
 */
const Common = {
  /*
   * install方法包括两个参数：1.Vue构造函数；2.可选选项对象
   * */
  install: function (Vue, options) {
    let defaultOptions = Object.assign({
      name: '$common',
      commons: null,
      id: 'common'
    }, options)
    let commons = Vue.prototype[defaultOptions.name] = {}
    // 添加class
    commons.addClass = (elem, cls) => {
      if (!this.hasClass(elem, cls)) {
        elem.className = elem.className === '' ? cls : elem.className + ' ' + cls
      }
      // console.log(classNa.match(reg)[0])
    }
    // 移除class
    commons.removeClass = (elems, cls) => {
      let eleAry = null
      if (elems.length === undefined || elems.length === null) {
        eleAry = []
        eleAry.push(elems)
      } else {
        eleAry = elems
      }
      for (let i = 0, len = eleAry.length; i < len; i++) {
        if (!this.hasClass(eleAry[i], cls)) {
          let newClass = '' + eleAry[i].className.replace(/[\t\r\n]/ig, '') + ''
          if (newClass.indexOf('' + cls + '') >= 0) {
            newClass = newClass.replace('' + cls + '', ' ')
          }
          eleAry[i].className = newClass.replace(/^\s+|\s+$/g, '')
        }
      }
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Common)
}

export default Common
