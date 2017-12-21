<!-- 底部组件 -->
<template>
  <footer class="footer">
    <div class="w_960 footer-container">
      <div class="footer-left">
        <div class="footer-cocoLogo">
          <img v-imgpath src="footer_logo.png?resize,w_96" alt="cocoLogo"/>
        </div>
        <div class="footer-nav">
          <ul v-if="cocoNav">
            <li v-for="(item, index) in cocoNav" :key="index" :class="'cocoNav_' + index">
              <router-link :to="item.href">{{ item.text }}</router-link><span> | </span>
            </li>
          </ul>
        </div>
        <div class="footer-copyRight footerInfo">
          <p>{{copyRight}}</p>
          <p>备案号：{{records}}</p>
        </div>
        <div class="footer-companyInfo footerInfo">
          <P>公司地址：{{cocoAddr}}</P>
          <p>邮箱：{{cocoMail}}</p>
        </div>
      </div>
      <div class="footer-right">
        <div class="coco-phone rightInfo">
          联系CoCo：
          <p>{{cocoPhone}}</p>
        </div>
        <div class="coco-service rightInfo">
          客服在线时间：
          <p class="oTime">{{cocoService}}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'footer',
    data () {
      return {
        copyRight: 'CopyRight 深圳市场景零售科技有限公司', // 版权所有
        records: '粤ICP备17073633号-1', // 备案号
        cocoAddr: '深圳市南山区科苑路科兴科学园A4栋806', // coco地址
        cocoMail: 'fuling@cocosurprise.com', // coco邮箱
        cocoPhone: '0755-2692-0691', // coco联系方式
        cocoService: '10:00-19:00，工作日', // 客服服务时间
        cocoNav: [
          {
            'href': '/home',
            'text': '网站首页'
          },
          {
            'href': '/aboutUs',
            'text': '关于我们'
          },
          {
            'href': '/contactUs',
            'text': '联系我们'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../assets/css/stylusFn.styl'
  /* footer start */
  .footer
    background-color $Bg2C2F3C
    color $clrfff
    font-size $fontSizeNormal
    width 100%
    min-width 960px
    /*float left*/
    .footer-container
      display flex
      padding 83px 0 60px 0
      /* footer-left start */
      .footer-left
        color $clr000
        flex 3
        .footer-cocoLogo
          width 96px
          height 36px
          img
            width 100%
            height 100%
        .footer-nav
          font-size $fontSizeNormal
          font-weight bold
          padding 37px 0
          text-align left
          li
            display inline-block
          .cocoNav_2
            span
              color $clr2C2F3C
          a
            font-weight normal
            color $clrfff
            font-size 14px
            opacity 1
            &:hover
              opacity 0.8
          span
            padding 0 27px
            color $clrfff
        .footer-copyRight
          margin-bottom 16px
        .footerInfo
          color $clrfff
          text-align(left)
      /* footer-left end */
      /* footer-right start */
      .footer-right
        flex 1
        padding-top 102px
        .rightInfo
          color #fff
          font-size $fontSize16
          text-align(left)
          .oTime
            padding-top 10px
        .coco-phone
          margin-bottom 6px
          p
            margin-top 7px
            font-size $fontSizeXL
        .coco-service
          font-style normal
          font-size $fontSizeNormal
  /* footer-right start */
  /* footer end */
</style>
