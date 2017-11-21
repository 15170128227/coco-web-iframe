<!-- 底部组件 -->
<template>
  <footer class="footer">
    <div class="w_960 footer-container">
      <div class="footer-left">
        <div class="footer-cocoLogo">
          <img src="../../assets/images/footer_logo.png" alt="cocoLogo"/>
        </div>
        <div class="footer-nav">
          <router-link to="/">网站首页</router-link><span> | </span>
          <router-link to="/">渠道合作</router-link><span> | </span>
          <router-link to="/aboutUs">关于我们</router-link><span> | </span>
          <router-link to="/contactUs">联系我们</router-link>
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
          <p>{{cocoService}}</p>
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
        cocoMail: 'hejinfeng@cocosurprise.com', // coco邮箱
        cocoPhone: '0755-2692-0691', // coco联系方式
        cocoService: '10:00-19:00.工作日' // 客服服务时间
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../assets/css/base.styl'
  /* footer start */
  .footer
    background-color #2C2F3C
    color #fff
    font-size 14px
    .footer-container
      display flex
      padding 80px 0 70px 0
      /* footer-left start */
      .footer-left
        color #000
        flex 2
        .footer-cocoLogo
          width 96px
          height 36px
          img
            width 100%
            height 100%
        .footer-nav
          font-size 14px
          font-weight bold
          padding 37px 0
          text-align left
          a
            color #fff
            text-decoration none
            cursor pointer
            opacity 1
            &:hover
              opacity 0.8
          span
            padding 0 27px
            color #fff
        .footer-copyRight
          margin-bottom 22px
        .footerInfo
          color #fff
          text-align left
          p
            margin 0
            padding 0
      /* footer-left end */
      /* footer-right start */
      .footer-right
        flex 1
        padding-top 132px
        .rightInfo
          color #fff
          font-size 16px
          text-align left
        .coco-phone
          margin-bottom 16px
          p
            font-size 30px
            margin 0
            padding 0
        .coco-service
          font-style normal
          font-size 12px
          p
            margin 0
            padding 0
  /* footer-right start */
  /* footer end */
</style>
