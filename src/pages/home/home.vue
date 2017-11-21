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
      <div class="em">
        <img src="/src/assets/images/ecological-map.png" alt="img" class="titileImg">
        <div class="em-list">
          <div class="eml-list">
            <span class="emll-img">
                <img src="/src/assets/images/pingpai.png" class="emmlli-pingpai">
              </span>
            <span class="emll-desc">品牌资源</span>
          </div>
          <div class="eml-list">
            <span class="emll-img emmll-logo">
                <img src="/src/assets/images/logoWhite.png" class="emmlli-coco">
              </span>
            <span class="emll-desc">可可奇货</span>
          </div>
          <div class="eml-list">
            <span class="emll-img">
                <img src="/src/assets/images/zimeiti.png" class="emmlli-zimeiti">
              </span>
            <span class="emll-desc">自媒体</span>
          </div>
        </div>
      </div>
      <!-- 专注成长 -->
      <div class="fd">
        <img src="/src/assets/images/focus-director.png" alt="img" class="titileImg">
      </div>
      <!-- 零成本接入 -->
      <div class="ca">
        <img src="/src/assets/images/cost-access.png" alt="img" class="titileImg">
      </div>
      <!-- 无损用户体验 -->
      <div class="ue">
        <img src="/src/assets/images/user-experience.png" alt="img" class="titileImg">
      </div>
      <!-- 合作流程 -->
      <div class="cp">
        <img src="/src/assets/images/cooperation-press.png" alt="img" class="titileImg">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'home',
    data() {
      return {
        bannerData: {
          isSwiper: true,
          info: [{
              'imgUrl': '/src/assets/images/index.jpg',
              'content': {
                imgUrl: '/src/assets/images/logoWhite.png',
                textDescBg: '国内首家场景电商解决方案提供商',
                textDescSm: '开启自媒体/APP内容电商变现时代/让流量更值钱'
              }
            },
            {
              'imgUrl': '/src/assets/images/aboutUs.jpg',
              'content': {
                imgUrl: '/src/assets/images/logoWhite.png',
                textDescBg: 'text2',
                textDescSm: 'text2'
              }
            },
            {
              'imgUrl': '/src/assets/images/contactUs.jpg',
              'content': {
                imgUrl: '/src/assets/images/logoWhite.png',
                textDescBg: 'text3',
                textDescSm: 'text3'
              }
            }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $colorTitleColor = rgb(233,74,67) 
  .home .content
    width 960px
    margin 0 auto
    text-align center
    .em
      padding 90px 0 102px 0
      overflow hidden
      .eml-list
        width 320px
        float left
        margin-top 88px
        .emll-desc
          font-size 22px
          color $colorTitleColor
        .emll-img
          display block
          margin: 0 auto;
          height 130px
          width 130px
          border-radius 130px
          position relative
          background-color rgb(245,245,245)
          img
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
          .emmlli-pingpai
            width 74px
            height 74px
          .emmlli-coco
            width 95px
            height 36px
          .emmlli-zimeiti
            width 74px
            height 74px
        .emmll-logo
          background-color $colorTitleColor
        .emll-desc
          margin-top 34px
          display block
</style>
