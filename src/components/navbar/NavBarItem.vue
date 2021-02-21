<template>
  <div class="navcenter">
    <div class="left">
      <img src="../../assets/img/logo.png" alt="" class="logoimg" />
      <span class="logoname">网易云音乐</span>
    </div>

    <div class="center">
      <div
        class="title"
        :class="{active : currindex == index ,actived}  "
        @click="titleclick(index)"
        v-for="(item, index) in title"
        :key="index"
      >
        {{ item }}
        <triangle class="triangle" v-show="currindex == index"></triangle>
      </div>
    </div>

    <div class="right">
      <div class="search">
        <div class="searchicon">
          <div class="iconfont icon-search"></div>
        </div>

        <div class="searchinput">
          <input type="text" placeholder="音乐/视频/电台/用户" />
        </div>
      </div>

      <div class="czz">创作者中心</div>

      <div class="login">
        <div class="loginname">登录</div>
      </div>
    </div>

    <div class="hot">HOT</div>
  </div>
</template>

<script>
import Triangle from '@/components/subnav/Triangle'

export default {
  name: "NavBarItem",
  components:{
    Triangle
  },
  data() {
    return {
      title: ["发现音乐", "我的音乐", "朋友", "商城", "音乐人", "下载客户端"],
      currindex: 0,
    };
  },
  computed: {
    actived() {
      let path =this.$route.path;
      switch (path) {
        case "/findmusic":
          this.currindex = 0;
          break;
        case "/mymusic":
          this.currindex = 1;
          break;
        // default:
        //   break;
      }
    },
  },
  methods: {
    titleclick(index) {
      this.currindex = index;
      this.$emit("pushindex",index)
      switch (index) {
        case 0:
          this.$router.push("/findmusic");
          break;
        case 1:
          this.$router.push("/mymusic");
          break;
      }
    },
  },
};
</script>

<style scoped lang="less">
.navcenter {
  position: relative;
  display: flex;
  align-items: center;
  .left {
    cursor: pointer;
    margin-right: 10px;
    flex: 1;
    // width: 100%;
    // height: 70px;
    // background-color: yellow;
    // text-align: center;
    // line-height: 70px;
    .logoimg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .logoname {
      margin-left: 5px;
      font-size: 21px;
      color: white;
      font-family: "微软雅黑体";
    }
  }
  .center {
    flex: 4;
    height: 70px;
    line-height: 70px;
    display: flex;
    .title {
      width: 20%;
      height: 70px;
      background-color: rgb(36, 36, 36);
      text-align: center;
      color: white;
      cursor: pointer;
      font-size: 13px;
    }
    .triangle{
      margin-left: 46px;
      margin-top: -8px;
      text-align: center;
    }
    .active {
      background-color: #000;
    }
  }
  .right {
    cursor: pointer;
    flex: 2;
    display: flex;
    height: 70px;
    line-height: 70px;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    background-color: rgb(36, 36, 36);

    .search {
      display: flex;
      background-color: #fff;
      height: 35px;
      line-height: 35px;
      border-radius: 18px;
      .searchinput input {
        overflow: hidden;
        border: none;
        outline: medium;
        margin-right: 6px;
      }
    }
    .czz {
      border-radius: 30px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #999;
      font-size: 13px;
      color: rgb(204, 204, 204);
      padding: 0 5px;
    }
    .login {
      color: rgb(120, 120, 120);
      font-size: 13px;
    }
  }
  .hot {
    position: absolute;
    top: 18%;
    right: 29%;
    color: white;
    font-size: 0.1em;
    height: 10px;
    line-height: 10px;
    border-radius: 10px;
    padding: 1px 3px;
    background-color: rgb(194, 12, 12);
  }
}
.right .czz:hover {
  border: 1px solid white;
  color: #fff;
}
.right .login:hover {
  color: #fff;
}
</style>