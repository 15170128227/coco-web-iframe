<!-- 顶部导航组件 -->
<template>
  <header class="head-contain" id="head-contain">
    <div class="head-nav" :class="searchBarFixed == true ? 'isFixed' :''">
      <div class="w_960">
        <span class="logo"><router-link :to="navList[0].localHref"><img src="/static/images/logo.png" alt="logo"></router-link></span>
        <nav class="header-list">
          <li v-for="(item, index) in navList" :key="index">
            <router-link :to="item.localHref">{{ item.text }}</router-link>
          </li>
        </nav>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'head',
    props: ['currentIndex'],
    data() {
      return {
        searchBarFixed: false,
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
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//        let offsetTop = document.querySelector('#head-contain').offsetTop
        if (scrollTop > 450) {
          this.searchBarFixed = true
        } else {
          this.searchBarFixed = false
        }
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .isFixed
    position fixed
    height 70px
    line-height 70px
    background-color #FFF
    width 100%
    top 0
    z-index 999
    box-shadow 0 0 11px rgba(0,0,0,.22)
    transition ease-in .6s
  .head-contain
    height 70px
    line-height 70px
    position relative
    overflow hidden
    .head-nav
      height 70px
      background-color #ffffff
      /*transition-duration .2s
      transition visibility .2s ease-in-out*/
      .logo
        display block
        float left
        text-align center
        height 70px
        img
          height auto
          width 85px
      .header-list
        float right
        li
         float left
         list-style none
         width 126px
         margin-left 1px
         &:last-child
          a
            height 34px;
            width 52px
            line-height 34px
            border 1px solid rgb(73, 76, 84)
            border-radius 2px
            background-color rgb(254,254,254) !important
            color rgb(73,76,84) !important
            margin 17px auto
            float right
          .router-link-active
            background-color rgb(233,74,67) !important
            color rgb(254,254,254) !important
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
          &:hover
            background-color rgb(233, 74, 67)
            color rgb(254, 254, 254)
        .router-link-active
          background-color rgb(233, 74, 67)
          color rgb(254, 254, 254)
</style>
