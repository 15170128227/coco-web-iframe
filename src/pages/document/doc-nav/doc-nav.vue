<template>
  <div class="docH5-column cow_col_4" v-if="dataListFn">
    <ul class="docH5-column-left cow_col_24">
      <li class="cow_col_24">
        <router-link v-for="(item, index) in docListDatas" :to="'document?docH5id=' + item.h5Id" :data-id="item.h5Id"> {{item.docType}} </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['docListData'],
    data () {
      return {
        docListDatas: this.docListData, // 导航列表数据
        currentH5Id: '' // 默认选中API第一个
      }
    },
    created () {
    },
    computed: {
      dataListFn () {
        this.queryList()
      }
    },
    methods: {
      // 处理导航列表数据
      queryList () {
        console.log(this.docListDatas)
      },
      modifyNav (e) {
        this.$root.vm.$emit('docH5ListType', {data: {'target': e.target}})
//        this.$emit('docH5ListType', {data: {'target': e.target}})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
