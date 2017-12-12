<!-- 首页 -->
<template>
  <div>
    <div class="login-container">
      <div class="w_960">
        <div class="login-outer outer">
          <form  v-show="isShow" >
            <h2>账号登录</h2>
            <div class="control-group-container">
              <div class="control-label">
                <input type="text" class="verify-user" placeholder="用户名" v-model="verifyUser"  @keyup="enter($event)"/>
                <span class="user-error error-msg">{{userVerErr}}</span>
              </div>
            </div>
            <div class="control-group-container">
              <div class="control-label">
                <input type="password" class="verify-psw" placeholder="密码" v-model="verifyPsw" @keyup="enter($event)"/>
                <span class="psw-error error-msg">{{pswVerErr}}</span>
              </div>
            </div>
            <div class="control-group-container">
              <div class="control-label verify">
                <div class="verify-outline">
                  <input type="text" class="verify-code" placeholder="验证码" v-model="verifyCode" @keyup="enter($event)"/>
                  <span class="verify-error error-msg">{{verCodeErr}}</span>
                </div>
                <span class="compar-verify" @click="createCode">{{verCodeVal}}</span>
              </div>
            </div>
            <div class="control-group extra-group">
              <label class="auto-login">
                <span class="checkbox" :class="{active: isChecked}" @click="isCheckFn()"></span>记住账号
              </label>
              <span @click="isShowClick()">
              <router-link to="/login/retrievePsw" class="lost-pw">忘记密码？</router-link>
            </span>
            </div>
            <div class="control-group-container submit">
              <div class="control-label">
                <button @click="validateCode" type="button">登录</button>
              </div>
            </div>
          </form>
          <retrieve-psw  v-show="!isShow"></retrieve-psw>
        </div>
      </div>
      <form :action="jumpApi" method="post" v-show="false">
        <p><input type="text" name="username" v-model="verifyUser"/></p>
        <p><input type="password" name="password" v-model="verifyPsw"/></p>
        <input type="submit" value="submit"  id="test"/>
      </form>
    </div>
    <p class="copyRight">CopyRight 深圳市场景零售科技有限公司 备案号：粤ICP备17073633号-1</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import retrievePsw from './retrieve-psw/retrievePsw.vue'
  export default {
    name: 'home',
    components: {
      retrievePsw
    },
    data () {
      return {
        verCode: '', // 首先默认code为空字符串
        verCodeVal: '', // 验证码随机值
        verCodeErr: '', // 验证码错误信息
        userVerErr: '',  // 用户名错误信息
        pswVerErr: '', // 密码错误信息
        verifyUser: window.localStorage.getItem('user') || '', // 绑定用户名值
        verifyCode: '', // 绑定验证码值
        verifyPsw: '', // 绑定密码值
        isShow: true, // 默认展示登录界面:1.忘记密码展示忘记密码子组件
        iframeState: false, // 是否跳转中台
        username: '', // 请求成功调中台传用户名
        password: '', // // 请求成功调中台传密码
        isChecked: true, // 是否记住账户
        jumpApi: this.$api.LOGIN.POST_JUMPLOGIN // 登录接口校验成功跳转中台页面接口
      }
    },
    // 路由变更时检测是否显示找回密码子组件
    beforeRouteUpdate (to, from, next) {
      this.isShow = true
      next()
    },
    created () {
      this.createCode()
    },
    methods: {
      // 键盘事件
      enter (e) {
        this.userVerErr = '' // 执行键盘事件时用户提示信息制空
        this.pswVerErr = '' // 执行键盘事件时密码提示信息制空
        this.verCodeErr = '' // 执行键盘事件时验证码||用户名和密码错误信息制空
        if (e.keyCode === 13) {
          this.validateCode()
        }
      },
      // 请求登录Api
      queryLogin (userName, pasw) {
       /* this.username = userName
        this.password = pasw */
        let login = this.$api.LOGIN.POST_LOGINUSER // 校验用户登录用户名及密码是否正确
        this.axios.post(login, {
          username: userName,
          password: pasw
        }).then(response => {
          let code = response.data.code // 返回状态码--200成功、400错误
          let message = response.data.message // 返回信息提示码--0101成功、0203用户名或密码错误、0207用户名不存在
          if (response) {
            this.remUser()
            this.jumpLogin(code, message) // 跳转中台函数
            /*
              * 如果checkbox选中状态--用户名和密码存入cookie(期限为7天)
              * 否则未选中时清除cookie里用户信息，不在存入
             */
            /* if (this.isChecked === true) {
              this.getLastUser()
            } else {
              this.resetCookie()
            } */
          }
        })
      },
      remUser () {
        if (this.isChecked === true) {
          window.localStorage.setItem('user', this.verifyUser)
        } else {
          window.localStorage.removeItem('user')
        }
      },
      // 检验用 户名和密码正确则跳转中台页面
      jumpLogin (code, message) {
        if (code === '200' && message === '0101') {
          document.getElementById('test').click()  // 通过from表单请求跳转中台
        } else if (code === '400') {
          if (message === '0203') {
            this.verCodeErr = '用户名或密码错误'
          } else if (message === '0207') {
            this.verCodeErr = '用户名不存在'
          } else {
            this.verCodeErr = message
          }
        }
      },
      // 验证验随机函数
      createCode () {
        // 设置长度4
        let codeLength = 4
        // 获取模拟验证码值
//        this.codeV = document.querySelector('.compar-verify')
        this.verCode = ''
        // 设置随机字符
        let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        // 循环codeLength 设置的4就是循环4次
        for (let i = 0; i < codeLength; i++) {
          // 设置随机数范围,这设置为0 ~ 36
          let index = Math.floor(Math.random() * 36)
          // 字符串拼接 将每次随机的字符 进行拼接
          this.verCode += random[index]
        }
        // 将拼接好的字符串赋值给展示verCodeVal
        this.verCodeVal = this.verCode
      },
      // 登录验证所有
      validateCode () {
        const self = this // 重置
        let uPattern = new RegExp(/^[0-9a-zA-z-_]+$/) // 用户名正则（数字或字母皆可）
        if (self.verifyUser === '') {
          this.userVerErr = '请输入用户名'
        } else if (!uPattern.test(self.verifyUser)) {
          this.verCodeErr = '用户名或密码错误'
        } else if (uPattern.test(self.verifyUser)) {
          this.userVerErr = ''
        } else {
          this.userVerErr = '用户信息错误'
        }
        // 验证密码
//        let resPsw = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,20}$/ //  密码正则，6到20位（字母，数字，下划线，减号）
        let resPsw = new RegExp(/^[\w]{6,20}$/) // 密码[6,12为任何字符数字字符都皆可]
        if (self.verifyPsw === '') {
          this.pswVerErr = '请输入密码'
        } else if (!resPsw.test(self.verifyPsw)) {
          this.verCodeErr = '用户名或密码错误'
        } else if (resPsw.test(self.verifyPsw)) {
          this.pswVerErr = ''
        }
        // 校验验证码
//        let oValue = document.querySelector('.verify-code').value.toUpperCase() // 获取验证码值
        if (this.verifyCode === '') {
          this.verCodeErr = '请输入验证码'
        } else if (this.verifyCode !== this.verCodeVal) {
          this.verCodeErr = '验证码错误，请重新输入'
        } else {
//          console.log("verifyUser:" ,self.verifyUser,  "verifyPsw:", self.verifyPsw)
          this.queryLogin(self.verifyUser, self.verifyPsw)
        }
      },
      // 是否切换找回密码子组件
      isShowClick () {
        this.isShow = false
      },
      // 是否记住账号
      isCheckFn () {
        console.log('是否记住账号', this.isChecked)
        if (this.isChecked === true) {
          this.isChecked = false
        } else {
          this.isChecked = true
        }
      }
     /* // 记录账号
      getLastUser () {
        let guTd = '49BAC005-7D5B-4231-8CEA-16939BEACD67' // GUID标识符
        console.log('guTd:', guTd)
        let usr = this.getCookie(guTd)
        if (usr !== null) {
//          let userVal = this.verifyUser // 取用户名值
        } else {
//          let userVal = ''
        }
        this.setPwdAndChk()
      },
      getCookie (name) {
        console.log('name:', name)
        let arg = name + '='
        console.log('arg:', arg)
        let alen = arg.length
        console.log('arg:', alen)
        let clen = document.cookie.length
        console.log('clen:', clen)
        let i = 0
        while (i < clen) {
          let j = i + alen
          console.log('j:', j)
          if (document.cookie.substring(i, j) === arg) {
            return this.getCookieVal(j)
          }
          i = document.cookie.indexOf(' ', i) + 1
          if (i === 0) break
        }
        return null
      },
      getCookieVal (offset) {
        let endstr = document.cookie.indexOf(';', offset)
        if (endstr === -1) endstr = document.cookie.length
        return unescape(document.cookie.substring(offset, endstr)) // 函数可对通过 escape() 编码的字符串进行解码
      },
      // 点击登录时触发事件
      setPwdAndChk () {
        this.setLastUser(this.verifyUser) // 获取用户名
        // 如果记住密码选项被选中
        if (this.isChecked === true) {
          let pwd = this.verifyPsw // 取密码值
          console.log('pwd:', pwd)
          let expdate = new Date()
          expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000))
          this.setCookies(this.verifyUser, pwd, expdate) // 将用户名和密码写入到Cookie
        } else {
          // 如果没有选中记住密码,则立即过期
          this.resetCookie()
        }
      },
      // 将用户信息写入cookie
      setLastUser (user) {
        let self = this
        let guId = '49BAC005-7D5B-4231-8CEA-16939BEACD67'
        let expdate = new Date()
        expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000)) // 当前时间加上两周的时间
        console.log('guId:', guId, 'expdate:', expdate, 'user:', user)
        self.setCookies(guId, user, expdate)
      },
      // 未选中重置cookie信息
      resetCookie () {
        let usr = this.verifyUser
        let expdate = new Date()
        this.setCookies(usr, null, expdate)
      },
      setCookies (name, value, expires) {
        console.log(arguments)
        let argv = arguments
        let argc = arguments.length
        let expire = (argc > 2) ? argv[2] : null
         let path = (argc > 3) ? argv[3] : null
         let domain = (argc > 4) ? argv[4] : null
         let secure = (argc > 5) ? argv[5] : false
         console.log('expires:', expires, 'path:',  path, 'domain:' , domain, 'secure:' , secure)
         document.cookie = name + '=' + escape(value) + ((expire == null) ? '' : ('; expires=' + expires.toGMTString()))
         + ((path == null) ? '' : ('; path=' + path)) + ((domain == null) ? '' : ('; domain=' + domain))
         + ((secure == true) ? '; secure' : '')
        console.log(document.cookie)
      } */
    }
  }
