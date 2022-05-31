<template>
  <div>
    <div class="mymusicleft" ref="mymusicleft" :style="height">
      <div class="content" >
        <h2>
          <a href="#" style="padding-left: 40px;">我的歌手(3)</a>
        </h2>
        <h2 style="">
          <a href="#" style="padding-left: 40px;">我的视频(4)</a>
        </h2>
        <h2>
          <a href="#" style="padding-left: 40px;">我的电台(5)</a>
        </h2>
        <div>
          <h2 style="position: relative;">
          <a href="#" style="padding-left: 40px;">创建的歌单{{playlistcount==0 ? '0' : '('+playlistcount+')'}}</a>
          <ul class="playlist" v-show="sjxshow">
            <li class="playlistdetail" v-for="(item,index) in playlistdata" :key="index"  @click="changbc(index)" :style="{'background-color': index == currindex ? 'rgb(230,230,230)' : ''}">
              <img style="width:40px;height:40px" :src="item.coverImgUrl" alt="">
                <div class="playlistdetail1">
                  <div href="#" style="font-size: 12px;font-weight:normal;overflow: hidden;width:120px;text-overflow: ellipsis;white-space: nowrap;" >{{playlistname[index]}}</div>
                  <div style="color:rgb(153,153,153)">{{item.trackCount}}首</div>
                </div>
            </li>
          </ul>
          <div class="snajiaoxing1" @click="change" v-show="sjxshow"></div>
          <div class="snajiaoxing" @click="change" v-show="!sjxshow"></div>

          </h2>
        </div>
        </div>
        
    </div>
    <a data-v-5691a8ff="" href="https://beian.miit.gov.cn/">CopyRight © 粤ICP备2021142241号</a>

  </div>
</template>

<script>
import {getplaylist} from '../../network/login'
import {playlistdetail,songdetai} from '../../network/playlist'
import {formatDate} from '../../assets/js/tool'

