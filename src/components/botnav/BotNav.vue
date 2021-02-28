<template>
  <div>
    <div class="botnav">
      <div class="left"></div>

      <!-- 播放器 -->
      <div class="center">
        <!-- 播放按钮 -->
        <div class="bfclick">
          <!-- 前一首 -->
          <a class="prv" title="上一首" @click="prv">
            <div
              class="iconfont icon-shangyishou"
              style="font-size: 25px; color: rgb(192, 192, 192)"
            ></div>
          </a>
          <!-- 前一首 -->

          <!-- 暂停/播放 -->
          <a class="play-pause" @click="bfclick">
            <div
              :class="[
                pause
                  ? 'iconfont icon-bo_fang'
                  : 'iconfont icon-zantingtingzhi2',
              ]"
              style="font-size: 35px; color: rgb(255, 255, 255)"
              @click="playpause"
            ></div>
          </a>
          <!-- 暂停/播放 -->

          <!-- 后一首 -->
          <a class="next" @click="next">
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
            <img class="songimg1" :src="songpicurl" alt="" />
            <div class="beijing"></div>
          </div>
          <!-- 歌曲信息 -->
          <div class="songdetail">
            <span class="songname">{{ songname }}</span>
            <span class="songer" v-for="item in songer" :key="item">{{
              item
            }}</span>

            <div class="block">
              <el-slider v-model="value" :show-tooltip="false"></el-slider>
            </div>
          </div>
          <!-- 歌曲时间 -->
          <div class="songtime">
            <div class="starttime">00:00/</div>
            <div class="endtime">04:00</div>
          </div>
        </div>
        <!-- 歌曲 -->
        <audio :src="storemusicurl" ref="audio" autoplay="autoplay"></audio>
        <!-- 其他按钮 -->
        <div class="otherclick">
          <div
            class="iconfont icon-yinliang"
            style="font-size: 18px; color: rgb(255, 255, 255);position: relative;"
            @click="volumecontrol"
          ></div>
          <div class="block1" v-show="volumeshow">
            <el-slider v-model="value1" vertical height="80px" :show-tooltip="false"> </el-slider>
          </div>
        </div>
        <!-- 其他按钮 -->
      </div>
      <!-- 播放器 -->

      <!-- 固定器 -->
      <div class="right" style="color: red"></div>
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
      musicurl: "",
      value: 0,
      value1: 50,
      volumeshow: false
    };
  },
  methods: {
    //暂停/播放方法
    playpause() {
      if (this.pause) {
        if (this.musicurl == "") {
          this.$message.error("没有音乐播放");
          this.pause = false;
        } else {
          this.$refs.audio.play();
        }
      } else {
        this.$refs.audio.pause();
      }
    },
    prv() {
      const id = this.$store.state.musicparms[0].id;
      const i = this.$store.state.duomusicparms.findIndex((v) => v.id === id);
      if (i == 0) {
        this.$message.error("暂无上一首");
      } else {
        this.$store.commit("prvmusic", this.$store.state.duomusicparms[i - 1]);
      }
    },
    next() {
      const id = this.$store.state.musicparms[0].id;
      const i = this.$store.state.duomusicparms.findIndex((v) => v.id === id);
      const length = this.$store.state.duomusicparms.length;
      console.log(length);
      if (i == length - 1) {
        this.$message.error("暂无下一首");
      } else {
        this.$store.commit("nextmusic", this.$store.state.duomusicparms[i + 1]);
      }
      // if(i==0){
      //     this.$message.error("暂无下一首");
      // }else{
      //   this.$store.commit('nextmusic',this.$store.state.duomusicparms[i])
      // }
    },
    // this.$refs.audio.puash()
    // if(this.musicurl==''){
    //
    // }else{
    //
    // }

    //设置播放暂停图标
    bfclick() {
      this.pause = !this.pause;
    },
    volumecontrol(){
      this.volumeshow = !this.volumeshow
    },
    startvolume () {
      this.$refs.audio.volume = (this.value1)/100
    }
  },
  computed: {
    songpicurl() {
      if (this.$store.state.musicparms.length == 0) {
        return require("../../assets/img/nomusic.png");
      } else {
        return this.$store.state.musicparms[0].picUrl;
      }
    },
    songer() {
      if (this.$store.state.musicparms.length == 0) {
        return "";
      } else {
        return this.$store.state.musicparms[0].songer;
      }
    },
    songname() {
      if (this.$store.state.musicparms.length == 0) {
        return "";
      } else {
        return this.$store.state.musicparms[0].name;
      }
    },
    storemusicurl() {
      if (this.$store.state.musicparms.length == 0) {
        return "";
      } else {
        return (this.musicurl = this.$store.state.musicparms[0].url);
      }
    },
  },
  // 监听musicurl有没有数据播放按钮变化
  watch: {
    musicurl(newv, oldv) {
      if (newv) {
        this.pause = false;
      } else {
        this.pause = true;
      }
    },
    value1(newv) {
      this.$refs.audio.volume = (newv)/100
    }
  },
  mounted(){
    this.startvolume()
  }
};
</script>

<style scoped lang="less">
.botnav {
  width: 100%;
  height: 50px;
  display: flex;
  padding: 5px 0;
  background-image: linear-gradient(to right, rgb(46, 46, 46), rgb(48, 48, 48));
  box-shadow: 1px 0 3px rgb(34, 33, 33);
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
      flex: 5;
      display: flex;
      justify-content: center;
      .songimg {
        text-align: center;
        flex: 1;
        position: relative;
        .songimg1 {
          border-radius: 50%;
          width: 45px;
          height: 45px;
          margin: 2.5px 0;
        }
      }
      .songdetail {
        flex: 5;
        color: #fff;
        margin-top: 5px;
        font-size: 14px;
        .songname {
          color: rgb(222, 222, 222);
          margin-right: 5px;
        }
        .songer {
          color: rgb(132, 132, 132);
        }
      }
      .songtime {
        flex: 1;
        display: flex;
        align-items: flex-end;
        margin-bottom: 2px;
        margin-left: 15px;
        .starttime {
          color: rgb(161, 161, 161);
        }
        .endtime {
          color: rgb(161, 161, 161);
        }
      }
    }
    .otherclick {
      margin-top: 20px;
      flex: 1;
      margin-left: 15px;
    }
  }

  .right {
    flex: 2;
    height: 50px;
  }
}
/deep/ .el-slider {
  position: relative;
  top: -2px;
}
/deep/.el-slider__runway {
  background-color: rgb(25, 25, 25);
}
/deep/ .el-slider__bar {
  background-color: rgb(199, 12, 12);
}
/deep/ .el-slider__button {
  width: 6px;
  height: 6px;
  border-color: white;
  background-color: white;
}
.beijing {
  width: 0px;
  height: 0px;
  border-top: 22px solid white;
  border-left: 22px solid white;
  border-right: 22px solid transparent;
  border-bottom: 22px solid transparent;
  position: absolute;
  border-radius: 50%;
  top: 3px;
  left: 30px;
  opacity: 0.2;
}
.block1{
  /deep/ .el-slider{
    position: absolute;
    top: -100px;
    right: 542px;
    background-color: rgba(40, 40, 40, 0.9);
    padding: 10px 0;
  }
}
</style>