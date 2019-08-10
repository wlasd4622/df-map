<template>
  <div class="map-container">
    <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
      <template v-for="(item,index) in markerList">
        <bm-marker v-if="item&&item.lat" :key="index" @click="markerHandle(item,index)" :position="item" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
      </template>
      <bm-local-search v-if="!!keyword.length" :keyword="keyword" :auto-viewport="true" :location="location" @searchcomplete="searchcomplete"></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
import list from "@/assets/js/list.js";
export default {
  data() {
    return {
      keyword: [],
      location: "北京",
      list,
      center: { lng: 116.404, lat: 39.915 },
      zoom: 13,
      markerList: []
    };
  },
  created() {},
  mounted() {
    this.$nextTick(_ => {
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        arr[i] = list[i].location || {};
      }
      this.markerList = arr;
    });
  },
  methods: {
    markerHandle(marker,index){
      console.log(marker);

      this.keyword=this.list[index].branch_name
    },
    searchcomplete(LocalResult) {
      console.log(LocalResult);
    }
  }
};
</script>

<style lang="less" scoped>
.map {
  width: 100vw;
  height: 100vh;
}
</style>

