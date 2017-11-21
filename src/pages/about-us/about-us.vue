<!-- 关于我们 -->
<template>
  <div class="my-swiper">
    <coco-banner :bannerData="bannerData"></coco-banner>
     <div style="color:red">
      关于我们
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'about-us',
    data() {
      return {
        bannerData: {
          isSwiper: false,
          info: {
            'imgUrl': '/src/assets/images/aboutUs.jpg',
            'content': {
              textDescBg: '关于我们',
              textDescSm: '-About CoCo-'
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>

