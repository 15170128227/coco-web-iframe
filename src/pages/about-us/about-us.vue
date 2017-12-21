<!-- 关于我们 -->
<!--
aboutUs: ab
company：co
team-group:tg
-->
<template>
  <div class="ab">
    <coco-banner :bannerData="bannerData"></coco-banner>
    <!-- 企业 -->
    <div class="co w_960">
      <div class="co-left">
        <img v-imgpath src="aboutUs-list1.png?resize,h_316" alt="co">
        <img v-imgpath src="aboutUs-list2.png?resize,h_316" alt="co">
      </div>
      <div class="co-right">
        <h2 class="cor-title">
          <img v-imgpath :src="aboutUsData[0].abTitleUrl" alt="co">
        </h2>
        <p class="cor-text" v-html="aboutUsData[0].text">
        </p>
      </div>
    </div>
    <!-- 团队 -->
    <div class="tg">
      <div class="w_960">
        <div class="tg-left">
          <h2 class="tgr-title">
            <img v-imgpath :src="aboutUsData[1].abTitleUrl" alt="tg">
          </h2>
          <p class="tgr-text">
            {{ aboutUsData[1].text }}
          </p>
        </div>
        <div class="tg-right">
          <img v-imgpath src="abt-phone1.png" alt="tg">
          <img v-imgpath src="abt-phone2.png" alt="tg">
        </div>
      </div>
    </div>
    <coco-footer></coco-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import cocoFooter from '../../components/footer/footer.vue'
  export default {
    name: 'about-us',
    components: {
      cocoFooter
    },
    data() {
      return {
        bannerData: {
          isSwiper: false,
          info: {
            'imgUrl': 'aboutUs.jpg',
            'content': {
              textDescBg: '关于我们',
              textDescSm: '-About CoCo-'
            }
          }
        },
        // 关于我们数据
        aboutUsData: [{
            abTitleUrl: 'abc-title.png',
            text: `可可奇货是国内首家场景零售公司，采用S2B模式，为场景流量终端赋能。<br><br>我们拥有全套的SAAS电商系统，
              轻松一键接入。我们抛弃了传统的货架式电商，采用重渲染的思路，拥有有趣有料的交互；我们还拥有智能配置的中台，
              场景终端可自助免费使用智能AI选品工具，轻松配置个性化的前端展示。<br><br>后端供应链以及售后服务均由可可奇货强大的服务团队提供。
              场景流量终端，只需要接入入口，轻松解决用户需求，并获取得可观的盈利收入。<br><br>2017年6月16日可可期货完成种子轮融资，金额数百万人民币，
              投资方荣信股份-梦网荣信、余文胜。`
          },
          {
            abTitleUrl: 'abt-title.png',
            text: `公司创始团队均由超过10年的电商从业经验，来自阿里，苏宁易购，品尚汇，芳草集，小恩爱等知名公司，在单个APP上创造过10秒7万单的场景电商惊人案例。相信我们，就是相信场景商业价值的未来。`
          }
        ]
      }
    },
    created () {
      this.scrollTop()
    },
    methods: {
      // 页面初始化置顶
      scrollTop () {
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../assets/css/stylusFn.styl'
  .ab
    .co
      margin 0 auto
      padding 81px 0 53px 0
      .co-left
        width 410px
        float left
        img
          float left
          height 316px
          &:first-child
            margin-right 25px
      .co-right
        float left
        width 550px
        padding-right 28px
        .cor-title
          padding-top 8px
          padding-bottom 26px
        .cor-text
          font-size 14px
          line-height 20px
          color rgb(51,51,51)
    .tg
      padding 100px 0
      width 100%
      min-width 960px
      background-color #f6f6f6
      .tg-left
        float left
        width 515px
        .tgr-title
          padding 20px 0 30px 0
        .tgr-text
          font-size 14px
          line-height 20px
          color rgb(51,51,51)
      .tg-right
        float left
        width 445px
        text-align right
        img
          &:first-child
            padding-right 60px
</style>