</script>

<style lang="stylus" scoped>
  /* logo-container start */
  .login-container
    width 100%
    height 680px
    overflow hidden
    background url(/static/images/login_bg.jpg) no-repeat 0 0
    .w_960
      position relative
      height 100%
    .outer
      width 392px
      height 458px
      position absolute
      left 50%
      margin-top 60px
      text-align center
      padding 30px
      border-radius 2px
      background-color #f2f2f2
      z-index 99
      /* 表单内容块 */
      form
        /* 错误信息提示 */
        .error-msg
          color rgb(223, 74, 67)
          font-size 12px
          margin-left 5px
          height 14px
          float left
          margin-top 4px
        /* 错误信息提示 */
        h2
          font-size 26px
          margin-bottom 10px
          color rgb(46, 46, 46)
          text-align left
        /*.control-group-container:nth-child(4) .control-label input*/
          /*width 202px*/
        .control-group-container
          margin-top 26px
          width 330px
          text-align left
          .verify
            display flex
          .control-label
            .verify-outline
              /*flex 2*/
              width 202px
              input
                width 200px
            input
              width 330px
              height 46px
              line-height 46px
              display inline-block
              padding 0 10px
              border-radius 2px
              border 1px solid #CCC
            .compar-verify
              width 118px
              margin-left 10px
              line-height 46px
              height 46px
              background-color #F0F3F9
              border-radius 2px
              border 1px solid #CCC
              text-align center
              cursor pointer
              display inline-block
              letter-spacing 10px
              font-style italic
        .control-group
          margin-top 6px
          display flex
          .auto-login
            text-align left
            vertical-align middle
            display inline-block
            color rgb(46, 46, 46)
            font-size 12px
            flex 1
            .active
              background-color rgb(223, 74, 67)
              background-image url('/static/images/checked.png')
              background-position center
              background-repeat no-repeat
              border none!important
            .checkbox
              float left
              height 16px
              width 16px
              margin-right 6px
              display inline-block
              cursor pointer
              border 1px solid #a6a6a6
          .lost-pw
            flex 1
            text-align right
            color rgb(0, 145, 213)
        .submit
          button
            width 330px
            line-height 46px
            background-color rgb(223, 74, 67)
            border-radius 2px
            font-size 20px
            color #fff
            border none !important
      /* 表单内容块 */
  /* logo-container end */
  .copyRight
    color #999
    text-align center
    margin-top 20px
</style>
