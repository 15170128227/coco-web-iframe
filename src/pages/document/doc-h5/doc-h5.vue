<!--文档中心—H5-->
<template>
  <div class="docH5-container">
    <div class="docH5-column cow_col_5">
      <div class="docH5-column-tab" @click="modifyNav($event)">
        <span :class="[currentDocType === '1' ? 'active' : '']" :data-type="1">API</span>
        <span :class="[currentDocType === '2' ? 'active' : '']" :data-type="2">H5</span>
        <!--<span v-for="(item, index) in docType" :data-type="item.docType">{{item.docType}}</span>-->
      </div>
      <ul class="docH5-column-left cow_col_24" v-if="columnList">
        <li class="cow_col_24" v-for="(item, index) in columnList" :key="index" :class="'column-' + index" @click="docH5ListType($event)">
          <router-link :to="'document?docH5id=' + item.h5Id" :data-id="item.h5Id"> {{item.title}} </router-link>
          <ul class="" v-if="subNav">
            <li v-for="(item, index) in subNav" :key="index" :class="'subNav-' + index">
              <router-link :to="'document?docH5id=' + item.subNavTypeId" :data-id="item.subNavTypeId"> {{item.subNavTitle}} </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<doc-nav></doc-nav>-->
    <div class="docH5-content cow_col_19">
      <div class="docH5-content-chunk" v-html="content"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import docNav from '../doc-nav/doc-nav.vue'
  export default {
    name: 'docH5',
    props: ['docListData'],
    data () {
      return {
        currentH5Id: '48', // 当前H5文档id
        content: '',
        docListDatas: this.docListData,
        typeState: false, // 类型切换
        currentDocType: '1', // 文档中心初始化显示API或H5
        columnList: '', // 一级列表数据
        subNav: '', // 二级列表
        docList: [
          // API文档模拟数据
          {
            'docType': 'API',
            'docId': '1',
            'docHref': 'docApi',
            'columnType': [
              {
                'title': 'API入驻指南',
                'ApiId': '66',
                'subNav': [
                  {
                    'subNavTitle': 'API入驻指南',
                    'subNavTypeId': '68'
                  },
                  {
                    'subNavTitle': 'API入驻常见问题',
                    'subNavTypeId': '69'
                  }
                ]
              },
              {
                'title': '基础支持',
                'h5Id': '43',
                'subNav': [
                  {
                    'subNavTitle': '接口通用参数',
                    'subNavTypeId': '30'
                  },
                  {
                    'subNavTitle': '生成签名',
                    'subNavTypeId': '31'
                  }
                ]
              },
              {
                'title': '支付业务',
                'h5Id': '42',
                'subNav': [
                  {
                    'subNavTitle': '支付接口',
                    'subNavTypeId': '39'
                  }
                ]
              },
              {
                'title': '订单业务',
                'h5Id': '41',
                'subNav': [
                  {
                    'subNavTitle': '创建订单接口',
                    'subNavTypeId': '35'
                  },
                  {
                    'subNavTitle': '订单详情单个查询接口',
                    'subNavTypeId': '36'
                  },
                  {
                    'subNavTitle': '订单详情批量查询接口',
                    'subNavTypeId': '37'
                  },
                  {
                    'subNavTitle': '查询物流轨迹接口',
                    'subNavTypeId': '38'
                  },
                  {
                    'subNavTitle': '查询物流信息接口',
                    'subNavTypeId': '46'
                  }
                ]
              },
              {
                'title': '商品业务',
                'h5Id': '40',
                'subNav': [
                  {
                    'subNavTitle': '查询商品列表接口',
                    'subNavTypeId': '29'
                  },
                  {
                    'subNavTitle': '批量查询商品详情接口',
                    'subNavTypeId': '32'
                  },
                  {
                    'subNavTitle': '批量查询商品价格接口',
                    'subNavTypeId': '33'
                  },
                  {
                    'subNavTitle': '批量查询商品库存接口',
                    'subNavTypeId': '34'
                  },
                  {
                    'subNavTitle': '查询商品分类接口',
                    'subNavTypeId': '45'
                  },
                  {
                    'subNavTitle': '查询增量更新商品接口',
                    'subNavTypeId': '70'
                  }
                ]
              }
            ]
          },
          // H5文档模拟数据
          {
            'docType': 'H5',
            'docId': '2',
            'docHref': 'docH5',
            'columnType': [
              {
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
              }
            ]
          }
        ]
      }
    },
    created () {
      this.modifyNav(null, 1)
      this.docListDatas.forEach(item => {
        this.columnList = item.columnType // 左边栏目列表
        this.columnList.forEach(res => {
         this.subNav = res.subNav // 二级菜单列表
        })
      })
    },
    methods: {
      // API和H5导航切换
      modifyNav (e, currentDocType) {
        if (!this.typeState) return // 为false时返回
        if (e !== null) {
          let target = e.target
          if (target.nodeName.toLowerCase() === 'span') {
            this.typeState = false // 点击后变更类型
            this.currentDocType = target.getAttribute('data-type')
          } else {
            this.currentDocType = currentDocType.toString()
          }
        }
        this.docH5ListType(this.currentH5Id)
      },
      // 当前选择切换的文档栏目类型
      docH5ListType (e) {
        if (e !== null) {
          this.currentH5Id = e.target.getAttribute('data-id')
          this.queryDocH5list(this.currentH5Id)
        } else {
          this.queryDocH5list(this.currentH5Id)
        }
      },
      // 获取H5文档
      queryDocH5list (currentH5Id) {
        let url = this.$api.DOCUMENT.POST_API_APIDETAIL
        this.axios.get(`${url}?id=${currentH5Id}`).then(({data: {data}}) => {
          this.content = data.content
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/stylusFn.styl'
  /* docH5-container start */
  .docH5-container
    background-color $Bg32
    overflow hidden
    /* docH5-column start*/
    .docH5-column
      background-color $Bg32
      padding 0
      .docH5-column-tab
        background-color #E94A43
        display flex
        text-align center
        .active
          background-color rgba(223, 74, 67, 0.8)
        span
          flex 1
          display block
          cursor pointer
          color $clrfff
          padding 10px
          font-weight bold
          font-size 16px
          background-color $Bg32
          a
            color $clrfff
            display block
            padding 10px
            font-weight bold
            font-size 16px
          .router-link-exact-active
            background-color $Bg32
    /* docH5-column end */
      /* docH5-column-left start */
      .docH5-column-left
        color $clrd5
        cursor pointer
        li
          .router-link-exact-active
            color $clrfff
            &::before
              positions(absolute, left: 5px)
              display table
              content ''
              clear both
              width 3px
              height 20px
              background  $clrDF4A43
          a
            padding 13px 0
            display block
            color $clrd5
      /* docH5-column-left end */
    /* docH5-content start */
    .docH5-content
      background-color $BgF2
      padding 72px
      .docH5-content-chunk
        background-color $defaultBg
    /* docH5-content end */
  /* docH5-container end */
</style>
