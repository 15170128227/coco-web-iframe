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
                <input type="text" class="verify-user" placeholder="用户名" @keyup.13="enter($event)"/>
                <span class="user-error error-msg">{{userVerErr}}</span>
              </div>
            </div>
            <div class="control-group-container">
              <div class="control-label">
                <input type="password" class="verify-psw" placeholder="密码" @keyup.13="enter($event)"/>
                <span class="psw-error error-msg">{{pswVerErr}}</span>
              </div>
            </div>
            <div class="control-group-container">
              <div class="control-label verify">
                <div class="verify-outline">
                  <input type="text" class="verify-code" placeholder="验证码" @keyup.13="enter($event)"/>
                  <span class="verify-error error-msg">{{verCodeErr}}</span>
                </div>
                <span class="compar-verify" @click="createCode">{{verCodeVal}}</span>
              </div>
            </div>
            <div class="control-group extra-group">
              <label class="auto-login">
                <input type="checkbox" checked/>
                记住账号
              </label>
              <span @click="isShowClick()">
              <router-link to="/login/retrievePsw" class="lost-pw">忘记密码？</router-link>
            </span>
            </div>
            <div class="control-group-container submit">
              <div class="control-label">
                <button class="" @click="validateCode" type="button">登录</button>
              </div>
            </div>
          </form>
          <retrieve-psw  v-show="!isShow"></retrieve-psw>
        </div>
      </div>
      <form :action="jumpApi" method="post" v-show="false">
        <p><input type="text" name="username" v-model="username"/></p>
        <p><input type="password" name="password" v-model="password"/></p>
        <input type="submit" value="登录"  id="test"/>
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
        isShow: true, // 默认展示登录界面:1.忘记密码展示忘记密码子组件
        iframeState: false, // 是否跳转中台
        username: '', // 请求成功调中台传用户名
        password: '', // // 请求成功调中台传密码
        jumpApi: this.$api.LOGIN.POST_JUMPLOGIN
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.isShow = true
      next(vm => {
      })
    },
    created () {
      this.createCode()
    },
    methods: {
      /* test () {
        console.log('111')
        document.getElementById('test').click()
      }, */
      enter (e) {
        if (e.keyCode === 13) {
          this.validateCode()
        }
      },
      // 请求登录Api
      queryLogin (userName, pasw) {
        this.username = userName
        this.password = pasw
        let login = this.$api.LOGIN.POST_LOGINUSER
        this.axios({
          method: 'post',
          url: login,
          data: {
            username: userName,
            password: pasw
          }
        }).then(response => {
          if (response) {
            console.log(response)
            if (response.data.code === '200' && response.data.message === '0101') {
              document.getElementById('test').click()
            } else if (response.data.code === '400') {
              if (response.data.message === '0203') {
                this.verCodeErr = '用户名或密码错误'
              } else if (response.data.message === '用户不存在！') {
                this.verCodeErr = '用户名不存在'
              } else {
                this.verCodeErr = response.data.message
              }
            }
          }
        })
      },
      // 登录请求成功跳转中台
      jumpLogin (userName, pasw) {
        /* let loginIndex = 'http://192.168.1.25:8007/tsh-mg/login'
        this.axios({
          method: 'post',
          url: loginIndex,
          // 请求头信息
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            username: userName,
            password: pasw
          }
        }).then(res => {
          console.log(res)
        }) */
        /* this.iframeState = true
        this.url = 'http://192.168.1.25:8007/tsh-mg/login?username=' + userName + '&password=' + pasw */
//        let form = document.createElement('form')
       /* let iframe = document.createElement('iframe')
        console.log('iframe', iframe)
        iframe.src = 'http://192.168.1.25:8007/tsh-mg/login?username=' + userName + '&password=' + pasw
        console.log('iframe.src', iframe.src)
        let cssLink = iframe.contentWindow.document.getElementsByTagName('link')[0]
        console.log('cssLink', cssLink)
        cssLink.href = cssLink.href.replace(/\w+\/(?=css)/g, 'dist/static/')
        console.log('cssLink.href', cssLink.href)
        let jsScript = iframe.contentWindow.document.getElementsByTagName('script')
        console.log('jsScript', jsScript)
        // debugger;
        for (let i = 0; i < jsScript.length; i++) {
          jsScript[i].src = jsScript[i].src.replace(/\w+\/(?=js)/g, 'dist/static/')
        }
        document.body.appendChild(iframe) */
      },
      // 验证用户名
      userVerify () {
        let verifyUser = document.querySelector('.verify-user').value
        let uPattern = /^[A-Za-z0-9]+$/ // 用户名正则（数字或字母）
        if (verifyUser === '0') {
          this.userVerErr = '请输入用户名'
        } else if (!uPattern.test(verifyUser)) {
          this.verCodeErr = '用户名或密码不正确'
        } else if (uPattern.test(verifyUser)) {
          this.userVerErr = ''
        } else {
          this.userVerErr = '该手机未注册'
        }
      },
      // 验证密码
      /* pswVerify () {
        let verifyPsw = document.querySelector('.verify-psw').value
        let resPsw = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,20}$/ //  密码正则，6到20位（字母，数字，下划线，减号）
        if (verifyPsw === '0') {
          this.pswVerErr = '请输入密码'
        } else if (!resPsw.test(verifyPsw)) {
          this.verCodeErr = '用户名或密码不正确'
        } else {
          this.pswVerErr = ''
        }
      }, */
      // 验证验随机函数
      createCode () {
        // 设置长度，这里看需求，我这里设置了4
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
      // 验证码验证
      /* verifyCode () {
        // 获取验证码值
        let oValue = document.querySelector('.verify-code').value.toUpperCase()
        if (oValue === '0') {
          this.verCodeErr = '请输入验证码'
        } else if (oValue !== this.verCodeVal) {
          this.verCodeErr = '验证码不正确，请重新输入'
          this.createCode()
        } else {
          this.verCodeErr = ''
        }
      }, */
      // 登录验证所有
      validateCode () {
       /* this.userVerify() // 校验用户名
        this.pswVerify() // 校验密码
        this.verifyCode() // 校验验证码 */
        const verifyUser = document.querySelector('.verify-user').value
        let uPattern = /^[0-9a-zA-z-_]+$/ // 用户名正则（数字或字母）
        if (verifyUser === '') {
          this.userVerErr = '请输入用户名'
        } else if (!uPattern.test(verifyUser)) {
          this.verCodeErr = '用户名或密码错误'
        } else if (uPattern.test(verifyUser)) {
          this.userVerErr = ''
        } else {
          this.userVerErr = '该手机未注册'
        }
        // 验证密码
        const verifyPsw = document.querySelector('.verify-psw').value
        console.log(verifyPsw)
//        let resPsw = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,20}$/ //  密码正则，6到20位（字母，数字，下划线，减号）
        let resPsw = /^[\w]{6,20}$/
        if (verifyPsw === '') {
          this.pswVerErr = '请输入密码'
        } else if (!resPsw.test(verifyPsw)) {
          this.verCodeErr = '用户名或密码错误'
        } else if (resPsw.test(verifyPsw)) {
          this.pswVerErr = ''
        }
        // 校验验证码
        // 获取验证码值
        let oValue = document.querySelector('.verify-code').value.toUpperCase()
        if (oValue === '') {
          this.verCodeErr = '请输入验证码'
        } else if (oValue !== this.verCodeVal) {
          this.verCodeErr = '验证码错误，请重新输入'
        } else {
          this.queryLogin(verifyUser, verifyPsw)
        }
      },
      isShowClick () {
        this.isShow = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  /* logo-container start */
  .login-container
    width 100%
    height 680px
    overflow hidden
    background url(/static/images/login_bg.jpg) no-repeat center
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
        .control-group
          margin-top 20px
          display flex
          .auto-login
            text-align left
            color rgb(46, 46, 46)
            font-size 12px
            flex 1
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
