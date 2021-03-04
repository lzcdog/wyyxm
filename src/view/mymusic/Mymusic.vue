<template>
  <div>
    <sun-nav :title="[]"></sun-nav>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-slider v-model="value1"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">自定义初始值</span>
      <el-slider v-model="value2"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">隐藏 Tooltip</span>
      <el-slider v-model="value3" :show-tooltip="false"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value4" :format-tooltip="formatTooltip"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">禁用</span>
      <el-slider v-model="value5" disabled></el-slider>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {formatDate} from '@/utils/date'
import SunNav from "@/components/subnav/SunNav";
export default {
  name: "Mymusic",
  components: {
    SunNav,
  },
  data() {
    return {
      value1: 0,
      value2: 50,
      value3: 36,
      value4: 48,
      value5: 42,
    };
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    },
    countDown(time) {
      var s = 0;


      var min = time.split(":")[0];

      var sec = time.split(":")[1];

      s =  Number(min * 60) + Number(sec);
      console.log(s);
      var oldTime = new Date(s * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      console.log(oldTime); 
      return s;
    },
  },
  mounted() {
    this.countDown('05:05');
  },
};
</script>

<style scoped>
</style>