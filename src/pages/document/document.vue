<template>
  <div class="doc-container">
    <div class="doc-content" v-if="docTypeId">
      <coco-doc-h5 v-if="docTypeId === '1'"></coco-doc-h5>
      <coco-doc-api v-else-if="docTypeId === '2'"></coco-doc-api>
      <!--<ul class="doc-type-btn">
        <li v-for="(item, index) in docType">
          <router-link :to="{name: 'docApi', params: {docId: item.docId}}" :class="'doc-type' + index">{{item.docType}}</router-link>
        </li>
      </ul>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cocoDocH5 from './doc-h5/doc-h5.vue'
  import cocoDocApi from './doc-api/doc-api.vue'
  export default {
    name: 'document',
    components: {
      cocoDocH5, cocoDocApi
    },
    data () {
      return {
        componentsType: {
          '1': 'cocoDocH5',
          '2': 'cocoDocApi'
        },
        docTypeId: window.sessionStorage.getItem('docTypeId'),
        docType: [{
          'docType': 'API',
          'docId': '1',
          'docHref': 'docApi'
        },
        {
          'docType': 'H5',
          'docId': '2',
          'docHref': 'docH5'
         }]
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
      background-color $defaultBg
      text-align(left)
    /* doc-content end */
  /* doc-container end */
</style>
