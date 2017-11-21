<!-- 顶部导航组件 -->
<template>
  <div v-if="bannerData.isSwiper">
    <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
      <!-- slides -->
      <swiper-slide v-for="item in bannerData.info" :key="item.id">
        <img :src="item.imgUrl">
        <div class="banner-text">
          <img class="b-img" :src="item.content.imgUrl">
          <p>
            <span class="b-descBg">{{ item.content.textDescBg }}</span>
          </p>
          <p>
            <span class="b-descSm">{{ item.content.textDescSm }}</span>
          </p>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
              <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
  <div v-else class="otherBanner">
    <img :src="bannerData.info.imgUrl">
    <div class="o-text">
      <p class="o-b-descBg">{{ bannerData.info.content.textDescBg }}</p>
      <p class="o-b-descSm">{{ bannerData.info.content.textDescSm }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  export default {
    props: ['bannerData'],
    name: 'header',
    data() {
      return {
        swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          loop: true,
          pagination: '.swiper-pagination',
          onSlideChangeEnd(swiper) {
            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../node_modules/swiper/dist/css/swiper.min.css'
  .my-swiper 
    width 100%
    height 484px
    .swiper-slide 
      text-align center
      font-size 38px
      font-weight 700
      background-color #eee
      display flex
      justify-content center
      align-items center
      height  484px
      img
        width 100%
        max-height 484px
        overflow hidden
      .banner-text
        position absolute
        top 0
        width 100%
        height 484px
        background rgba(0,0,0, 0.3)
        .b-img
          width 122px
          margin-top 108px
          margin-bottom 28px
        .b-descBg
          padding  24px 0 22px 0
          border-top 1px solid rgb(255,255,255)
          border-bottom 1px solid rgb(255,255,255)
          color rgb(255,255,255)
          font-size 50px
          margin-bottom 26px
          font-weight normal
          display inline-block
         .b-descSm
          color rgb(255,255,255)
          font-size 25px
          font-weight normal
          display inline-block
    .swiper-pagination 
      > .swiper-pagination-bullet
        background-color red
  .otherBanner
    width 100%
    height 484px
    text-align center
    position relative
    img
      width 100%
      max-height 484px
      overflow hidden
    .o-text
      position absolute
      top 0
      width 100%
      height 484px
      background rgba(0,0,0, 0.3)
      color rgb(255, 255, 255)
      .o-b-descBg
        font-size 50px
        margin-top 180px
      .o-b-descSm
        font-size 25px
</style>
