<!-- 联系我们 -->
<!--
  contact-us:cu
  business-cooperation：bc
  company-address: ca
 -->
<template>
  <div class="cu">
    <coco-banner :bannerData="bannerData"></coco-banner>
    <div class="bc w_960">
      <div class="bc-title">
        <img src="/static/images/cbc-title2.png" alt="bc">
      </div>
      <div class="bc-content">
        <div class="bus-consult" v-for="(item ,index) in business" :key="index" @mouseover="showIn($event, index)" @mouseout="showOut($event, index)">
          <div class="weChatBg" :style="index === 0 ? channelWeChatBg : supplierWeChatBg"></div>
          <div class="inFo">
            <h3>{{item.cooper}}</h3>
            <p class="consult-qq">QQ: {{item.QQ}}<span></span></p>
            <P class="consult-tel">TEL: {{item.TEL}}<span></span></P>
          </div>
          <p class="consult-img"><img :src="item.img" :data-index="index" alt="weChat"></p>
        </div>
      </div>
    </div>
    <div class="ca">
      <div class="w_960">
        <div class="ca-title">
          <img src="/static/images/cbc-title1.png" alt="ca">
        </div>
        <div class="ca-content">
          <div class="cac-left">
            <h4 class="cacl-title">深圳市场景零售科技有限公司</h4>
            <p class="cacl-list">
              <img src="/static/images/cbc-address.png" alt="ca" class="cacl-img">
              <span class="cacl-text">广东省深圳市南山区科苑路科兴科学园A4栋806</span>
            </p>
            <p class="cacl-list">
              <img src="/static/images/cbc-tel.png" alt="ca" class="cacl-img">
              <span class="cacl-text">0755-26920691</span>
            </p>
            <p class="cacl-list">
              <img src="/static/images/cbc-email.png" alt="ca" class="cacl-img">
              <span class="cacl-text">fuling@cocosurprise.com</span>
            </p>
          </div>
          <div class="cac-right">
            <img src="/static/images/cbc-map.png" alt="ca">
          </div>
        </div>
      </div>
    </div>
    <coco-footer></coco-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import cocoFooter from '../../components/footer/footer.vue'
  export default {
    name: 'contact-us',
    components: {
      cocoFooter
    },
    data() {
      return {
        isChat: false,
        listIndex: -1,
        channelWeChatBg: '',
        channelStyle: 'background-image:url("/static/images/channel_consult.png");',
        supplierWeChatBg: '',
        supplierStyle: 'background-image:url("/static/images/supply_consult.png");',
        bannerData: {
          isSwiper: false,
          info: {
            'imgUrl': '/static/images/contactUs.jpg',
            'content': {
              textDescBg: '联系我们',
              textDescSm: '-Contact CoCo-'
            }
          }
        },
        business: [
          {
            'cooper': '渠道咨询',
            'QQ': '401241201',
            'TEL': '17506299226',
            'img': '/static/images/weChat_icon.png'
          },
          {
            'cooper': '供应咨询',
            'QQ': '2582983430',
            'TEL': '13902451291',
            'img': '/static/images/weChat_icon.png'
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
      },
      showIn (e, index) {
        if (index === 0) {
          this.listIndex = index
          this.isChat = true
          this.channelWeChatBg = this.channelStyle
          this.supplierWeChatBg = ''
          // this.supplierWeChatBg = ''
        } else if (index === 1) {
          this.listIndex = index
          this.isChat = true
          this.supplierWeChatBg = this.supplierStyle
          this.channelWeChatBg = ''
          // this.supplierWeChatBg = '/static/images/supply_consult.png'
          // this.channelWeChatBg = ''
        }
      },
      showOut (e, index) {
        if (index === 0) {
          this.listIndex = -1
          this.isChat = false
          this.channelWeChatBg = ''
          this.supplierWeChatBg = ''
        } else if (index === 1) {
          this.listIndex = -1
          this.isChat = false
          this.channelWeChatBg = ''
          this.supplierWeChatBg = ''
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cu
    .bc
      padding 90px 0 97px 0
      text-align center
      .bc-title
        padding-bottom 66px
      .bc-content
        .bus-consult
          position relative
          height 255px
          width 254px
          padding 30px 55px
          border 2px solid #f1f1f1
          display inline-block
          .inFo
            width 140px
            height 140px
            position relative
          .weChatBg
            position absolute
            z-index 2
            top 15px
            width 140px
            height 140px
            text-align center
            transition .3s
            img
             position absolute
          h3
           font-weight bold
           font-size 20px
           padding-top 20px
           color rgb(51, 51, 51)
          .consult-qq
            padding 24px 0 14px 0
            font-size 14px
            color rgb(51, 51, 51)
          .consult-tel
            font-size 14px
            color rgb(51, 51, 51)
          .consult-img
            margin 25px 53px 0 53px
            width 36px
            height 30px
            /* &:hover
              transition .3s ease all */
            img
              display inline-block
              width 100%
              height 100%
        .bus-consult:first-child
          margin-right 252px
    .ca
      width 100%
      min-width 960px
      background-color #f6f6f6
      text-align center
      padding 90px 0 86px 0
      .ca-title
        padding-bottom 62px
      .ca-content
        .cac-left
          float left
          width 550px
          text-align left
          padding-top 85px
          color rgb(51,51,51)
          .cacl-title
            padding-bottom 26px
            font-size 14px
            font-weight bold
            color rgb(51,51,51)
          .cacl-list
            padding-bottom 20px
            font-size 14px
            line-height 20px
            img
              padding-right 10px
        .cac-right
          float right
          width 410px
          img
            width 410px
</style>
