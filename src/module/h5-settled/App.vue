<template>
  <article class="page-contain">
    <vue-head></vue-head>
    <img src="img/logo-round.png" height="80" width="80"/>
    <h2>h5 Api文档</h2>
    <aside>
      <ul @click="select">
        <li data-to="guide">入驻指南</li>
        <li data-to="generate-url">生成免登陆url</li>
      </ul>
    </aside>
    <article>
      <component :is="curComponent"></component>
    </article>
  </article>
</template>

<script>
  import Guide from './sections/guide'
  import GenerateUrl from './sections/generate-url'
  export default {
    name: 'app',
    components: {
      'guide': Guide,
      'generate-url': GenerateUrl
    },
    data () {
      return {
        curComponent: 'guide' // 当前组件
      }
    },
    methods: {
      select (e) {
        let tar = e.target
        let curTar = e.currentTarget
        if (tar !== curTar) {
          let to = tar.dataset.to // 获取当前元素to
          this.curComponent = to // 加载to对应的组件
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
