<!-- 首页 -->
<!--
  ecological-map: em
  focus-director:fd
  cost-access：ca
  user-experience：ue
  cooperation-press:cp
-->
<template>
  <div class="home">
    <coco-banner :bannerData="bannerData"></coco-banner>
    <div class="content">
      <!-- 生态图 -->
      <div class="em w_960">
        <img src="/static/images/ecological-map.png" alt="img" class="titileImg">
        <div class="em-list">
          <div class="eml-list" v-for="(item, index) in emJson" :key="item.id">
            <span class="emll-img" @mouseover="overFn($event, index)" @mouseout="outFn($event, index)">
              <img :src="item.urlImg" class="emmlli-pingpai">
            </span>
            <span class="emll-desc">{{ item.text }}</span>
            <span class="emll-line"></span>
          </div>
        </div>
      </div>
      <!-- 专注成长 -->
      <div class="fd">
        <div class="w_960">
          <img src="/static/images/focus-director.png" alt="img" class="titileImg">
          <ul class="fd-list">
            <li class="fdl-img" v-for="item in fdJson" :key="item.id">
              <img :src="item.urlImg" alt="fd">
              <div class="fd-content">
                <span class="fdc-title">{{ item.title }}</span>
                <span class="fdc-desc">{{ item.text }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 零成本接入 -->
      <div class="ca w_960">
        <img src="/static/images/cost-access.png" alt="img" class="titileImg">
        <ul class="ca-list">
          <li class="cal-list" v-for="(item, index) in caJson" :key="item.id" @mouseover="showIn(index)" @mouseout="showOut(index)">
            <img :src="item.urlImg" alt="fd">
            <ul class="call-desc" :class="{active: index === listIndex}">
              <li class="calld-content" v-for="itemL in item.text" :key="itemL.id">{{ itemL.desc }}</li>
            </ul>
            <span class="call-title">{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <!-- 无损用户体验 -->
      <div class="ue">
        <div class="ue-div">
          <img src="/static/images/user-experience.png" alt="img" class="titileImg">
          <ue-banner :ueData="ueData"></ue-banner>
        </div>
      </div>
      <!-- 合作流程 -->
      <div class="cp w_960">
        <img src="/static/images/cooperation-press.png" alt="img" class="titileImg">
        <ul class="cp-list">
          <li v-for="item in cpJson" :key="item.id" class="cpl-list">
            <div class="cpll-left">
              <span class="cpll-img">
                    <img :src="item.urlImg" alt="cp">
                </span>
              <span class="cpll-text">{{ item.text }}</span>
            </div>
            <span class="cpll-right"></span>
          </li>
        </ul>
        <div class="cp-link">
          <router-link :to="{name: 'document', params: {docTypeId: '1'}}">研发接入文档</router-link>
        </div>
      </div>
    </div>
    <coco-footer></coco-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import cocoFooter from '../../components/footer/footer.vue'
  import ueBanner from '../../components/user-experience/ue-banner.vue'
  export default {
    name: 'home',
    components: {
      ueBanner,
      cocoFooter
    },
    data() {
      return {
        listIndex: -1,
        footer: '1',
        docTypeId: window.sessionStorage.setItem('docTypeId', '1'),
        bannerData: {
          isSwiper: true,
          info: [{
              'imgUrl': '/static/images/index.jpg',
              'content': {
                imgUrl: '/static/images/logoWhite.png',
                textDescBg: '国内首家场景电商解决方案提供商',
                textDescSm: '开启自媒体/APP内容电商变现时代/让流量更值钱'
              }
            }
            /* {
              'imgUrl': '/static/images/aboutUs.jpg',
              'content': {
                imgUrl: '',
                textDescBg: '',
                textDescSm: ''
              }
            },
            {
              'imgUrl': '/static/images/contactUs.jpg',
              'content': {
                imgUrl: '',
                textDescBg: '',
                textDescSm: ''
              }
            } */
          ]
        },
        // 标题数据
        titleJson: [
          '/static/images/ecological-map.png',
          '/static/images/focus-director.png',
          '/static/images/cost-access.png',
          '/static/images/user-experience.png',
          '/static/images/cooperation-press.png'
        ],
        // 生态图数据
        emJson: [{
            urlImg: '/static/images/brand-r.png',
            text: '品牌资源'
          },
          {
            urlImg: '/static/images/ecology_logo.png',
            text: '可可奇货'
          },
          {
            urlImg: '/static/images/media-r.png',
            text: '自媒体'
          }
        ],
        // 专注成长数据
        fdJson: [{
            urlImg: '/static/images/fd-list1.png',
            title: '新零售整体方案',
            text: '符合自媒体的新型电商变现方案整体运营、技术、供应链、客服体系支持无损用户体验式解决方案'
          },
          {
            urlImg: '/static/images/fd-list2.png',
            title: '新营销运营支持',
            text: '去品牌化奇货运营策略，区别于价格战的内容导向策略，IP+品牌联合策略'
          },
          {
            urlImg: '/static/images/fd-list3.png',
            title: '新收益高额佣金',
            text: '零对接成本，内容化运营，高转化率，持续性营收、其他增值服务'
          }
        ],
        // 零成本接入数据
        caJson: [{
            urlImg: '/static/images/ca-list1.png',
            title: '商城集成系统',
            text: [{
                desc: '+ 内容式H5商城'
              },
              {
                desc: '+ 自定义适合主体风格编辑'
              },
              {
                desc: '+ 详细后台数据分析'
              }
            ]
          },
          {
            urlImg: '/static/images/ca-list2.png',
            title: '运营解决方案',
            text: [{
                desc: '+ 专业场景及用户行为分析'
              },
              {
                desc: '+ 写手对商品趣味内容包装、无损用户体验'
              },
              {
                desc: '+ 定制化联合会营销方案'
              }
            ]
          },
          {
            urlImg: '/static/images/ca-list3.png',
            title: '供应链解决方案',
            text: [{
                desc: '+ 专业买手团队支持'
              },
              {
                desc: '+ 奇货非常规商品物流、ERP专业系统支持'
              },
              {
                desc: '+ 部分全网独家品牌资源'
              }
            ]
          },
          {
            urlImg: '/static/images/ca-list4.png',
            title: '客户服务',
            text: [{
                desc: ''
              },
              {
                desc: '+ 专业售后客服团队'
              },
              {
                desc: ''
              }
            ]
          },
          {
            urlImg: '/static/images/ca-list5.png',
            title: '数据AI系统',
            text: [{
                desc: '+ AI数据预测，适应场景奇货'
              },
              {
                desc: '+ 用户立体分析、更清晰了解消费喜好'
              },
              {
                desc: ''
              }
            ]
          }
        ],
        // 无损用户体验数据
        ueData: [{
            urlImg: '/static/images/ueImg.png',
            title: '· 产品结构',
            text: '重内容轻交易结构 、迎合用户浏览习惯、延长用户停留时间 、提高用户粘性'
          },
          {
            urlImg: '/static/images/proImg.jpg',
            title: '· 产品介绍',
            text: '重内容轻交易结构 、迎合用户浏览'
          },
          {
            urlImg: '/static/images/guideImg.jpg',
            title: '· KOL式导购',
            text: '让商品具备场景、通过软性内容包装、高效激发用户购买欲望'
          }
        ],
        // 合作流程数据
        cpJson: [{
            urlImg: '/static/images/cp-list1.png',
            text: '联系商务经理'
          },
          {
            urlImg: '/static/images/cp-list2.png',
            text: '授权后台账号'
          },
          {
            urlImg: '/static/images/cp-list3.png',
            text: '技术接入'
          },
          {
            urlImg: '/static/images/cp-list4.png',
            text: '开始运营'
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
      overFn (e, index) {
        if (index === 0) {
          this.emJson[0].urlImg = '/static/images/brand-w.png'
          document.querySelectorAll('.emll-img')[0].classList.add('imgActive')
          document.querySelectorAll('.emll-line')[0].classList.add('lineActive')
        } else if (index === 1) {
          this.emJson[1].urlImg = '/static/images/logoWhite.png'
          document.querySelectorAll('.emll-img')[1].classList.add('imgActive')
          document.querySelectorAll('.emll-line')[1].classList.add('lineActive')
        } else if (index === 2) {
          this.emJson[2].urlImg = '/static/images/media-w.png'
          document.querySelectorAll('.emll-img')[2].classList.add('imgActive')
          document.querySelectorAll('.emll-line')[2].classList.add('lineActive')
        }
      },
      outFn (e, index) {
        if (index === 0) {
          this.emJson[0].urlImg = '/static/images/brand-r.png'
          document.querySelectorAll('.emll-img')[0].classList.remove('imgActive')
          document.querySelectorAll('.emll-line')[0].classList.remove('lineActive')
        } else if (index === 1) {
          this.emJson[1].urlImg = '/static/images/ecology_logo.png'
          document.querySelectorAll('.emll-img')[1].classList.remove('imgActive')
          document.querySelectorAll('.emll-line')[1].classList.remove('lineActive')
        } else if (index === 2) {
          this.emJson[2].urlImg = '/static/images/media-r.png'
          document.querySelectorAll('.emll-img')[2].classList.remove('imgActive')
          document.querySelectorAll('.emll-line')[2].classList.remove('lineActive')
        }
      },
      showIn(index) {
        this.listIndex = index
      },
      showOut() {
        this.listIndex = -1
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $colorTitleColor = rgb(233,74,67)
  $width = 960px
  .home .content
    width 100%
    margin 0 auto
    text-align center
    .em
      padding 90px 0 102px 0
      overflow hidden
      .eml-list
        width 320px
        float left
        margin-top 88px
        &:nth-child(2)
          .emll-img
             // background-color $colorTitleColor
            img
              width 95px
              height 36px
        .emll-desc
          font-size 22px
          color $colorTitleColor
        .emll-line
          width 32px
          height 3px
          display inline-block
          background-color rgb(245, 245, 245)
        .lineActive
          width 32px
          height 3px
          display inline-block
          background-color rgb(223, 74, 67)
        .emll-img
          display block
          margin: 0 auto
          height 130px
          width 130px
          border-radius 130px
          position relative
          transition .2s
          background-color rgb(245, 245, 245)
          img
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            margin: auto
        .imgActive
          margin: 0 auto
          background-color $colorTitleColor
          transition all .3s ease
        .emmll-logo
          background-color $colorTitleColor
        .emll-desc
          margin-top 34px
          display block
    .fd
      overflow hidden
      background-color #f6f6f6
      .fd-width
        width $width
        margin 0 auto
      .fd-list
        .fdl-img
          float left
          margin-right 24px
          margin-bottom 115px
          position relative
          .fd-content
            position absolute
            text-align center
            width 304px
            top 0
            margin-top 250px
            .fdc-title
              font-size 20px
              color $colorTitleColor
              display block
              padding 0 0 22px 0;
            .fdc-desc
              font-size 14px
              padding 0 23px
              color rgb(102, 102, 102)
              display block
              text-align left
          &:last-child
             margin-right 0
          img
            width 304px
      .titileImg
        margin 100px 0 62px 0

    // 零成本接入
    .ca
      padding 97px 0 127px 0
      .titileImg
        margin-bottom 63px
      .ca-list
        .cal-list
          float left
          position relative
          margin-right 5px
          .active
            display block !important
          &:last-child
            margin-right 0
          .call-title
            position absolute
            bottom 0
            width 100%
            left 0
            height 108px
            line-height 108px
            font-size 20px
            color rgb(255,254, 254)
            background rgba(3, 17,33, 0.7)
            display block
            z-index 1
          .call-desc
            display none
            position absolute
            top 0
            height 100%
            width 100%
            background rgba(223,74,67,0.8)
            .calld-content
              &:first-child
                padding-top 65px
              padding 0 20px
              font-size 12px
              line-height: 20px;
              color rgb(255,254,254)
              padding-bottom 20px
              text-align left

    // 无损用户体验
    .ue
      overflow: hidden;
      background-color: #f6f6f6;
      .ue-div
        margin 0 auto
        width 1060px
        padding 98px 0
        font-family Microsoft YaHei
        .titileImg
          margin-bottom 64px
    // 合作流程
    .cp
      padding 100px 0
      .titileImg
        margin-bottom 66px
      .cp-list
        width 100%
        display flex
        justify-content space-between
        overflow hidden
        // text-align left
        .cpl-list
          position relative
          .cpll-left
            .cpll-text
              margin-top 44px
              font-size 18px
              color rgb(51,51,51)
              display block
          .cpll-right
            background url('/static/images/arrow-right.png')
            height 25px
            width 25px
            display block
            position absolute
            top 40px
            right: -105px;
          .cpll-img
            background-color rgb(233, 74, 67)
            height 100px
            width 100px
            border-radius 100px
            display block
            position relative
            img
              position absolute
              top 0
              bottom 0
              left 0
              right 0
              margin auto
      .cp-link
        margin-top 99px
        a
          background-color rgb(233,74,67);
          padding 20px 40px
          color #ffffff
          font-size 18px
          border-radius 5px
          text-decoration none
        &:hover
          opacity 0.8
</style>
