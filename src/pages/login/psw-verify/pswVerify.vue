<template>
  <div class="fbp">
    <div class="fbp-title">
      <h3>找回密码</h3>
    </div>
    <div class="fbp-center">
      <div class="nav" :style="{backgroundImage: 'url('+ urlImg +')'}">
        <div class="step" :class="{'n-active': 'step1' === isActive}" v-if="pswType">
          <span class="s-num">1</span>
          <span class="s-word">输入{{ pswType }}</span>
        </div>
        <div class="step" :class="{'n-active': 'step2' === isActive}">
          <span class="s-num">2</span>
          <span class="s-word">设置新密码</span>
        </div>
        <div class="step" :class="{'n-active': 'step3' === isActive}">
          <span class="s-num">3</span>
          <span class="s-word">设置成功</span>
        </div>
      </div>
      <div class="fbp-content">
        <div class="fbpc-first" v-show="'step1' === isActive">
          <div class="fbpcf-content">
            <p class="control" v-if="pswType">
              <span class="c-word">{{ pswType }}</span>
              <input :name="pswId" v-model="phone" class="input typeVal" type="text" @input="listenWord()">
              <span class="is-danger" v-show="isTrue">{{ phoneMsg }}</span>
            </p>
            <p class="control l-code">
              <span class="c-word">验证码</span>
              <input v-model="code" name="code" v-validate="'required'" @input="codeInput" class="input" type="password">
              <span class="lc-code" @click="codeClick">{{ randomCode }}</span>
              <span v-show="errors.has('code')&&!isCode" class="is-danger">{{ errors.first('code') }}</span>
              <span v-show="isCode" class="is-danger">验证码错误</span>
            </p>
            <p class="control">
              <button class="next" @click="nextStep">下一步</button>
            </p>
          </div>
        </div>
        <div class="fbpc-second" v-show="'step2' === isActive">
          <div class="fbpcf-content">
            <p class="control">
              <span class="c-word">{{ stepTwoWord }}</span>
              <span class="newCode" @click="reNewCode">重新获取<span class="countNum">{{ countNum }}</span></span>
              <input name="atucode" v-model="atucode" class="input" type="password" :style="{'padding-left': setp2Pf}">
              <span class="is-danger" v-show="isTrueCode">{{ codeMsg }}</span>
            </p>
            <p class="control">
              <span class="c-word">新密码</span>
              <span class="swithPwd" :class="{showPwd:showPwd}" @click="swithPwd(1)"></span>
              <input name="pwd" v-model="pwd" class="input" type="text">
              <span class="is-danger" v-show="isPwd">{{ newMsg }}</span>
            </p>
            <p class="control">
              <span class="c-word">确认密码</span>
              <span class="swithPwd" :class="{showPwd:showPwd2}" @click="swithPwd(2)"></span>
              <input name="suerPwd" v-model="suerPwd" class="input" type="text">
              <span class="is-danger" v-show="isSuerPwd">{{ newSuerMsg }}</span>
            </p>
            <p class="control">
              <button class="next" @click="checkrevamp">确认修改</button>
            </p>
          </div>
        </div>
        <div class="fbpc-three" v-show="'step3' === isActive">
          <div class="fbpcf-content">
            <span class="fc-content">
                <span><img src="/src/assets/images/fb-suer.png"></span>
            <span class="fcc-desc">马上为您跳转到登录也...</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../../../utils/validate.js'
  export default {
    data() {
      return {
        word: '',
        pswType: '', // 当前找回密码类型
        pswId: '', // 当前文本id类型
        isShow: true,
        phone: '',
        phoneMsg: '',
        isTrue: false,
        code: '',
        isCode: false,
        isActive: 'step1',
        randomCode: '',
        urlImg: '/src/assets/images/fb-first.png',
        navData: [{
          urlImg: '/src/assets/images/fb-first.png'
        },
          {
            urlImg: '/src/assets/images/fb-second.png'
          },
          {
            urlImg: '/src/assets/images/fb-three.png'
          }
        ],
        // 验证码
        atucode: '',
        // 密码
        pwd: '',
        // 确认密码
        suerPwd: '',
        stepTwoWord: '',
        // 第二步骤第一个输入框padding-left
        setp2Pf: '',
        // 倒计时
        countNum: 59,
        // 定时器
        timer: null,
        // 密码是否显示
        showPwd: false,
        showPwd2: false,
        // 验证码
        isTrueCode: false,
        // 密码
        isPwd: false,
        // 确认密码
        isSuerPwd: false,
        // 验证码提示
        codeMsg: '',
        // 新密码
        newMsg: '',
        // 确认新密码提示
        newSuerMsg: ''
      }
    },
    created() {
      this.init()
      this.ranCode()
      this.timer = setInterval(() => {
        this.countNum === 0 ? clearInterval(this.timer) : this.countNum--
      }, 1000)
    },
    methods: {
      // 初始化
      init () {
        this.pswId = this.$route.query.id
        if (this.pswId === 'phone') {
          this.pswType = '手机号'
          this.stepTwoWord = '手机短信验证码'
          this.setp2Pf = '110px'
        } else if (this.pswId === 'email') {
          this.pswType = '邮箱'
          this.stepTwoWord = '绑定邮箱验证码'
          this.setp2Pf = '110px'
        } else if (this.pswId === 'username') {
          this.pswType = '用户名'
          this.stepTwoWord = '绑定邮箱验证码'
          this.setp2Pf = '110px'
        }
      },
      queryFn (parms, typeVal) {
        let H5 = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYMOBFROMPAGE
        this.axios({
          method: 'post',
          url: H5,
          data: {
            mob: typeVal
          }
        }).then(response => {
          console.log(response.data.data)
//          console.log(response.status)
//          console.log(response.statusText)
//          console.log(response.headers)
//          console.log(response.config)
          if (response) {
//            this.content = response.data.data.content
          }
        })
      },
      // 判断是那种进入方式
      whatWays() {
        let word = this.$route.params.id
        if (word === 'phone') {
          this.word = '手机号'
          word = '手机号'
          this.stepTwoWord = '手机短信验证码'
          this.setp2Pf = '110px'
        } else if (word === 'email') {
          this.word = '邮箱号'
          word = '邮箱号'
          this.stepTwoWord = '绑定邮箱验证码'
          this.setp2Pf = '110px'
        } else if (word === 'username') {
          this.word = '用户名'
          word = '用户名'
          this.stepTwoWord = '绑定邮箱验证码'
          this.setp2Pf = '110px'
        }
      },
      // 导航事件
      navLiClick(index) {
        console.log(index)
      },
      codeClick() {
        this.ranCode()
      },
      codeInput() {
        if (this.code.length > 0) {
          this.isCode = false
        }
      },
      codeChange() {
        if (this.code === '') {
          this.ranCode()
        }
      },
      ranCode() {
        // 首先默认code为空字符串
        let code = ''
        // 设置长度，这里看需求，我这里设置了4
        const codeLength = 4
        // 设置随机字符
        const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', ' R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (let i = 0; i < codeLength; i++) {
          var index = Math.floor(Math.random() * 36)
          // 字符串拼接 将每次随机的字符 进行拼接
          code += random[index]
        }
        // 将拼接好的字符串赋值给展示的Value
        this.randomCode = code
      },
      listenWord() {
        if (this.phone === '') {
          this.isTrue = true
          this.phoneMsg = '请输入' + this.pswType
        } else {
          this.isTrue = false
        }
      },
      // 下一步
      nextStep() {
        const that = this // 重置当前this
        const typeVal = document.querySelector('.typeVal').value // 当前类型输入文本值
        const retPsw = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYMOBFROMPAGE // 验证当前文本值是否数据库存在
        let word = this.$route.query.id
        console.log('typeVal', document.querySelector('.typeVal').value)
        if (this.phone === '') {
          this.isTrue = true
          this.phoneMsg = '请输入' + this.pswType
        } else {
          this.isTrue = true
          if (word === 'phone') {
            const phoneNum = /^1[3|4|5|8][0-9]\d{4,8}$/
            if (!phoneNum.test(this.phone) || !(this.phone.length === 11)) {
              this.phoneMsg = '手机号格式不正确'
            } else {
              this.axios({
                method: 'post',
                url: retPsw,
                data: {
                  mob: typeVal
                }
              }).then(response => {
                console.log('response', response.data)
                if (response) {
                  this.validateorStep2()
                }
              })
            }
          } else if (word === 'email') {
            const email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (!email.test(this.phone)) {
              this.phoneMsg = '邮箱账号格式不正确'
            } else {
              this.axios({
                method: 'post',
                url: retPsw,
                data: {
                  email: typeVal
                }
              }).then(response => {
                console.log('response', response.data)
                if (response) {
                  this.validateorStep2()
                }
              })
            }
          } else if (word === 'username') {
            console.log(this.phone)
            if (this.phone !== 'tester') {
              this.phoneMsg = '用户名不存在'
            } else {
              this.axios({
                method: 'post',
                url: retPsw,
                data: {
                  userName: typeVal
                }
              }).then(response => {
                console.log('response', response.data)
                if (response) {
                  this.validateorStep2()
                }
              })
            }
          }
        }
        this.$validator.validateAll().then(result => {
          if (result) {
            if (that.code.toUpperCase() !== that.randomCode) {
              that.isCode = true
            } else {
              that.isCode = false
            }
          }
        })
        if ((this.code.toUpperCase() !== this.randomCode) && this.code !== '') {
          this.ranCode()
        }
      },
      // 验证逻辑
      validateorStep2() {
        const that = this
        this.isTrue = false
        this.$validator.validateAll().then(result => {
          if (result) {
            if (that.code.toUpperCase() !== that.randomCode) {
              that.isCode = true
            } else {
              that.isCode = false
              that.isActive = 'step2'
              that.urlImg = that.navData[1].urlImg
              this.timer = setInterval(() => {
                this.countNum === 0 ? clearInterval(this.timer) : this.countNum--
              }, 1000)
            }
          }
        })
      },
      // 从新获取验证码
      reNewCode() {
        if (this.countNum === 0) {
          clearInterval(this.timer)
          this.countNum = 59
          this.timer = setInterval(() => {
            if (this.countNum === 0) {
              clearInterval(this.timer)
            } else {
              this.countNum--
            }
          }, 1000)
        }
      },
      // 切换密码
      swithPwd(index) {
        if (index === 1) {
          this.showPwd = !this.showPwd
        }
        if (index === 2) {
          this.showPwd2 = !this.showPwd2
        }
      },
      // 确认修改
      checkrevamp() {
        if (this.atucode === '') {
          this.codeMsg = '请输入短信验证码'
          this.isTrueCode = true
        } else {
          if (this.atucode !== '1234') {
            this.codeMsg = '短信验证码不正确'
            this.isTrueCode = true
          } else {
            this.isTrueCode = false
          }
        }
        if (this.pwd === '') {
          this.newMsg = '请输入新密码'
          this.isPwd = true
        } else {
          const reg6 = /^[a-zA-Z\d_]{6,}$/
          if (!reg6.test(this.pwd)) {
            this.newMsg = '密码不能少于6位数'
            this.isPwd = true
          } else {
            // 数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符组合，而且不能是纯数字，纯字母，纯特殊字符
            // const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
            // 特殊字符的范围为 !#$%^&*
            const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/
            if (!reg.test(this.pwd)) {
              this.newMsg = '请输入6-20位字母、数字和符号任意两者已上组合'
              this.isPwd = true
            } else {
              this.isPwd = false
            }
          }
        }
        if (this.suerPwd === '') {
          this.newSuerMsg = '请输入确认密码'
          this.isSuerPwd = true
        } else {
          if (this.pwd.length > 0 && this.suerPwd.length > 0 && this.pwd !== this.suerPwd) {
            this.newSuerMsg = '两次输入密码不一致'
            this.isSuerPwd = true
          } else {
            this.isSuerPwd = false
          }
        }
        if (this.pwd !== '' &&
          this.suerPwd !== '' &&
          this.atucode !== '' &&
          this.pwd === this.suerPwd &&
          this.atucode === '1234') {
          this.isActive = 'step3'
          this.urlImg = this.navData[2].urlImg
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .fbp
    .nav
      width 696px
      height 34px
      margin 34px 0 50px 0
      .step
        width 232px
        height 34px
        line-height 34px
        text-align center
        float left
        color rgb(223,74,67)
        font-size 14px
        .s-num
          height 18px
          width 18px
          line-height 18px
          display inline-block
          border-radius 18px
          color #ffffff
          background-color rgb(223,74,67)
          margin-right 8px
      .n-active
        .s-num
          background-color #ffffff
          color rgb(223,74,67)
        .s-word
          color #ffffff
    .fbp-title
      width 100%
      background-color rgb(250,250,250)
      border 1px solid #cccccc
      height 40px
      line-height 40px
      h3
        width 960px
        margin 0 auto
        padding 0 30px
        font-size 14px
        color rgb(51,51,51)
        font-weight bold
    .fbp-center
      margin 0 auto
      width 960px
      padding 0 30px
      text-align left
      overflow hidden
      .control
        padding-bottom 18px
        position relative
        overflow hidden
        height 64px
        .surePwd
          padding-left 75px !important
        .c-word
          position absolute
          font-size 12px
          line-height 46px
          color rgb(153,153,153)
          left 16px
        .loginBtn
          cursor pointer
          font-size 20px
          margin-top 35px
          color rgb(255,255,255)
          background-color rgb(223,74,67)
          height 52px
          border none
          line-height 52px
          border-radius 3px
        .is-danger
          display inline-block
          font-size 12px
          line-height 46px
          height 46px
          margin-left 10px
          color rgb(223,74,67)
        .input
          width 330px
          padding-left: 65px;
          height 46px
          font-size 16px
          color rgb(46, 46,46)
          border 1px solid #cccccc
          border-radius 3px
          background-color #ffffff
          float left
      .l-code
        overflow hidden
        cursor pointer
        .input
          width 202px
        .lc-code
          width 118px
          height 46px
          line-height 46px
          margin-left 10px
          float left
          background-color #f0f3f9
          text-align center
          display inline-block
          letter-spacing 10px
          font-style italic
          color #3a3c6d
      .next
        font-size 20px
        background-color rgb(223,74,67)
        border-radius 3px
        color #ffffff
        width 330px
        height 46px
        line-height 46px
        border none
        cursor pointer
      // 获取验证码样式
      .newCode
        position absolute
        font-size 12px
        line-height 46px
        color #999
        left 250px
        .countNum
          &:before
            content '('
            display inline-block
            width 7px
            text-align center
            line-height 46px
          &:after
            content ')'
            display inline-block
            width 7px
            text-align center
            line-height 46px
      // 密码
      .swithPwd
        position absolute
        display block
        height 12px
        width 18px
        left 305px
        top 18px
        cursor pointer
        background url('/src/assets/images/showPwd.png') no-repeat center
        background-size 18px 12px
      .showPwd
        background url('/src/assets/images/hidePwd.png') no-repeat center
        background-size 18px 9px
        top 19px
      .fbpc-three
        padding  132px 0
        width 696px
        .fc-content
          width 130px
          display block
          margin 0 auto
        span
          display block
          padding-bottom 34px
          text-align center
        .fcc-desc
          font-size 12px
          color rgb(153,153,153)
          text-align left
</style>
