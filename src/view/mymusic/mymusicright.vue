<template>
  <div>
    <div class="mymusicright">
      <div class="title">
        <div class="playlistname">
          <div class="playlistimg">
            <img style="width:208px;height:208px" :src="playlistname[0].coverImgUrl" alt="" >
          </div>

          <div class="playlistdetail">

            <div>
              <img src="../../assets/img/playlist.png" alt="" style="vertical-align: middle;">
              <span style="font-size:20px;margin-left:10px">{{playlistname[0].playlisttitle}}</span>
            </div>
            <div style="margin-top:10px">
              <img style="width:35px;height:35px;vertical-align: middle;margin-right:10px" :src="playlistname[0].avatarUrl" alt="">
              <a href="#" style="margin-right:20px;color:#0c73c2;font-size:12px">{{playlistname[0].name}}</a>
              <span style="font-size:12px;color:#999">{{playlistname[0].createTime}} 创建</span>
            </div>
            <div class="bf">
              <i class="iconfont icon-bo_fang" style="color: white;font-size:16px;vertical-align: middle;"></i>
              <a href="#" style="color: white;font-size:12px;" @click="allplay"> 播放</a>
            </div>
          </div>

        </div>
        <div class="title1">
        <div>
          <span style="font-size:20px">歌曲列表</span>
          <span style="font-size:12px;margin-left:20px;color:#666666">387首歌</span>
        </div>
        <div style="font-size:12px;color:#666666" >
          <span >播放：</span>
          <span style="color:red">3165</span>
          <span>次</span>
        </div>
        </div>
      </div>
      <div class="song">
        <div>
          <table cellspacing="0" :style="{'border-right' : loading==true ?  '': '2px solid rgb(211,211,211)','border-bottom' : loading==true ?  '': '2px solid rgb(211,211,211)'}">
            <thead style="font-size:12px">
              <tr>
                <th style="width:79px"> </th>
                <th style="width:303px">
                  <div style="width:80px">歌曲标题</div>
                </th>
                <th style="width:111px">
                  <div style="width:50px">时长</div>
                </th>
                <th style="width:103px">
                  <div style="width:50px">歌手</div>
                </th>
                <th style="width:147px">
                  <div style="width:50px">专辑</div>
                </th>

              </tr>
            </thead>
            <tbody >
              <tr v-for="(item,index) in songdata " :key="index" @click="songclick(index)">
                <td >
                  <div style="margin-left:10px;color:rgb(179,179,179)">
                    <span >{{index+1}}</span>
                    <i class="iconfont icon-bo_fang" style="margin-left:20px"></i>
                  </div>
                </td>
                <td >
                  <div style="margin-left:10px;width:280px;
                              overflow:hidden;
                              text-overflow: ellipsis;
                              white-space: nowrap;">
                    {{item.name}}
                  <i v-show="item.mv==0? false:true" class="iconfont icon-MV" style="color:#c20c0c;font-size:20px;vertical-align: middle;margin-left:5px"></i>

                  </div>
                </td>
                <td  >
                  <div style="margin-left:10px">
                    {{item.dt}}
                  </div>
                </td>
                <td  >
                  <div style="margin-left:10px;width:80px;overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;">
                    {{item.ar | finname}}
                  </div>
                </td>
                <td  >
                  <div style="margin-left:10px;overflow: hidden;width:120px;
  text-overflow: ellipsis;
  white-space: nowrap;">
                    {{item.al.name}}
                  </div>
                </td>
              </tr>
              <div v-show="loading" class="loading">
                <div class="dianzu">
                  <div class="dian" style="--i:1"></div>
                  <div class="dian" style="--i:2"></div>
                  <div class="dian" style="--i:3"></div>
                  <div class="dian" style="--i:4"></div>
                  <div class="dian" style="--i:5"></div>
                  <div class="dian" style="--i:6"></div>
                  <div class="dian" style="--i:7"></div>
                  <div class="dian" style="--i:8"></div>
                  <div class="dian" style="--i:9"></div>
                  <div class="dian" style="--i:10"></div>
                </div>

                <span>
                  加载中
                </span>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'mymusicright',
  data() {
    return{
      songdata: [],
      playlistname: [],
      loading: true
    }
  },
  filters:{
    finname(e){
      console.log(e);
      let finname = ''
      if(e.length==1){
        return e[0].name
      }else{
        for(let i=0; i<e.length;i++){
          if(i==e.length-1){
            finname = finname + e[i].name
          }else{
            finname = finname + e[i].name + '/'
          }
        }
        return finname
      }
    }
  },
  created() {
    this.$bus.$on('pushplaylisttitle',(res1)=>{
        this.playlistname = res1
        console.log(this.playlistname);

    })
    this.$bus.$on('pushsongdata',(songdata)=>{
        this.loading = false
        this.songdata = (songdata)
        this.$bus.$emit('test')
        console.log(this.songdata);
    })
    this.$bus.$on('loading',()=>{
        this.songdata = []
        this.loading = true
    })
  },
  methods:{
    songclick(index) {
      const finalyparams = []
      const id = this.songdata[index].id//音乐id
      const name = this.songdata[index].name//歌曲名字
      const picUrl = this.songdata[index].al.picUrl//歌曲图片
      let songer = this.songdata[index].ar[0].name//歌手
      // const songerlength = params.songer.length
      // if(songerlength>1){//判断多少个歌手
      //   songer = songer.map(v=>v.name)
      // }else{
      //   songer = params.songer[0].name
      // }
      finalyparams.push({id,name,picUrl,songer})//总的参数
      this.$store.dispatch('getmusicurl',finalyparams)
      this.$bus.$emit('lyrictop')
    },
    //全部播放
    allplay(){
      console.log(1);
      let res = []
      this.songdata.forEach(v => {
        res.push({ar:v.ar,id:v.id,name:v.name,dt:v.dt,mv:v.mv})
      });
      this.$bus.$emit('allplay',res)
    }
  },
  
}
</script>

