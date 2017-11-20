<!-- 顶部导航组件 -->
<template>
  <header class="header">
    <router-link to="/">首页</router-link>
    <router-link to="/aboutUs">关于我们</router-link>
    <router-link to="/contactUs">联系我们</router-link>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'header',
    props: ['curPage'],
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>

</style>
