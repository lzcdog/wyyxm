<template>
  <div>

    <div class="headbox" v-show="zongshow">
      <p class="headtext">
        搜"{{searchkeyword}}"相关用户 >
      </p>
    </div>

    <div>

      <div class="searchbody">

        <!-- 单曲 -->
        <div style="display:flex" v-show="songshow">
        <div class="song">
          <i class="iconfont icon-icon-test" style="color:rgb(123, 122, 122);letter-spacing:3px;"></i><span >单曲</span>
        </div>
        <ul class="songtext">
          <li style="white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;" v-for="(item,index) in searchdata.songs" :key="index">{{item.name}}-{{item.artists[0].name}}</li>
        </ul>
        </div>

        <!-- 歌手 -->
        <div style="display:flex" v-show="songershow">
          <div class="song">
            <i class="iconfont icon-yonghu" style="color:rgb(123, 122, 122);letter-spacing:3px;"></i><span >歌手</span>
          </div>
          <ul class="songtext" style="background-color: rgb(249,249,249);">
            <li 
                      style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;"
                      v-for="(item,index) in searchdata.artists" :key="index"
                      >
                      {{item.name}}
            </li>
          </ul>
        </div>

        <!-- 专辑 -->
        <div style="display:flex" v-show="albumsshow">
          <div class="song">
            <i class="iconfont icon-CD" style="color:rgb(123, 122, 122);letter-spacing:3px;"></i><span >专辑</span>
          </div>
          <ul class="songtext" style="background-color: rgb(249,249,249);">
            <li 
                style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;"
                v-for="(item,index) in searchdata.albums" :key="index"
                >
                {{item.name}}
            </li>
          </ul>
        </div>

        <!-- 歌单 -->
        <div style="display:flex" v-show="playlistsshow">
          <div class="song">
            <i class="iconfont icon-wj-bflb" style="color:rgb(123, 122, 122);letter-spacing:3px;"></i><span >歌单</span>
          </div>
          <ul class="songtext" style="background-color: rgb(249,249,249);">
            <li 
                style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;"
                v-for="(item,index) in searchdata.playlists" :key="index"
                >
                {{item.name}}
            </li>
          </ul>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "search",
  props:{
    searchkeyword:{
      type: String,
      default: ''
    },
    searchdata: {
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  computed: {
    //判断是否显示
    songshow() {
      if(JSON.stringify(this.searchdata) === '{}'){
        return
      }else{
        if(this.searchdata.songs === undefined){
        return false
      }else{
        return true
      }
      }
      
    },
    zongshow() {
      if(JSON.stringify(this.searchdata) === '{}'){
        return false
      }
        return true
    },
    songershow() {
      if(JSON.stringify(this.searchdata) === '{}'){
        return
      }
      if(this.searchdata.artists === undefined){
        return false
      }else{
        return true
      }
    },
    albumsshow() {
      if(JSON.stringify(this.searchdata) === '{}'){
        return
      }
      if(this.searchdata.albums === undefined){
        return false
      }else{
        return true
      }
    },
    playlistsshow() {
      // console.log(this.searchdata.playlists);
      if(JSON.stringify(this.searchdata) === '{}'){
        return
      }
      if(this.searchdata.playlists === undefined){
        return false
      }else{
        return true
      }
    }
    //判断是否显示

  }
}
</script>

<style scoped lang="less">
  .headbox{
    width: 100%;
    height: 40px;
    text-align: left;
    font-size: 0.2rem;
    color: rgb(137, 137, 137);
    border-bottom: 1px solid  rgb(226, 226, 226);
    .headtext{
      margin-left: 10px;
    }
  }
  .searchbody{
    display: flex;
    flex-direction: column;
    font-size: 0.5rem;
    .song{
      width: 60px;
      height: 100%;
      text-align: center;
      background-color: rgb(255,255,255);
    }
    .songtext{
      width: 180px;
      list-style: none;
      border-left: 1px solid rgb(226, 226, 226);
      border-bottom: 1px solid  rgb(226, 226, 226);
    }
  }
li{
  width: 100%;
  height: 28px;
  text-indent: 10px
}
li:hover{
  background-color: rgb(227, 229, 231);
}
</style>