<style scoped lang="less">
@keyframes dianbian {
  0%{
    background-color: rgb(169,169,169);
  }
  100%{
    background-color: red;
  }
}
.loading{
  text-align: center;
  height: 50px;
  line-height: 50px;
  position: relative;
  top: 50px;
  left: 331px;
  display: flex;
  align-items: center;
  .dianzu{
    width: 20px;
    height: 20px;
    .dian{
      width: 3px;
      height: 3px;
      background-color: rgb(169,169,169);
      position: absolute;
      transform: rotate(calc(36deg*var(--i)));
      transform-origin: 0 10px;
      animation: dianbian 1s infinite ease-in-out;
      animation-delay: calc(0.05s*var(--i));
    }
  }
}
/deep/ .el-loading-mask{
  background-color: rgba(0,0,0,0);
}
/deep/ .el-loading-spinner{}
th{
  border-right: 1px solid rgb(222,222,222);
  border-bottom: 1px solid rgb(222,222,222);
  border-collapse: collapse;
  height: 35px;
  background-image: linear-gradient(to right,rgb(248,248,248), rgb(240,240,240),rgb(248,248,248));
  color: rgb(102,102,102);
  font-weight: normal;
  }
  td{
    font-size: 12px;
  }
tr{
  height: 30px;
}

tr:nth-child(2n+1){
  background-color: rgb(247, 247, 247);
}
.bf::after{
  content: '+';
  font-size: 20px;
  color: white;
  padding: 0 10px;
  background-image: linear-gradient(rgb(59, 138, 212),rgb(31, 112, 192));
  position: absolute;
  right: -33px;
  border-left: 1px solid rgb(39,96,156);
  border-radius: 0 5px 5px 0;
}
a{
  text-decoration: none;
}
  .mymusicright{
    width: 740px;
    height: 100%;
    background-color: white;
    .title{
      width: 100%;
      height: 315px;
      background-color: white;
      border-right: 2px solid rgb(211,211,211);

      .playlistname{
        box-sizing: border-box;
        padding: 35px 30px;
        width: 100%;
        height: 280px;
        display: flex;
        .playlistimg{
          width: 208px;
          height: 208px;
          padding: 4px;
          background-color: white;
          border: 1px solid rgb(211,211,211);
        }
        .playlistdetail{
          width: 100%;
          height: 150px;
          display: flex;
          flex-direction: column;
          margin-left: 25px;
          .bf{
            width: 65px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-top: 20px;
            border-radius: 5px 0 0 5px;
            border-right: 1px solid rgb(40,97,153);
            background-image: linear-gradient(rgb(59, 138, 212),rgb(31, 112, 192));
            position: relative;
          }
        }
      }
      .title1{
        width: 100%;
        height: 35px;
        box-sizing: border-box;
        display: flex;
        padding: 0 10px 5px 30px;
        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 2px solid #c20c0c;
      }
    }
    .song{
      width: 100%;
      height: auto;
      margin-bottom: 70px;
      
    }
  }
</style>