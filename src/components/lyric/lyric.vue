<template>
  <div>
    <div class="box">
      <div class="blur" :style=" {backgroundImage: 'url(' + songPicurl + ')'}"></div>
      <div class="title">
        <div class="title1">
          <a class="title1text">播放列表({{ songerlength }})</a>
          <a class="title1text" style="color: rgb(163, 163, 163)" @click="clearclick"
            ><i class="iconfont icon-huishouzhan" style="font-size: 16px"> </i
            >清除</a
          >
        </div>
        <div class="title2">{{songname}}</div>
      </div>
      <div class="content">
        <div class="content1">
          <ul>
            <li
              class="gqlb"
              :style="{
                'background-color': item.playshow ? 'rgba(0, 0, 0, 0.5)' : 'rgba(58, 57, 55, 0.1)',
                'color': item.playshow ? ' white' : '#9b9b9b'
              }"
              v-for="(item, index) in songli"
              :key="index"
              @click="songchange(index)"
            >
              <a
                class="iconfont icon-yousanjiaoxing"
                v-show="item.playshow"
                style="font-size: 15px; margin-left: 5px"
              ></a>
              <a class="song1" :style="{'margin-left' : item.playshow ? '0px' : '20px'}">{{ item.name }}</a>
              <a class="song2">{{ item.songer | finsonger }}</a>
              <a class="song3">{{ item.duration | currentTimeformat }}</a>
            </li>
            <!-- <li class="gqlb">
              <a class="iconfont icon-yousanjiaoxing " style="font-size: 15px;margin-left:5px"></a>
              <a class="song1">喜欢你</a>
              <a class="song2">邓紫棋</a>
              <a class="song3">04:39</a>
            </li> -->
          </ul>
        </div>
        <div class="content2">
          <p v-for="(item,index) in songlyric" :key="index" :style="{'color' : item.lyricshow ? 'white' :' black'}">
            {{item.lyric}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入过滤器组件
import { currentTimeformat } from "../../utils/mixins";
export default {
  name: "lyric",
  mixins: [currentTimeformat],
  props: {
    musicurl: "",
    currentTime: {
      type:Number,
      default : 0
    }
  },
  data() {
    return {
      songli: this.$store.state.finmusicparms,
    };
  },
  mounted() {},
  filters: {
    finsonger(songer) {
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
    },
  },
  computed: {
    songerlength() {
      if (this.$store.state.musicparms.length == 0) {
        return 0;
      } else {
        return this.$store.state.finmusicparms.length;
      }
    },
    songPicurl(){
      if (this.$store.state.musicparms.length == 0) {
        return '';
      } else {
        return this.$store.state.musicparms[0].picUrl;
      }
    },
    songname(){
      if (this.$store.state.musicparms.length == 0) {
        return '';
      } else {
        return this.$store.state.musicparms[0].name;
      }
    },
    songlyric(){
      if (this.$store.state.musicparms.length == 0) {
        return '';
      } else {
        let interval = Math.floor(this.currentTime);
        let minute = Math.floor(interval / 60)
          .toString()
          .padStart(2, "0");
        let second = (interval % 60).toString().padStart(2, "0");
        let dd =`${minute}:${second}`
        for(let i = 0;i<(this.$store.state.musicparms[0].lyric).length;i++){
          if(this.$store.state.musicparms[0].lyric[i].lyric==dd){
            console.log(1);
            return this.$store.state.musicparms[0].lyric[i].lyricshow = true
          }else{
          //   console.log(2);
          //   return this.$store.state.musicparms[0].lyric[i].lyricshow = false
          // }
          console.log(this.$store.state.musicparms[0].lyric[i].lyricshow);
        }}
        return this.$store.state.musicparms[0].lyric;
      }
    },
    // songer(){
    //   if(this.$store.state.musicparms.length == 0){
    //     return ''
    //   }else{
    //     return this.$store.state.duomusicparms[0].songer
    //   }
    // },
    // songname(){
    //   if(this.$store.state.musicparms.length == 0){
    //     return ''
    //   }else{
    //     return this.$store.state.duomusicparms[0].name
    //   }
    // },
    // duration(){
    //   if(this.$store.state.musicparms.length == 0){
    //     return  ""
    //   }else{
    //     return  this.$store.state.duomusicparms[0].duration
    //   }
    // }
  },
  methods:{
    songchange(index){
      this.$store.state.musicparms.splice(0,1,this.$store.state.finmusicparms[index])
      let index1 = this.$store.state.finmusicparms.findIndex(v=>v.id == this.$store.state.musicparms[0].id)
      for(let i = 0;i<(this.$store.state.finmusicparms).length;i++){
        if(index1 == i){
          this.$store.state.finmusicparms[i].playshow = true 
        }else{
          this.$store.state.finmusicparms[i].playshow = false 
        }
      }
      // this.$store.state.finmusicparms.filters(v=>v.id == this.$store.state.musicparms[0].id)
    },
    clearclick(){
      let length = (this.$store.state.finmusicparms).length
      if(length==0){
        this.$message.error("没有播放歌曲");
      }else{
      this.$store.state.finmusicparms.splice(0,length);
      this.$store.state.musicparms.splice(0,1)
      this.$message.success("已清空播放列表");
      this.$emit('cleartime')
      }
    },
  },

  watch:{
    musicurl(newv,oldv){
      let index = this.$store.state.finmusicparms.findIndex(v=>v.url == newv)
        for(let ii = 0;ii<(this.$store.state.finmusicparms).length;ii++){
        if(index == ii){
          this.$store.state.finmusicparms[ii].playshow = true 
        }else{
          this.$store.state.finmusicparms[ii].playshow = false 
        }
      }
      }
    }
};
</script>

<style lang="less" scoped>
.content1::-webkit-scrollbar {
  width: 6px;
  height: 200px;
}

/*滚动条滑块*/
.content1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: rgb(64, 64, 64);
}

