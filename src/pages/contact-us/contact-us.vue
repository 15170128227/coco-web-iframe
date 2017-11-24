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
        <img src="/src/assets/images/cbc-title2.png" alt="bc">
      </div>
      <div class="bc-content">
        <img src="/src/assets/images/cbc-code.png" alt="bc">
        <img src="/src/assets/images/cbc-consult.png" alt="bc">
      </div>
    </div>
    <div class="ca">
      <div class="w_960">
        <div class="ca-title">
          <img src="/src/assets/images/cbc-title1.png" alt="ca">
        </div>
        <div class="ca-content">
          <div class="cac-left">
            <h4 class="cacl-title">深圳市场景零售科技有限公司</h4>
            <p class="cacl-list">
              <img src="/src/assets/images/cbc-address.png" alt="ca" class="cacl-img">
              <span class="cacl-text">广东省深圳市南山区科苑路科兴科学园A4栋806（地铁罗宝线深大 站C出口)</span>
            </p>
            <p class="cacl-list">
              <img src="/src/assets/images/cbc-tel.png" alt="ca" class="cacl-img">
              <span class="cacl-text">0755-26920691</span>
            </p>
            <p class="cacl-list">
              <img src="/src/assets/images/cbc-email.png" alt="ca" class="cacl-img">
              <span class="cacl-text">hejinfeng@cocosurprise.com</span>
            </p>
          </div>
          <div class="cac-right">
            <img src="/src/assets/images/cbc-map.png" alt="ca">
          </div>
        </div>
      </div>
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
            'imgUrl': '/src/assets/images/contactUs.jpg',
            'content': {
              textDescBg: '联系我们',
              textDescSm: '-Contact CoCo-'
            }
          }
        }
      }
    },
    created() {
      // this.axios.post('/tsh-api/api/apidetail', {
      //   id: '68'
      // }).then(function (response) {
      //   console.log(response)
      // }).catch(function (error) {
      //   console.log(error)
      // })
      this.axios({
          method: 'post',
          url: '/tsh-api/api/apidetail',
          data: {
            id: '48'
          }
        }).then(function(response) {
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error)
        })
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
      .bc-content img
        height 255px
        width 254px
        &:first-child
          margin-right 252px
    .ca
      width 100%
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
