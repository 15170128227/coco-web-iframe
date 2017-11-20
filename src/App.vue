<template>
  <div id="app">
    <vue-head></vue-head>
    <router-view/>
  </div>
</template>

<script>
import VueHead from './components/header/header'
export default {
  name: 'app',
  components: {
    VueHead
  },
  data () {
    return {}
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
