<!-- 联系我们 -->
<template>
  <div class="my-swiper">
    <coco-banner :bannerData="bannerData"></coco-banner>
    <div style="color:red">
      联系我们
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'contact-us',
    data() {
      return {
        bannerData: {
          isSwiper: false,
          info: {
            'imgUrl': '/src/assets/images/test2.png',
            'content': {
              textDescBg: '联系我们',
              textDescSm: '-Contact CoCo-'
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
