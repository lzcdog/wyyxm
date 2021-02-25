<template>
  <div>
    <div class="botnav">
      <div class="left">dddd</div>

      <!-- 播放器 -->
      <div class="center">

        <!-- 播放按钮 -->
        <div class="bfclick">

          <!-- 前一首 -->
          <a class="prv" title="上一首">
            <div
              class="iconfont icon-shangyishou"
              style="font-size: 25px; color: rgb(192, 192, 192)"
            ></div>
          </a>
          <!-- 前一首 -->

          <!-- 暂停/播放 -->
          <a class="play-pause" @click="bfclick">
            <div
              class="iconfont icon-bo_fang"
              style="font-size: 35px; color: rgb(255, 255, 255)"
              v-show="pause"
            ></div>
            <div
              class="iconfont icon-zantingtingzhi2"
              style="font-size: 36px; color: rgb(255, 255, 255)"
              v-show="!pause"
            ></div>
          </a>
          <!-- 暂停/播放 -->

          <!-- 后一首 -->
          <a class="next">
            <div
              class="iconfont icon-prev"
              style="font-size: 25px; color: rgb(192, 192, 192)"
            ></div>
          </a>
          <!-- 后一首 -->
          
        </div>
        <!-- 播放按钮 -->

        <!-- 歌曲 -->
        <div class="song">
          <!-- 歌曲头像 -->
          <div class="songimg">
            <img class="songimg1" src="http://p1.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg" alt="">
          </div>
          <!-- 歌曲信息 -->
          <div class="songdetail">
            <span class="songname">别勉强</span>
            <span class="songer">邓紫棋</span>
            <el-progress style="margin-top:5px"  :stroke-width="8" color="rgb(199,12,12)" :percentage="50" ></el-progress>
          </div>
          <!-- 歌曲时间 -->
          <div class="songtime">
            <div class="starttime">00:00/ </div>
            <div class="endtime"> 04:00</div>
          </div>
        </div>
        <!-- 歌曲 -->

        <!-- 其他按钮 -->
        <div class="otherclick">
          <div class="iconfont icon-yinliang" style="font-size: 20px; color: rgb(255, 255, 255)"></div>
        </div>
        <!-- 其他按钮 -->

      </div>
      <!-- 播放器 -->

      <!-- 固定器 -->
      <div class="right"></div>
      <!-- 固定器 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "BotNav",
  data() {
    return {
      pause: true,
    };
  },
  methods: {
    // puash() {
    //   this.$refs.audio.pause()  audio.play();
    // },

    //设置播放暂停图标
    bfclick(){
      this.pause = !this.pause
    }

  },
};
</script>

<style scoped lang="less">
.botnav {
  width: 100%;
  height: 50px;
  display: flex;
  background-color: rgb(42, 42, 42);
  .left {
    flex: 2;
    height: 50px;
  }
  .center {
    flex: 5;
    display: flex;
    justify-content: space-between;
    height: 50px;

    .bfclick {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-around;
    }
    .song {
      flex:5;
      display: flex;
      justify-content: center;
      .songimg{
        text-align: center;
        flex: 1;
        .songimg1{
          border-radius: 50%;
          width: 45px;
          height: 45px;
          margin: 2.5px 0;
        }
      }
      .songdetail{
        flex: 5;
        color: #fff;
        margin-top: 5px;
        font-size: 14px;
        .songname{
          color: rgb(222,222,222);
          margin-right: 5px;
        }
        .songer{
          color: rgb(132,132,132);
        }
      }
      .songtime{
        flex: 1;
        display: flex;
        align-items: flex-end;
        margin-bottom: 5px;
        .starttime{
          color: rgb(161,161,161);
        }
        .endtime{
          color: rgb(161,161,161);
        }
      }
    }
    .otherclick {
      align-self: flex-end;
      margin-bottom: 5px;
      flex: 1;
    }
  }

  .right {
    flex: 2;
    height: 50px;
  }
}
/deep/ .el-progress__text{
  display: none;
}
</style>