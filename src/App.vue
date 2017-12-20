<template>
  <div id="app">
    <coco-head></coco-head>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import cocoHead from './components/header/header'
export default {
  name: 'app',
  components: {
    cocoHead
  },
  data () {
    return {
      href: ''
    }
  },
  // 路由变更时监测
   watch: {
    /* '$route'(to, from) {
      console.log('route', to)// 此处不要使用箭头函数
    } */
  },
  created () {
    let href = window.location.href
    if (href) {
      let res = href.split('/')[3]
      if (res.indexOf('login') >= 0) {
        this.href = window.location.href
        return href
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'assets/css/stylusFn.styl'
  @import 'assets/css/reset.styl'
  @import 'assets/css/base.styl'
  #app
    .isDisplay
      display none
    table
      width 100% !important
      text-align center
      tbody
        tr
          td
            padding 10px
</style>
