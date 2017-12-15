<!--找回密码-->
<template>
  <div class="pswVer-container">
    <div class="pasVer-title">
      <h3>找回密码</h3>
    </div>
    <div class="pasVer-center">
      <div class="pasVer-nav" :style="{backgroundImage: 'url('+ urlImg +')'}">
        <div class="step" :class="{'n-active': 'step1' === isActive}" v-if="pswType">
          <span class="data-num">1</span>
          <span class="data-type">输入{{ pswType }}</span>
        </div>
        <div class="step" :class="{'n-active': 'step2' === isActive}">
          <span class="data-num">2</span>
          <span class="data-type">设置新密码</span>
        </div>
        <div class="step" :class="{'n-active': 'step3' === isActive}">
          <span class="data-num">3</span>
          <span class="data-type">设置成功</span>
        </div>
      </div>
      <div class="pasVer-content">
        <div class="pasVer-one" v-show="'step1' === isActive">
          <div class="one-content">
            <p class="control" v-if="pswType">
              <span class="c-type">{{ pswType }}</span>
              <input :name="pswId" v-model="typeVal" class="input typeVal" type="text" @input="listenType" @keyup="nextEnter($event)">
              <span class="is-error" v-show="isError">{{ phoneMsg }}</span>
            </p>
            <p class="c-code control">
              <span class="c-type">验证码</span>
              <input v-model="code" name="code" class="input" type="password" @input="codeInput" @keyup="nextEnter($event)">
              <span  class="lc-code" @click="codeClick">{{ randomCode }}</span>
              <span class="is-error" v-show="isCode">{{ errCodeMsg }}</span>
            </p>
            <p class="control">
              <button class="next"  @click="nextStep">下一步</button>
            </p>
          </div>
        </div>
        <div class="pasVer-two"  v-show="'step2' === isActive">
          <div class="two-content">
            <p class="control">
              <span class="c-type">{{ stepTwoType }}验证码</span>
              <span :class="{codeLeft: isLeft}" v-if="isLeft" @click="reNewCode">重新获取</span>
              <span class="newCode" v-else>重新获取<span class="countNum">{{ countNum }}</span></span>
              <input name="atucode" :style="{'padding-left': step2Pf}" v-model="atucode" class="input" type="password" @keyup="conEnter($event)">
              <span class="is-error" v-show="isTrueCode">{{ codeMsg }}</span>
            </p>
            <p class="control">
              <span class="c-type">新密码</span>
              <span class="swithPwd" :class="{showPwd:showPwd}" @click="swithPwd(1)"></span>
              <input name="pwd" class="input" :type="isPasType" v-model="pwd" @keyup="conEnter($event)">
              <span class="is-error" v-show="isPwd">{{ newMsg }}</span>
            </p>
            <p class="control">
              <span class="c-type">确认密码</span>
              <span class="swithPwd" :class="{showPwd:showPwd2}" @click="swithPwd(2)"></span>
              <input name="suerPwd" class="input" :type="isPasType2" v-model="suerPwd" @keyup="conEnter($event)">
              <span class="is-error" v-show="isSuerPwd">{{ newSuerMsg }}</span>
            </p>
            <p class="control">
              <button class="next" @click="checkrevamp">确认修改</button>
            </p>
          </div>
        </div>
        <div class="pasVer-three" v-show="'step3' === isActive">
          <div class="three-content">
            <p class="three-c">
              <img src="/static/images/fb-suer.png">
              <span class="three-desc">马上为您跳转到登录...</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        countDown: 3, // 找回密碼最後一步倒計時
        states: null, // 停止
        isLeft: false, // 倒計時樣式
        dataEmail: '', // 用戶名找回密碼成功返回郵箱
        pswType: '', // 当前找回密码类型
        stepTwoWord: '', // 当前找回密码步骤验证证码
        pswId: '', // 当前文本id类型
        phoneMsg: '', // 用户名||手机号||邮箱错误信息提示
        isError: false, // 用户名||手机号||邮箱是否显示错误信息
        code: '',
        isCode: false, // 是否展示错误信息
        errCodeMsg: '', // 验证码错误信息
        randomCode: '', // 验证码值
        codeMsg: '', // 验证码提示
        pwd: '', // 密码
        isPasType: 'text', // 密码是否展示||隐藏
        isPasType2: 'text',
        isPwd: false,
        step2Pf: '110px', // 第二步第一个输入框padding-left
        newMsg: '',  // 新密码验证提示信息
        isSuerPwd: false, // 确认密码
        isTrueCode: false,
        atucode: '', // 第二步手机||邮箱验证码
        showPwd: false, // 密码是否显示||隐藏
        showPwd2: false, // 密码是否显示||隐藏
        newSuerMsg: '',
        countNum: 59, // 初始化倒计时
        timer: null, // 定时器是否关闭
        suerPwd: '',
        stepTwoType: '', //
        typeVal: '',
        isActive: 'step1', // 初始化找回密码步骤
        urlImg: '/static/images/pasVer_one.png', // 找回密码第一步nav背景初始化
        // 找回密码nav步骤背景图
        navData: [
          {
            urlImg: '/static/images/pasVer_one.png'
          },
          {
            urlImg: '/static/images/perVer_two.png'
          },
          {
            urlImg: '/static/images/perVer_three.png'
          }
        ]
      }
    },
    created () {
      this.initType()
      this.ranCode()
    },
    methods: {
      // 初始化找回密码类型
      initType () {
        this.pswId = this.$route.query.id
        if (this.pswId === 'phone') {
          this.pswType = '手机号'
          this.stepTwoWord = '手机短信验证码'
        } else if (this.pswId === 'email') {
          this.pswType = '邮箱'
          this.stepTwoWord = '绑定邮箱验证码'
        } else if (this.pswId === 'username') {
          this.pswType = '用户名'
          this.stepTwoWord = '绑定邮箱验证码'
        }
      },
      // 回車下一步
      nextEnter (e) {
        this.isError = ''
        this.isCode = ''
        if (e.keyCode === 13) {
          this.nextStep()
        }
      },
      // 验证输入手机号 || 用户名 || 邮箱是否跳转下一步
      nextStep () {
        let typeId = this.$route.query.id
        if (this.typeVal === '') {
          this.isError = true
          this.phoneMsg = '请输入' + this.pswType
        } else {
          if (typeId === 'phone') {
            let phoneNum = new RegExp(/^1[3|4|5|8][0-9]\d{4,8}$/)
            if (!phoneNum.test(this.typeVal) || !(this.typeVal.length === 11)) {
              this.isError = true
              this.phoneMsg = '手机号格式错误'
            } else {
              this.isError = false
            }
          } else if (typeId === 'email') {
            let email = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/)
            if (!email.test(this.typeVal)) {
              this.isError = true
              this.phoneMsg = '邮箱格式错误'
            } else {
              this.isError = false
            }
          } else if (typeId === 'username') {
            let uPattern = new RegExp(/^[0-9a-zA-z-_]+$/) // 用户名正则（数字或字母皆可）
            if (!uPattern.test(this.typeVal)) {
              this.isError = true
              this.phoneMsg = '用户名格式错误'
            } else {
              this.isError = false
            }
          }
        }
        /*
        * 1.验证码为空时请输入验证码
        * 2.验证码与随机码匹配则验证成功
        * 3.验证码错误时重新生成新的随机验证码
        * */
        if (this.code === '') {
          this.isCode = true
          this.errCodeMsg = '请输入验证码'
        } else {
          if (this.code.toUpperCase() === this.randomCode) {
            let typeId = this.$route.query.id
            this.isCode = false
            if (typeId === 'phone') {
              this.retMobFn() // 手机号验证找回
            } else if (typeId === 'email') {
              this.retEmailFn() // 邮箱验证找回
            } else if (typeId === 'username') {
              this.retUserFn() // 用户名验证找回
            }
          } else {
            this.isCode = true
            this.errCodeMsg = '验证码错误'
            this.ranCode() // 重新生成验证码
          }
        }
      },
      // 通过手机号找回密码第一步
      retMobFn () {
        let retMob = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYMOBFROMPAGE
        this.axios.post(retMob, {
          mob: this.typeVal
        }).then(response => {
          this.stepTwoType = '手机短信'
          this.querySecSte1(response)
        })
      },
      // 通过用户名找回密码第一步
      retUserFn () {
        let retUser = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYUSERNAMEFROMPAGE // 用户名验证找回
        this.axios.post(retUser, {
          userName: this.typeVal
        }).then(response => {
          this.stepTwoType = '绑定邮箱'
          this.querySecSte1(response)
        })
      },
      /*
      * 1.重新獲取驗證碼時通過郵箱接口獲取驗證碼
      * */
      retUserFnTwo () {
        let retEmail = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYEMAILFROMPAGE // 用戶名使用邮箱验证找回
        this.axios.post(retEmail, {
          email: window.localStorage.getItem('dataEmail')
        }).then(response => {
          this.querySecSte1(response)
        })
      },
      // 通过邮箱找回密码第一步
      retEmailFn () {
        let retEmail = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYEMAILFROMPAGE // 邮箱验证找回
        this.axios.post(retEmail, {
          email: this.typeVal
        }).then(response => {
          this.stepTwoType = '绑定邮箱' //
          this.querySecSte1(response)
        })
      },
      /*
      *1.手机号||邮箱||用户名请求成功执行
      * */
      querySecSte1 (response) {
        let code = response.data.flag
        let message = response.data.message
        if (code === '0') {
          this.isError = true
          this.phoneMsg = message
        } else if (code === '1') {
          window.localStorage.setItem('dataEmail', response.data.data) // 第一步用戶名找回密碼驗證成功存入信息
          this.validateorStep()
        }
      },
      // 验证逻辑
      validateorStep () {
        const self = this
        this.isError = false
        this.isCode = false
        self.isActive = 'step2'
        self.urlImg = self.navData[1].urlImg
        this.timer = setInterval(() => {
//          this.countNum === 0 ? clearInterval(this.timer) : this.countNum--
          if (this.countNum === 0) {
            this.isLeft = true
            clearInterval(this.timer)
          } else {
            this.isLeft = false
            this.countNum--
          }
        }, 1000)
      },
      // 随机验证码函数
      ranCode () {
        // 首先默认code为空字符串
        let code = ''
        // 设置长度4
        const codeLength = 4
        // 设置随机字符
        const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', ' R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (let i = 0; i < codeLength; i++) {
          var index = Math.floor(Math.random() * 36)
          code += random[index]  // 字符串拼接 将每次随机的字符 进行拼接
        }
        this.randomCode = code // 将拼接好的字符串赋值给展示的Value
      },
      listenType() {
        if (this.phone === '') {
          this.isError = true
          this.phoneMsg = '请输入' + this.pswType
        } else {
          this.isError = false
        }
      },
      codeInput () {
        if (this.code.length > 0) {
          this.isCode = false
        }
      },
      codeClick () {
        this.ranCode()
      },
      // 重新获取验证码
      reNewCode () {
        this.pswId = this.$route.query.id
        if (this.pswId === 'phone') {
          this.retMobFn()
        } else if (this.pswId === 'email') {
          this.retEmailFn()
        } else if (this.pswId === 'username') {
            this.retUserFnTwo()
        }
        this.countDownSixty()
      },
      countDownSixty () {
        if (this.countNum === 0) {
          clearInterval(this.timer)
          this.countNum = 59
          this.timer = setInterval(() => {
            if (this.countNum === 0) {
              this.isLeft = true
              clearInterval(this.timer)
            } else {
              this.isLeft = false
              this.countNum--
            }
          }, 1000)
        }
      },
      // 切换密码
      swithPwd (index) {
        if (index === 1) {
          this.showPwd = !this.showPwd
          if (this.showPwd) {
            this.isPasType = 'password'
          } else {
            this.isPasType = 'text'
          }
        }
        if (index === 2) {
          this.showPwd2 = !this.showPwd2
          if (this.showPwd2) {
            this.isPasType2 = 'password'
          } else {
            this.isPasType2 = 'text'
          }
        }
      },
      //
      conEnter (e) {
        this.isTrueCode = ''
        this.isPwd = ''
        this.isSuerPwd = ''
        if (e.keyCode === 13) {
          this.checkrevamp()
        }
      },
      // 确认修改 -- 验证短信验证码 || 新密码
      checkrevamp () {
        const reg6 = new RegExp(/^[a-zA-Z\d_]{6,}$/) // 密码不要少于6位数
        const reg = new RegExp(/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/) // 验证密码
        if (this.pwd === '') {
          this.isPwd = true
          this.newMsg = '请输入新密码'
        } else {
          if (!reg6.test(this.pwd)) {
            this.isPwd = true
            this.newMsg = '密码不能少于6位数'
          } else {
            // 数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符组合，而且不能是纯数字，纯字母，纯特殊字符
            // const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
            // 特殊字符的范围为 !#$%^&*
            if (!reg.test(this.pwd)) {
              this.isPwd = true
              this.newMsg = '请输入6-20位字母、数字和符号任意两者已上组合'
            } else {
              this.isPwd = false
            }
          }
        }
        if (this.suerPwd === '') {
          this.isSuerPwd = true
          this.newSuerMsg = '请输入确认密码'
        } else {
          if (this.pwd.length > 0 && this.suerPwd.length > 0 && this.pwd !== this.suerPwd) {
            this.isSuerPwd = true
            this.newSuerMsg = '两次输入密码不一致'
          } else {
            this.isSuerPwd = false
          }
        }
        if (this.atucode === '') {
          this.isTrueCode = true
          this.codeMsg = '请输入验证码'
        } else {
          this.isTrueCode = false
          this.verifyPass(reg6, reg)
        }
      },
      // 所以验证已通过
      verifyPass (reg6, reg) {
        if (this.pwd !== '' && this.suerPwd !== '' && this.atucode !== '' && reg6.test(this.pwd) && reg.test(this.pwd) && this.pwd === this.suerPwd) {
          this.resPassWord() // 根据修改密码类型请求
        }
      },
      //  确认找回密码
      resPassWord () {
        if (this.$route.query.id === 'phone') {
          this.queryMob()
        } else if (this.$route.query.id === 'email') {
          this.queryEmail()
        } else {
          this.queryUser()
        }
      },
      // 手机号找回密码
      queryMob () {
        let molPass = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYMOB
        this.axios.post(molPass, {
            mob: this.typeVal,
            validCode: this.atucode,
            password: this.suerPwd
        }).then(response => {
          let message = response.data.codeMessage  // 返回提示信息--0101成功、
          let code = response.data.flag // 返回状态码--0失败、1成功
           if (code === '1') {
            this.pswSuccess() // 找回密码第三步
          } else if (code === '0') {
            this.isTrueCode = true
            this.codeMsg = message
          } else {
            this.isSuerPwd = message // 错误信息
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // 邮箱找回密码
      queryEmail () {
        let molPass = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYEMAIL
        this.axios.post(molPass, {
          email: this.typeVal,
          validCode: this.atucode,
          password: this.suerPwd
        }).then(response => {
          let message = response.data.codeMessage  // 返回提示信息--0101成功、
          let code = response.data.flag // 返回状态码--0失败、1成功
          if (code === '1') {
            this.pswSuccess() // 找回密码第三步
          } else if (code === '0') {
            this.isTrueCode = true
            this.codeMsg = '验证码错误'
          } else {
            this.isSuerPwd = message // 错误信息
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // 用户名找回密码
      queryUser () {
        let molPass = this.$api.RETRIEVEPSW.POST_MODIFYPWDBYEMAIL
        this.axios.post(molPass, {
          email: this.dataEmail,
          validCode: this.atucode,
          password: this.suerPwd
        }).then(response => {
          let message = response.data.codeMessage  // 返回提示信息--0101成功、
          let code = response.data.flag // 返回状态码--0失败、1成功
          if (code === '1') {
            this.pswSuccess() // 找回密码第三步
          } else if (code === '0') {
            this.isTrueCode = true
            this.codeMsg = '验证码错误'
          } else {
            this.isSuerPwd = message // 错误信息
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // 找回密码第三步
      pswSuccess () {
        if (this.pwd !== '' &&
          this.suerPwd !== '' &&
          this.atucode !== '' &&
          this.pwd === this.suerPwd &&
          this.atucode !== '') {
          this.isActive = 'step3'
          this.urlImg = this.navData[2].urlImg
          if (this.isActive === 'step3') {
//            window.localStorage.removeItem('dataEmail') // 找回密碼成功清除存儲dataEmail
            this.states = setInterval(this.goBackLogin, 1000)
          }
        }
      },
      goBackLogin () {
        if (this.countDown > 1) {
          this.countDown--
        } else {
          clearInterval(this.states)
          this.$router.replace({name: 'login'}) // 跳转登录页面
          this.countDown = 3
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  /* pswVer-container start */
  .pswVer-container
    .pasVer-nav
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
        .data-num
          height 18px
          width 18px
          line-height 18px
          display inline-block
          border-radius 18px
          color #fff
          background-color rgb(223,74,67)
          margin-right 8px
      .n-active
        .data-num
          background-color #fff
          color rgb(223,74,67)
        .data-type
          color #fff
    /* pasVer-title start */
    .pasVer-title
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
    /* pasVer-title end */
    /* pasVer-center start */
    .pasVer-center
      margin 0 auto
      width 960px
      padding 0 30px
      text-align left
      overflow hidden
      .pasVer-content
        .pasVer-three
          padding  132px 0
          width 696px
          .three-content
            /*width 130px*/
            display block
            .three-c
              text-align center
          span
            display block
            text-align center
          .three-desc
            padding-top 34px
            font-size 12px
            display block
            color rgb(153,153,153)
            text-align center
        .control
          padding-bottom 18px
          position relative
          overflow hidden
          height 64px
          .surePwd
            padding-left 75px !important
          .c-type
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
          .is-error
            display inline-block
            font-size 12px
            line-height 46px
            height 46px
            margin-left 10px
            color rgb(223,74,67)
          .input
            width 330px
            padding-left: 72px
            height 46px
            font-size 16px
            color rgb(46, 46,46)
            border 1px solid #cccccc
            border-radius 3px
            background-color #ffffff
            float left
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
            &:hover
                opacity .9
            &:active
              box-shadow: 1px 1px 1px #666
              transform translateY(1px)  // 点击后按钮沿着Y轴位移，位移量等于阴影变化量
           // code
          .codeLeft
            position absolute
            cursor pointer
            font-size 12px
            line-height 46px
            color #999
            left 276px !important
          .newCode
            position absolute
            cursor pointer
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
          // password
          .swithPwd
            position absolute
            display block
            height 12px
            width 18px
            left 305px
            top 18px
            cursor pointer
            background url('/static/images/showPwd.png') no-repeat center
            background-size 18px 12px
          .showPwd
            background url('/static/images/hidePwd.png') no-repeat center
            background-size 18px 9px
            top 19px
        .c-code
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
    /* pasVer-center end */
  /* pswVer-container end */
</style>
