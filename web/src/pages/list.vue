<template>
  <div class="list-containser">
    <ul>
      <li v-for="item in list" :key="item.activity_id">
        <div class="left">
          <img :src="item.item_pic" alt="">
        </div>
        <div class="right">
          <p>{{item.item_name}}</p>
          <p>{{item.branch_name}}</p>
          <!-- <p>活动ID：{{item.activity_id}}</p> -->
          <p>原价：￥{{item.market_price/100}}</p>
          <p>始价：￥{{item.start_price/100}}</p>
          <p>底价：￥{{item.floor_price/100}}</p>
          <p>现价：￥{{item.current_price/100}}</p>
          <!-- <p>{{item.bargain_range}}</p>
          <p>{{item.bargain_count}}</p> -->
          <!-- <p>距离：{{item.distance/1000}}km</p> -->
          <!-- <p>议价：{{item.is_bargained}}</p>
          <p>出售：{{item.is_sold}}</p>
          <p>新：{{item.is_new}}</p> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import list from "@/assets/js/list.js";
export default {
  data() {
    return {
      msg: "666",
      list
    };
  }
};
</script>
<style lang="less" scoped>
ul {
  li {
    padding: 10px;
    display: flex;
    img {
      width: 100px;
    }
    .left {
      width: 100px;
      margin-right: 10px;
    }
    .right {
      flex: 1;
    }
  }
}
</style>

