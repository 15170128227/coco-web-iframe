<template>
  <div id="app">
    <coco-head></coco-head>
    <router-view/>
    <vue-footer></vue-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import cocoHead from './components/header/header'
import VueFooter from './components/footer/footer.vue'
export default {
  name: 'app',
  components: {
    cocoHead, VueFooter
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'assets/css/reset.styl'
  @import 'assets/css/base.styl'
  @import 'assets/css/stylusFn.styl'
 /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px
  }*/
</style>
