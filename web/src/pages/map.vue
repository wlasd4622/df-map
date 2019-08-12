<template>
  <div class="map-container">
    <div v-if="keyword" pane="labelPane" :class="{sample: true, active:true}">
      <div>{{keyword}}</div>
    </div>
    <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

      <template v-for="(item,index) in markerList">
        <bm-marker v-if="item&&item.lat" :key="index" @click="markerHandle(item,index)" :icon="icon" :position="item" :dragging="true" animation="BMAP_ANIMATION_DROP">
        </bm-marker>
      </template>
      <!-- <bm-local-search v-if="!!keyword.length" :keyword="keyword" :auto-viewport="true" :location="location" @searchcomplete="searchcomplete"></bm-local-search> -->
    </baidu-map>
  </div>
</template>

<script>
import list from "@/assets/js/list.js";
export default {
  data() {
    return {
      icon: {
        url: "https://wlasd4622.github.io/df-map/web/dist/static/icon1.png",
        size: { width: 15, height: 15 },
        opts: {
          imageSize: {
            width: 15,
            height: 15
          }
        }
      },
      keyword: "",
      location: "北京",
      list,
      center: list[0].location,
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
    markerHandle(marker, index) {
      console.log(marker);
      this.keyword = this.list[index].branch_name;
      console.log(this.keyword);
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

<style lang="less">
.sample {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: fixed;
  // top:10px;
  bottom: 0;
  left: 0;
  z-index: 99;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>


