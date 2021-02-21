<template>
  <div>
    <sun-nav :title="title" @sunnavitemclick="sunnavitemclick"></sun-nav>
    ddd
    <button @click="news">xin</button>
    <router-view></router-view>
  </div>
</template>

<script>
import SunNav from "@/components/subnav/SunNav";
export default {
  name: "Findmusic",
  components: {
    SunNav,
  },
  data() {
    return {
      title: ["推荐", "排行榜", "歌单", "主播电台", "歌手", "新碟上架"],
      path: "/findmusic/recommended",
    };
  },
  methods: {
    news() {
      this.$router.push("/findmusic/recommended");
    },
    sunnavitemclick(index) {
      switch (index) {
        case 0:
          this.$router.push("/findmusic/recommended");
          break;
        case 1:
          this.$router.push("/findmusic/Leaderboard");
          break;
        // default:
        //   break;
      }
    },
  },
};
</script>

<style scoped>
</style>