/*滚动条轨道*/
.content1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: rgb(16, 16, 11);
}
.content2::-webkit-scrollbar {
  width: 6px;
  height: 100%;
}

/*滚动条滑块*/
.content2::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: rgb(64, 64, 64);
}


ul li {
  list-style: none;
}
.blur {
  position: absolute;
  width: 986px;
  height: 261px;
  filter: blur(1px);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: #fff;
  background-size: 1000px 1000px;
  top: 37px;
  z-index: -5;
}
.sanjiaoxing {
  width: 0;
  height: 0;
  border-left: 10px solid red;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid transparent;
  white-space: nowrap;
}
.box {
  font-size: 12px;
  width: 986px;
  height: 301px;
  .title {
    width: 100%;
    height: 40px;
    color: white;
    display: flex;
    .title1 {
      width: calc(50% - 1px);
      height: 100%;
      border-right: 1px solid rgb(56, 56, 56);
      border-radius: 5% 0 0 0;
      background-image: linear-gradient(
        to right,
        rgb(12, 12, 12),
        rgb(54, 54, 54),
        rgb(18, 18, 18)
      );
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title1text {
        padding: 0 20px;
      }
    }
    .title2 {
      width: 50%;
      height: 100%;
      border-radius: 0 5% 0 0;
      background-image: linear-gradient(
        to right,
        rgb(12, 12, 12),
        rgb(54, 54, 54),
        rgb(18, 18, 18)
      );
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .content {
    width: 100%;
    height: 261px;
    display: flex;

    .content1 {
      width: 50%;
      background-color: rgba(35, 35, 36, 0.9);
      border-top: 1px solid rgb(31, 30, 30);
      overflow-y: scroll;
      .gqlb {
        width: 100%;
        height: 29px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(0, 0, 0);

        .song1 {
          flex: 5;
          margin-left: 5px;
          
        }
        .song2 {
          flex: 1;
          
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 5px;
        }
        .song3 {
          flex: 1;
          
        }
      }
    }
    .content2 {
      width: 50%;
      height: calc(100%-1px);
      background-color: rgba(35, 35, 36, 0.9);
      border-top: 1px solid rgb(31, 30, 30);
      text-align: center;
      overflow: scroll;
      p{
        color: #9b9b9b;
        font-size: 16px;
        margin: 20px 0;
      }
    }
  }
}
</style>