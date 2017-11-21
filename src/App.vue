<template>
  <div id="app">
    <coco-head></coco-head>
    <router-view/>
  </div>
</template>

<script>
import cocoHead from './components/header/header'
export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    cocoHead
  }
}
</script>

<style>
  @import './assets/css/reset.styl';
  @import './assets/css/base.styl';
</style>
