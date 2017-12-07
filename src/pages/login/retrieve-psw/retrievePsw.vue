<template>
  <div class="retrieve-psw-outer">
    <h2>密码找回</h2>
    <div class="retrieve-pas-modal">
      <router-link v-for="(item, index) in retrievePasM" :to="{path: '/pswVerify', query: {id: item.value}}">{{item.title}}</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        retrievePasM: [
          {
            'title': '通过手机找回密码',
            'value': 'phone',
            'type': '手机号',
            'id': '1'
          },
          {
            'title': '通过邮箱找回密码',
            'value': 'email',
            'type': '邮箱',
            'id': '2'
          },
          {
            'title': '通过用户名找回密码',
            'value': 'username',
            'type': '用户名',
            'id': '3'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /* retrieve-psw-outer start */
  .retrieve-psw-outer
    padding 35px 0
    h2
      padding-bottom 20px
    .retrieve-pas-modal
      a
        color #fff
        padding 20px
        margin-top 20px
        background-color #DF4A43
        display inherit
        border-radius 2px
  /* retrieve-psw-outer end */
</style>
