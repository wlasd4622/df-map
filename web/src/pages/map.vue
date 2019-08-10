<template>
  <div class="map-container">
    <div id="container">
      <div id="l-map"></div>
      <div id="r-result"></div>
    </div>

  </div>
</template>

<script>
import list from "@/assets/js/list.js";
export default {
  data() {
    return {
      msg: "6661",
      list
    };
  },
  mounted() {
    // 百度地图API功能
    var map = new BMap.Map("l-map"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    var myKeys = ["酒店", "加油站"];
    var local = new BMap.LocalSearch(map, {
      renderOptions: { map: map, panel: "r-result" },
      pageCapacity: 5
    });
    local.searchInBounds(myKeys, map.getBounds());
  }
};
</script>
