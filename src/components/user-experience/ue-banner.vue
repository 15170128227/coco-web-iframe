
<!-- 顶部导航组件 -->
<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
      <!-- slides -->
      <swiper-slide v-for="item in ueData" :key="item.id">
        <div class="ue">
          <div class="ue-text">
            <h3 class="ut-title">{{ item.title }}</h3>
            <p class="ut-content">{{ item.text }}</p>
          </div>
          <img :src="item.urlImg" class="ue-img">
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  export default {
    props: ['ueData'],
    name: 'user-experience',
    data() {
      return {
        swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          autoplay: 5000,
          // direction: 'vertical',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          // pagination: '.swiper-pagination',
          // paginationClickable: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next'
          // scrollbar: '.swiper-scrollbar',
          // mousewheelControl: true,
          // observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          // debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          // onTransitionStart (swiper) {
          //   console.log(swiper)
          // }
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
    height 220px
    .swiper-button-prev
      background-image url('/static/images/swiper-button-prev.png')
      transform rotate(180deg)
      left 0
      width 25px
      height 28px
    .swiper-button-next
      background-image url('/static/images/swiper-button-prev.png')
      width 25px
      height 28px
      right 0
    .swiper-slide
      text-align center
      display flex
      justify-content center
      align-items center
      height  220px
      overflow hidden
      .ue
        width 960px
        margin 0 auto
        overflow hidden
      .ue-text
        // width 615px
        float left
        margin-top 70px
        .ut-title
          color rgb(233, 74, 67)
          font-size 20px
          text-align left
        .ut-content
          font-size 14px
          color rgb(51, 51, 51)
          text-align left
          margin-top 14px
      .ue-img
        width 400px
        height 220px
        float right
</style>
