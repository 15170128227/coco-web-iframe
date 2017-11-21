<!-- 顶部导航组件 -->
<template>
  <header class="head-contain">
    <span class="logo"><router-link :to="navList[0].localHref"><img src="../../assets/images/logo.png" alt="logo"></router-link></span>
    <nav class="header-list">
      <li v-for="(item, index) in navList" :key="index">
        <router-link :to="item.localHref">{{ item.text }}</router-link>
      </li>
    </nav>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'head',
    props: ['currentIndex'],
    data() {
      return {
        navList: [{
            'localHref': '/home',
            'text': '首页'
          },
          {
            'localHref': '/aboutUs',
            'text': '关于我们'
          },
          {
            'localHref': '/contactUs',
            'text': '联系我们'
          },
          {
            'localHref': '/login',
            'text': '登录'
          }
        ],
        activeIndex: 0
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
   .head-contain
    height 70px
    width 960px
    margin: 0 auto;
    background-color #ffffff
    .logo
      display block
      float left
      text-align center
      height: 70px;
      img
        height auto
        width 65px
        margin-top 20px
    .header-list
      float right 
      li
       float left
       list-style none
       width: 126px;
       &:last-child
        a
          height 34px;
          width 52px
          line-height 34px
          border 1px solid rgb(73, 76, 84)
          border-radius 2px
          background-color #ffffff !important
          color rgb(73,76,84) !important
          margin 17px auto
          float: right
        .router-link-active
          background-color red !important
          color #ffffff !important
          border none 
       a
        color rgb(73,76,84)
        text-decoration none
        height 70px
        line-height 70px
        font-size 14px
        width 126px
        text-align center
        display block
      .router-link-active
        background-color rgb(233, 74, 67)
        color rgb(254, 254, 254)
</style>
