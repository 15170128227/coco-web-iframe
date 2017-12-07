<template>
  <div class="doc-container">
    <div class="doc-content" v-if="docList">
      <div class="doc-column-left">
        <ul class="one-column">
          <li class="one-columns">
            <a :data-id="'1'" href="javascript:void(0)" class="arrow-down" @click="isOneNav($event, index)">
              API
              <!--<span class="doc-down one-upDown isShow"></span>-->
            </a>
            <ul class="two-column" v-if="columnType1" :style="'display:'+ display">
              <li class="" v-for="(item, index) in columnType1" :class="'two-columns-' + index">
                <a href="javascript:void(0)" :data-id="item.dataId" @click="isTwoNav($event, index)" class="arrow-down">
                  {{item.title}}
                  <!--<span class="arrow-down two-upDown isShow"></span>-->
                </a>
                <ul class="three-column" :class="'three-column-' + index" v-if="item.subNav && showTwoNav" :style="'display:'+ display">
                  <li class="" v-for="subNav in item.subNav" :class="'three-columns-' + index" @click="docH5ListType($event, subNav.subNavTypeId)">
                    <router-link :to="'document?docApiId=' + subNav.subNavTypeId" :data-id="subNav.subNavTypeId"> {{subNav.subNavTitle}} </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="one-column">
          <li class="one-columns">
            <a href="javascript:void(0)"  :data-id="'2'" class="arrow-down" @click="isOneNav($event, index)">
              H5
            </a>
            <ul class="two-column twoColumn" v-if="columnType2" :style="'display:'+ display">
              <li class="" v-for="(item, index) in columnType2" :class="'two-columns-' + index" @click="docH5ListType($event, item.dataId)">
                <router-link :to="'document?docH5Id=' + item.dataId" :data-id="item.dataId"> {{item.title}} </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="doc-column cow_col_24"></div>
      </div>
      <div class="doc-right-center">
        <div class="doc-content-chunk" v-if="content">
          <h2 class="doc-content-tit">
            <span class="docTit">{{currentTit}}</span>
          </h2>
          <div class="content-chunk" v-html="content"></div>
          <button class="doc-content-tool">API在线测试工具</button>
        </div>
      </div>
    </div>
    <coco-footer></coco-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import velocity from 'velocity-animate'
  import cocoDocNav from './doc-nav/doc-nav.vue'
  import cocoDocH5 from './doc-h5/doc-h5.vue'
  import cocoDocApi from './doc-api/doc-api.vue'
  import cocoFooter from '../../components/footer/footer.vue'
  export default {
    name: 'document',
    components: {
      cocoDocNav, cocoDocH5, cocoDocApi, cocoFooter
    },
    data () {
      return {
        columnType: '', // 二级栏目
        subNav: '', // 三级栏目
        content: '', // 文档中心内容
        currentH5Id: '48', // 初始化文档id
        currentTit: 'API入驻指南', // 当前默认title
        showOneNav: false, // 初始化一级导航是否需要隐藏导航
        showTwoNav: true, // 始化二级导航是否需要隐藏导航
        isShow: false,
        display: 'block', // 初始化
        iconClass: 'down',
        bodyHeight: 0,
        componentsType: {
          '1': 'cocoDocH5',
          '2': 'cocoDocApi'
        },
        docList: [
          // API文档模拟数据
          {
            'docType': 'API',
            'docId': '1',
            'docHref': 'docApi',
            'columnType': [
              {
                'title': 'API入驻指南',
                'dataId': '66',
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
                'dataId': '43',
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
                'dataId': '42',
                'subNav': [
                  {
                    'subNavTitle': '支付接口',
                    'subNavTypeId': '39'
                  }
                ]
              },
              {
                'title': '订单业务',
                'dataId': '41',
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
                'dataId': '40',
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
                'dataId': '48',
                'subNav': [
                  {
                    'subNavTitle': '三级菜单',
                    'subNavTypeId': '3'
                  }
                ]
              },
              {
                'title': '生成免登陆url',
                'dataId': '49'
              },
              {
                'title': '用户积分扣除接口',
                'dataId': '50'
              },
              {
                'title': '订单兑换成功/失败消息的接收接口',
                'dataId': '51'
              },
              {
                'title': '签名规则',
                'dataId': '52'
              },
              {
                'title': '售后订单通知接口',
                'dataId': '71'
              },
              {
                'title': '获取内页直达链接接口',
                'dataId': '72'
              },
              {
                'title': '收货地址同步接口',
                'dataId': '73'
              }
            ]
          }
        ],
        columnType1: [
          {
            'title': 'API入驻指南',
            'dataId': '66',
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
            'dataId': '43',
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
            'dataId': '42',
            'subNav': [
              {
                'subNavTitle': '支付接口',
                'subNavTypeId': '39'
              }
            ]
          },
          {
            'title': '订单业务',
            'dataId': '41',
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
            'dataId': '40',
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
        ],
        columnType2: [
          {
            'title': '入驻指南',
            'dataId': '48',
            'subNav': [
              {
                'subNavTitle': '三级菜单',
                'subNavTypeId': '3'
              }
            ]
          },
          {
            'title': '生成免登陆url',
            'dataId': '49'
          },
          {
            'title': '用户积分扣除接口',
            'dataId': '50'
          },
          {
            'title': '订单兑换成功/失败消息的接收接口',
            'dataId': '51'
          },
          {
            'title': '签名规则',
            'dataId': '52'
          },
          {
            'title': '售后订单通知接口',
            'dataId': '71'
          },
          {
            'title': '获取内页直达链接接口',
            'dataId': '72'
          },
          {
            'title': '收货地址同步接口',
            'dataId': '73'
          }
        ],
        docTypeId: window.sessionStorage.getItem('docTypeId')
      }
    },
    created () {
      this.queryDocH5list(this.currentH5Id)
      this.queryList()
    },
    computed: {
      ifShowBody () {
        let c = true
        switch (this.iconClass) {
          case 'up':
            c = true
            break
          case 'down':
            c = false
            break
        }
        return c
      }
    },
    methods: {
      iconClick (e) {
        let target = e.target.parentNode
        const present = target.querySelector('.three-column')
        const colummns = document.querySelectorAll('.three-column')
        switch (this.iconClass) {
          case 'up':
            e.target.parentNode.children[1].classList.remove('active')
            if (present.style.display === 'block') {
              for (let i = 0; i < colummns.length; i++) {
                colummns[i].style.display = 'none'
              }
              e.target.classList.remove('arrow-down')
              e.target.classList.add('arrow-up')
            }
            this.iconClass = 'down'
            break
          case 'down':
            e.target.parentNode.children[1].classList.add('active')
            if (e.target) {
              this.iconClass = 'up'
            }
            break
        }
      },
      iconClickFn (type, id) {
        console.log('id', id)
        let dataType = ['1', '2']
        let currentIndex = null
        dataType.some(function(v, index) {
          console.log('v', v)
          if (v === id) {
            console.log('index', index)
            currentIndex = index
            console.log('currentIndex', currentIndex)
          }
        })
      },
      // 向上
      enter (el, done) {
       /* let self = this
        velocity(el, { height: self.bodyHeight + 'px' }, {duration: 500, complete: done}) */
        console.log('self.bodyHeight', self.bodyHeight)
      },
      beforeLeave (el, done) {
       /* this.bodyHeight = el.clientHeight
        console.log('done', done) */
      },
      // 向下
      leave (el, done) {
        /* el.style.height = el.clientHeight + 'px'
        console.log('el.style.height', el.style.height)
        velocity(el, { height: '0px' }, {duration: 500, complete: done}) */
//        document.querySelector('.router-link-active').classList.remove('router-link-exact-active')
      },
      toggle (type) {
        this.isShow = !this.isShow
      },
      // 处理导航列表数据
      queryList () {
        this.docList.forEach(item => {
          this.docList = item
        })
      },
      // 当前选择切换的文档栏目类型
      docH5ListType (e) {
        if (e !== null) {
          this.currentTit = e.target.innerHTML
          this.currentH5Id = e.target.getAttribute('data-id')
          this.queryDocH5list(this.currentH5Id)
        } else {
          this.queryDocH5list(this.currentH5Id)
        }
      },
      // 获取H5文档
      queryDocH5list (currentH5Id) {
        let H5 = this.$api.DOCUMENT.POST_API_APIDETAIL
        this.axios({
          method: 'post',
          url: H5,
          data: {
            id: currentH5Id
          }
        }).then(response => {
//          console.log(response.data.data.content)
//          console.log(response.status)
//          console.log(response.statusText)
//          console.log(response.headers)
//          console.log(response.config)
          if (response) {
            this.content = response.data.data.content
          }
        })
      },
      // 一级导航是否展示 || 隐藏导航
      isOneNav (e, index) {
        let target = e.target.parentNode
        const present = target.querySelector('.two-column')
//        const colummns = document.querySelectorAll('.two-column')
        if (present.style.display === 'block') {
          present.style.display = 'none'
          e.target.classList.remove('arrow-down')
          e.target.classList.add('arrow-up')
        } else {
          present.style.display = 'block'
          e.target.classList.remove('arrow-up')
          e.target.classList.add('arrow-down')
        }
      },
      // 二级级导航是否展示 || 隐藏导航
      isTwoNav (e, index) {
        let target = e.target.parentNode
        const present = target.querySelector('.three-column')
//        const colummns = document.querySelectorAll('.three-column')
        if (present.style.display === 'block') {
          /* for (let i = 0; i < colummns.length; i++) {
            colummns[i].style.display = "none"
          } */
          present.style.display = 'none'
          e.target.classList.remove('arrow-down')
          e.target.classList.add('arrow-up')
        } else {
          /* for (let i = 0; i < colummns.length; i++) {
            colummns[i].style.display = "none"
          } */
          present.style.display = 'block'
          e.target.classList.remove('arrow-up')
          e.target.classList.add('arrow-down')
        }
        /* if (this.showTwoNav) {
          e.target.parentNode.children[1].classList.add('active')
          this.showTwoNav = false
        } else {
          e.target.parentNode.children[1].classList.remove('active')
          this.showTwoNav = true
        } */
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/css/stylusFn.styl'
  /* doc-container start */
  .doc-container
    background-color $defaultBg
    overflow hidden
    /* doc-content start */
    .doc-content
      display flex
      background-color $defaultBg
      overflow hidden
      text-align(left)
      /* doc-column-left start */
      .doc-column-left
        background-color $Bg32
        position relative
        flex 1
        .isShow
          width 12px
          height 10px
          display inline-block
          position absolute
          /*top auto*/
          right 20px
        .arrow-down
          animation: bounce-in .5s
          background url(../../assets/images/docment/down.png) no-repeat right
          margin-right 20px
        .arrow-up
          animation: bounce-in .5s
          margin-right 20px
          background url(../../assets/images/docment/up.png) no-repeat right
        a
         color $clrd5
        .one-column
          background-color #444
          overflow hidden
          .one-columns
            a
              padding 20px
          li
            a
              /*padding 12px 0*/
              font-weight bold
              font-size 16px
              display block
            .two-column
              background-color #555
              display block
              a
                font-size 14px
                font-weight normal
            .twoColumn
              .router-link-exact-active
                color $clrfff
                &::before
                  positions(absolute, left: 10px)
                  display table
                  content ''
                  clear both
                  width 3px
                  height 20px
                  background  $clrDF4A43
            .active
              display none
            .three-column
              background-color #777
              .router-link-exact-active
                color $clrfff
                &::before
                  positions(absolute, left: 10px)
                  display table
                  content ''
                  clear both
                  width 3px
                  height 20px
                  background  $clrDF4A43
            .active
              display none
              li
                a
                  font-weight normal
                  font-size 14px !important
                  padding 15px 30px
      /* doc-column-left end */
      /* doc-right-center start */
      .doc-right-center
        flex 5
        background-color #f4f4f4
        .doc-content-chunk
          background-color $defaultBg
          margin 72px
          padding 60px
          .doc-content-tit
            font-size 18px
            padding-left 10px
            border-bottom 1px #d5d5d5 solid
            span
              padding: 18px 0px
              border-bottom 3px $clrDF4A43 solid
              display inline-block
              position relative
              bottom -2px
          .doc-content-tool
            cursor pointer
            width 220px
            height 46px
            margin-top 20px
            border 1px solid $clrDF4A43
            background-color $defaultBg
            border-radius 3px
            color $clrDF4A43
            font-size $fontSize18
            &:hover
              background-color $clrDF4A43
              color $clrfff
          .content-chunk
            padding 5px
      /* doc-right-center end */
    /* doc-content end */
  /* doc-container end */
</style>
