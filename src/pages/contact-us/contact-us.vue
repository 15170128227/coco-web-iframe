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
        <img v-imgpath src="cbc-title2.png" alt="bc">
      </div>
      <div class="bc-content">
        <div class="bus-consult" v-for="(item ,index) in business" :key="index">
          <!-- <div class="weChatBg" :style="index === 0 ? channelWeChatBg : supplierWeChatBg"></div> -->
          <p class="weChatBg" :class="{'active': item.active}"><img v-imgpath :src="index === 0 ? channelWeChatBg : supplierWeChatBg"></p>
          <div class="inFo">
            <h3>{{item.cooper}}</h3>
            <p class="consult-qq">QQ: {{item.QQ}}<span></span></p>
            <P class="consult-tel">{{item.Email}}<span></span></P>
          </div>
          <p class="consult-img" @mouseover="showIn($event, index)" @mouseout="showOut($event, index)"><img v-imgpath :src="item.img" :data-index="index" alt="weChat"></p>
        </div>
      </div>
    </div>
    <div class="ca">
      <div class="w_960">
        <div class="ca-title">
          <img v-imgpath src="cbc-title1.png" alt="ca">
        </div>
        <div class="ca-content">
          <div class="cac-left">
            <h4 class="cacl-title">深圳市场景零售科技有限公司</h4>
            <p class="cacl-list">
              <img v-imgpath src="cbc-email.png" alt="ca" class="cacl-img">
              <span class="cacl-text">fuling@cocosurprise.com</span>
            </p>
            <p class="cacl-list">
              <img v-imgpath src="cbc-tel.png" alt="ca" class="cacl-img">
              <span class="cacl-text">0755-26920691</span>
            </p>
            <p class="cacl-list">
              <img v-imgpath src="cbc-address.png" alt="ca" class="cacl-img">
              <span class="cacl-text">广东省深圳市南山区科苑路科兴科学园A4栋806</span>
            </p>
          </div>
          <div class="cac-right">
            <img v-imgpath src="cbc-map.png" alt="ca">
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
        channelWeChatBg: 'channel_consult.png', // $imgpath
        // channelStyle: `background-image:url("channel_consult.png");`,
        // channelStyle: `channel_consult.png`,
        supplierWeChatBg: 'supply_consult.png',
        // supplierStyle: 'background-image:url("supply_consult.png");',
        // supplierStyle: 'supply_consult.png',
        bannerData: {
          isSwiper: false,
          info: {
            'imgUrl': 'contactUs.jpg',
            'content': {
              textDescBg: '联系我们',
              textDescSm: '-Contact CoCo-'
            }
          }
        },
        business: [
          {
            active: false,
            'cooper': '渠道咨询',
            'QQ': '401241201',
            // 'TEL': '17506299226',
            'Email': 'denghui@cocosurprise.com',
            'img': 'weChat_icon.png'
          },
          {
            active: false,
            'cooper': '供应咨询',
            'QQ': '2582983430',
            // 'TEL': '13902451291',
            'Email': 'weililing@cocosurprise.com',
            'img': 'weChat_icon.png'
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
        this.business.forEach((o, oIndex) => {
          if (oIndex === index) {
            o.active = true
          } else {
            o.active = false
          }
        })
      },
      showOut (e, index) {
        this.business.forEach((o, oIndex) => {
          o.active = false
        })
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
          padding 30px 15px
          border 2px solid #f1f1f1
          display inline-block
          .inFo
            width 188px
            height 140px
            margin 0 auto
          .weChatBg
            display none
            position absolute
            z-index 2
            top 15px
            left 0
            width 100%
            height 140px
            background-color #fff
            text-align center
            transition .3s
            &.active
              display block
            img
              width 140px
              height 140px
              margin 0 auto
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
            /* &:hover
              transition .3s ease all */
            img
              width 36px
              height 30px
              margin 15px auto
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
