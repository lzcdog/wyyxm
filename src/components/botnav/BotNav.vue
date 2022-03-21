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
            <div class="imgbox">
              <img class="songimg1" :src="songpicurl" alt="" />
              <div class="beijing"></div>
            </div>
          </div>
          <!-- 歌曲信息 -->
          <div class="songdetail">
            <div style="width:80px;
                overflow:hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display:inline-block;
                vertical-align: middle;" >
              <span class="songname" >{{ songname }}</span>
            </div>
            
            <span class="songer" style="">{{ songer }}</span>

            <div class="block">
              <el-slider
                @change="sliderchange"
                v-model="value"
                :show-tooltip="false"
              ></el-slider>
            </div>
          </div>
          <!-- 歌曲时间 -->
          <div class="songtime">
            <div class="starttime">{{ currentTime | currentTimeformat }}/</div>
            <div class="endtime">{{ duration | currentTimeformat }}</div>
          </div>
        </div>
        <!-- 歌曲 -->
        <audio
          @timeupdate="updateTime"
          @canplay="getDuration"
          @ended="ended"
          :src="storemusicurl"
          ref="audio"
          autoplay="autoplay"
        ></audio>
        <!-- 其他按钮 -->
        <div class="otherclick">
          <div class="yinlianganniu">
          <div class="block1" v-show="volumeshow">
            <el-slider
              v-model="value1"
              vertical
              height="80px"
              :show-tooltip="false"
            >
            </el-slider>
          </div>
          <a
            :class="[
              muteshow ? 'iconfont icon-jingyin1' : 'iconfont icon-yinliang',
            ]"
            style="
              font-size: 18px;
              color: rgb(255, 255, 255);
              position: relative;
            "
            @click="volumecontrol"
          ></a>
          </div>

          <!-- @dblclick="mute" 双击事件 -->
          <div class="bflbanniu">
          <a
            @click="bflb"
            class="bflb iconfont icon-wj-bflb"
            style="
              margin-left:22px;
              font-size: 21px;
              color: rgb(255, 255, 255);
            "
          ></a>
          <div class="bflbnum">{{ songlength }}</div>
          </div>

          <lyric class="bflb1" 
          :style="{'visibility':bflbshow ? 'visible' : 'hidden'}" 
          :musicurl="musicurl"
          @cleartime="cleartime" 
          :currentTime="currentTime"
          :change="change"
          ref="lyric"
          ></lyric>
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
//引入播放列表组件
import lyric from "@/components/lyric/lyric";
//引入过滤器组件
import { currentTimeformat } from "../../utils/mixins";
// let timer = null
export default {
  name: "BotNav",
  mixins:[currentTimeformat],
  data() {
    return {
      pause: true,
      musicurl: "",
      value: 0,
      value1: 10,
      volumeshow: false,
      muteshow: false,
      bflbshow: false,
      currentTime: 0, //当前时间
      duration: 0,
      change: 0 
    };
  },
  components: {
    lyric,
  },

  methods: {
    //总时长
    getDuration() {
      this.duration = this.$refs.audio.duration;
      this.$store.commit('getduration',this.duration)
    },
    updateTime(e) {
      //获取audio当前播放时间
      this.currentTime = e.target.currentTime;
      //滚条自动
      this.value =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
    },
    //拖动条事件
    sliderchange(e) {
      this.$refs.audio.currentTime = Math.round(
        (e / 100) * this.$refs.audio.duration
      );
      this.currentTime =  this.$refs.audio.currentTime
      this.change+=1
      this.playshow=true
    },
    //歌曲结束
    ended(){
      const id = this.$store.state.musicparms[0].id;
      const i = this.$store.state.duomusicparms.findIndex((v) => v.id === id);
      const length = this.$store.state.duomusicparms.length;
      if (i == length - 1) {
        this.pause = true
        this.$message.error("暂无下一首");
        this.value=0
        this.currentTime= 0
      } else {
        this.$store.commit("nextmusic", this.$store.state.duomusicparms[i + 1]);
      }
    },
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
        for(let ii = 0;ii<(this.$store.state.finmusicparms).length;ii++){
        if(i-1 == ii){
          this.$store.state.finmusicparms[ii].playshow = true 
        }else{
          this.$store.state.finmusicparms[ii].playshow = false 
        }
      }
        this.$store.commit("prvmusic", this.$store.state.duomusicparms[i - 1]);
      }
      
    },
    next() {
      const id = this.$store.state.musicparms[0].id;
      const i = this.$store.state.duomusicparms.findIndex((v) => v.id === id);
      const length = this.$store.state.duomusicparms.length;
      if (i == length - 1) {
        this.$message.error("暂无下一首");
      } else {
        for(let ii = 0;ii<(this.$store.state.finmusicparms).length;ii++){
        if(ii == i+1){
          this.$store.state.finmusicparms[ii].playshow = true 
        }else{
          this.$store.state.finmusicparms[ii].playshow = false 
        }
      }
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
    volumecontrol() {
      // clearTimeout(timer)
      // timer = setTimeout(() => {

      this.volumeshow = !this.volumeshow;
      // }, 300);
    },
    startvolume() {
      this.$refs.audio.volume = this.value1 / 100;
    },
    bflb() {
      this.bflbshow = !this.bflbshow;
      this.$refs.lyric._data.transitionshow = !this.$refs.lyric._data.transitionshow
      console.log(this.$refs.lyric._data.transitionshow);
    },
    cleartime() {
      this.currentTime = 0
      this.duration = 0
    }
    // mute(){
    //   console.log(5);
    // clearTimeout(timer)
    // }
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
        let songer = this.$store.state.musicparms[0].songer;
        let finsonger = "";
        if (Array.isArray(songer)) {
          for (let i = 0; i < songer.length; i++) {
            if (i == songer.length - 1) {
              finsonger = finsonger + songer[i];
            } else {
              finsonger = finsonger + songer[i] + "/";
            }
          }
          return finsonger;
        } else {
          return songer;
        }
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
    songlength() {
      return this.$store.state.duomusicparms.length;
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
      this.$refs.audio.volume = newv / 100;
      if (this.$refs.audio.volume == 0) {
        this.muteshow = true;
      } else {
        this.muteshow = false;
      }
    },
    songpicurl(newv){
      console.log(newv);
    }
  },
  mounted() {
    this.startvolume();
    this.$bus.$on('allplay',(res)=>{
      console.log(this.$store.state.duomusicparms);
      console.log(this.$store.state.finmusicparms);

    })
  },
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
    position: relative;

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
      display: flex;
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
.imgbox{
  position: relative;
  width: 45px;
  height: 45px;
}
/deep/ .el-slider {
  position: relative;
  top: -2px;
  z-index: 555;
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
  border-left: 23px solid white;
  border-right: 23px solid transparent;
  border-bottom: 22px solid transparent;
  position: absolute;
  border-radius: 50%;
  top: 3px;
  left: 0;
  opacity: 0.2;
}
.block1 {
  /deep/ .el-slider {
    position: absolute;
    top: -125px;
    right: -10px;
    background-color: rgba(40, 40, 40, 0.9);
    padding: 10px 0;
  }
}
.bflbnum {
  width: 35px;
  height: 18px;
  line-height: 18px;
  background-color: rgb(34, 34, 34);
  position: absolute;
  top: 2px;
  right: -28px;
  z-index: -2;
  border-radius: (20px);
  color: rgb(121, 120, 120);
  font-size: 12px;
  text-align: center;
}
.bflb1 {
  position: absolute;
  top: -306px;
  left: 50%;
  transform: translateX(-50%);
}
.yinlianganniu {
  position: relative;
}
.bflbanniu {
  position: relative;
}
</style>  