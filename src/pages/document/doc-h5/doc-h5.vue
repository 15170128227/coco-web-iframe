<!--文档中心—H5-->
<template>
  <div class="docH5-container">
    <div class="docH5-column cow_col_6">
      <ul class="docH5-column-left" v-if="columnType">
        <li v-for="(item, index) in columnType" :class="'column-' + index"><router-link to=""> {{item.title}} </router-link></li>
      </ul>
    </div>
    <div class="docH5-content cow_col_18">内容区</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'docH5',
    data () {
      return {
        columnType: [{
            'title': '入驻指南',
            'h5Id': '1'
          },
          {
            'title': '生成免登陆url',
            'h5Id': '2'
          },
          {
            'title': '用户积分扣除接口',
            'h5Id': '3'
          },
          {
            'title': '订单兑换成功/失败消息的接收接口',
            'h5Id': '4'
          },
          {
            'title': '签名规则',
            'h5Id': '5'
          }]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/stylusFn.styl'
  /* docH5-container start */
  .docH5-container
    /* docH5-column start*/
    .docH5-column
      background-color $Bg32
    /* docH5-column end */
      /* docH5-column-left start */
      .docH5-column-left
        color $clrfff
        cursor pointer
        li
          padding 13px 0
          a
            display block
      /* docH5-column-left end */
    /* docH5-content start */
    .docH5-content
      background-color $BgF2
    /* docH5-content end */
  /* docH5-container end */
</style>