export default {
  name: 'mymusicleft',
  data(){
    return{
      sjxshow: true,
      playlistdata: [],
      currindex: 0,
      name: [],
      height: 0,
      data: {},
      songdata: []
    }
  },
  created(){
    this.getplaylistdata()
  },
  methods:{
    change(){
      this.sjxshow = !this.sjxshow
    },
    //获取歌单名字
    async getplaylistdata (){
      const {playlist} = await getplaylist({uid:this.$store.state.user.userinfo[0].userId})
      this.playlistdata = playlist
      //created 获取第一个歌单
      let index = 0
      const res = await playlistdetail({id:this.playlistdata[index].id,cookie:"NMTID=00Ok9Qfr2GGRmNNmk8LmKTvTK_I8RkAAAF5-9YACA; Max-Age=315360000; Expires=Mon, 9 Jun 2031 16:09:36 GMT; Path=/;;MUSIC_U=aead2bff78885c53ab2778c302587835256bdcfea3c4e964e6c79f8e2784189633a649814e309366; Max-Age=1296000; Expires=Sat, 26 Jun 2021 16:09:36 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Sat, 26 Jun 2021 16:09:36 GMT; Path=/;;__csrf=c4cec0705b648c322d4b4896b15cbecc; Max-Age=1296010; Expires=Sat, 26 Jun 2021 16:09:46 GMT; Path=/;"})
      let res1 = []
      let songid = []
      const coverImgUrl = res.playlist.coverImgUrl
      res1.push({playlisttitle:this.name[index],avatarUrl:this.playlistdata[index].creator.avatarUrl,name:this.playlistdata[index].creator.nickname,coverImgUrl:coverImgUrl,createTime:res.playlist.createTime})
      res.playlist.trackIds.map(v=>songid.push(v.id))
      this.$bus.$emit('pushplaylisttitle',res1)
      let songid1 = songid.toString()
      let res2 = await songdetai({ids:songid1})
      let res3 = res2.songs.map(v=>{
        v.dt = formatDate(new Date(v.dt),'mm:ss')
        return v
      })
      this.$bus.$emit('pushsongdata',res3)
    },

    //发送到right
    async changbc(index) {
      this.$bus.$emit('loading')
      this.currindex = index
      const res = await playlistdetail({id:this.playlistdata[index].id,cookie:"NMTID=00Ok9Qfr2GGRmNNmk8LmKTvTK_I8RkAAAF5-9YACA; Max-Age=315360000; Expires=Mon, 9 Jun 2031 16:09:36 GMT; Path=/;;MUSIC_U=aead2bff78885c53ab2778c302587835256bdcfea3c4e964e6c79f8e2784189633a649814e309366; Max-Age=1296000; Expires=Sat, 26 Jun 2021 16:09:36 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Sat, 26 Jun 2021 16:09:36 GMT; Path=/;;__csrf=c4cec0705b648c322d4b4896b15cbecc; Max-Age=1296010; Expires=Sat, 26 Jun 2021 16:09:46 GMT; Path=/;"})
      let res1 = []
      let songid = []
      const coverImgUrl = res.playlist.coverImgUrl
      res1.push({playlisttitle:this.name[index],avatarUrl:this.playlistdata[index].creator.avatarUrl,name:this.playlistdata[index].creator.nickname,coverImgUrl:coverImgUrl,createTime:res.playlist.createTime})
      res.playlist.trackIds.map(v=>songid.push(v.id))
      this.$bus.$emit('pushplaylisttitle',res1)
      let songid1 = songid.toString()
      let res2 = await songdetai({ids:songid1})
      let res3 = res2.songs.map(v=>{
        v.dt = formatDate(new Date(v.dt),'mm:ss')
        return v
      })
      this.$bus.$emit('pushsongdata',res3)
      // const length = songid.length
    },
  },
  computed:{
    //歌单数量
    playlistcount() {
      return (this.playlistdata).length
    },
    playlistname() {
      this.playlistdata.map(v=>{
        let regexp = eval('/^'+v.creator.nickname+'/g')
        let name1 = v.name.split(regexp)
        if(name1.length == 1){
          this.name.push(...name1)
        }else{
          this.name.push('我' + name1[1])
        }
      })
      return this.name
    }
  },
}
</script>

<style scoped lang="less">
.mymusicleft::-webkit-scrollbar {
  width: 0px;
  height: 100%;
}

/*滚动条滑块*/
.mymusicleft::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;
  background: rgb(236, 236, 236);
}
/*滚动条轨道*/
.mymusicleft::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: rgb(249, 249, 249);
}
a{
  text-decoration: none;
  color: #000;
  font-size: 15px;
}
  
  .mymusicleft{
    width: 240px;
    height: 100%;
    background-color: rgb(249,249,249);
    border-left: 1px solid rgb(211,211,211);
    border-right: 1px solid rgb(211,211,211);
    overflow: hidden;
    overflow-y: scroll;
    position: fixed;
    top: 0px;
    z-index: 1;
    .content{
      width: 100%;
      height: 100%;
      padding: 100px 0 0 0;
      box-sizing: border-box;
      h2{
        padding: 5px 0;
      }
      .snajiaoxing{
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid rgb(204,204,204);
        position: absolute;
        top: 14px;
        left: 23px;
      }
      .snajiaoxing1{
        width: 0;
        height: 0;
        border-top: 8px solid  rgb(204,204,204);
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid transparent;
        position: absolute;
        top: 18px;
        left: 18px;
      }
      .playlist{
        width: 100%;
        height: 100%;
        list-style: none;
        .playlistdetail{
          width: 100%;
          height: 40px;
          display: flex;
          margin-top: 7px;
          padding: 8px 20px;
          
          .playlistdetail1{
            display: flex;
            flex-direction: column;
            font-size: 12px;
            width: 100%;
            box-sizing: content-box;
            justify-content: space-between;
            margin-left: 10px;
          }
        }
      }
    }
  }
  
</style>