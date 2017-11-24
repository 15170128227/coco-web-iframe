<!--文档中心—H5-->
<template>
  <div class="docH5-container">
    <div class="docH5-column cow_col_6">
      <ul class="docH5-column-left" v-if="columnType">
        <li v-for="(item, index) in columnType" :class="'column-' + index" @click="docH5ListType($event)">
          <router-link :to="'document?docH5id=' + item.h5Id" :data-id="item.h5Id"> {{item.title}} </router-link>
        </li>
      </ul>
    </div>
    <div class="docH5-content cow_col_18">
      <div class=""></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'docH5',
    data () {
      return {
        currentH5Id: '',
        columnType: [{
            'title': '入驻指南',
            'h5Id': '48'
          },
          {
            'title': '生成免登陆url',
            'h5Id': '49'
          },
          {
            'title': '用户积分扣除接口',
            'h5Id': '50'
          },
          {
            'title': '订单兑换成功/失败消息的接收接口',
            'h5Id': '51'
          },
          {
            'title': '签名规则',
            'h5Id': '52'
          },
          {
            'title': '售后订单通知接口',
            'h5Id': '71'
          },
          {
            'title': '获取内页直达链接接口',
            'h5Id': '72'
          },
          {
            'title': '收货地址同步接口',
            'h5Id': '73'
          }]
      }
    },
    methods: {
      // 当前选择切换的文档栏目类型
      docH5ListType (e) {
        this.currentH5Id = e.target.getAttribute('data-id')
        console.log(this.$api)
        this.queryDocH5list(this.currentH5Id)
        console.log(e.target.getAttribute('data-id'))
      },
      // 获取H5文档
      queryDocH5list (currentH5Id) {
        this.$http.post(this.$api.DOCUMENT.POST_API_APIDETAIL, {
          'id': currentH5Id
        }).then(response => {
          console.log(response)
          let res = response.body
          if (res.code === '200') {
           console.log(res)
          }
        })
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
          a
            padding 13px 0
            display block
      /* docH5-column-left end */
    /* docH5-content start */
    .docH5-content
      background-color $BgF2
    /* docH5-content end */
  /* docH5-container end */
</style>
