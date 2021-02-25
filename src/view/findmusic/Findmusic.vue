<template>
  <div class="findmusic">
    <sun-nav :title="title" @sunnavitemclick="sunnavitemclick"></sun-nav>
    <router-view></router-view>

  </div>
</template>

<script>
//组件
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

    //点击跳到对应的字路由
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

  created(){

    //开始进入推荐页面
    this.$router.push(this.path)

  }
};
</script>

<style scoped>
  *{
    background-color: rgb(245,245,245);
  }
</style>