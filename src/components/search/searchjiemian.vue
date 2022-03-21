<template>
  <div class="searchjiemian">
    <sun-nav :title="[]"></sun-nav>
    <div class="center">
      <div class="searchinput">
        <div class="inputbox" @click="inputsearch" @keydown.enter="inputsearch">
          <input type="text" class="input" v-model="searchdata" >
        </div>
      </div>
      <div class="searchresults">
        <div class="resultsspan">
          <span>搜索"{{finkeyword}}",找到<span style="color:rgb(194, 12, 12)">{{count}}</span>{{title[currindex].text+title[currindex].value}}</span>
        </div>
        <div class="options">
          <ul class="optionsul">
            <li @click="liclick(index)" v-for="(item,index) in title" :key="index" :class="currindex == index ? 'active':'optionsli'">{{item.value}}</li>
          </ul>
        </div>
        <div class="list">
          <ul>
            <li class="listli" v-for="(item,index) in songdata" :key="index" @click="songplay(index)">
              <div class="songname">
              
                <i class="iconfont icon-bo_fang" style="vertical-align: middle;color:rgb(179, 179, 179)" :style="{color:index1 == index ? 'rgb(235, 5, 5)' : ''}"></i>
                <!-- :style="{color: searchdata.toLowerCase() == sss.toLowerCase() || sss.indexOf(searchdata.toLowerCase())!=-1 ? 'blue' :''}" -->
                <span class="songnamespan" >{{item.name}}</span>
                <i class="iconfont icon-MV" style="vertical-align: middle;color:rgb(184, 11, 12)" v-show="item.mv!=0"></i>
              </div>
              <div class="songer">
                <span>{{item.ar | songname}}</span>
              </div>
              <div class="albumname" >
                  {{item.al.name | albumname}}
              </div>
              <div class="time">
                {{item.dt | fintime}}
              </div>
            </li>
          </ul>
        </div>
        <div class="Pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size = 30
            @current-change = "numclick"
            :current-page = currpage
            :total="count">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="recommendbottom1">
      <bottom class="recommendbottom2"></bottom>
    </div>
  </div>
</template>

<script>
import SunNav from '@/components/subnav/SunNav'
import bottom from '@/components/bottom/bottom'
import {searchlist} from '../../network/search'
import {formatDate} from '../../assets/js/tool'
export default {
  name: 'searchjiemian',
  data(){
    return{
      title:[
        {
          value: '单曲',
          id: 1,
          text: '首'
        },
        {
          value: '歌手',
          id: 100,
          text: '个'
        },
        {
          value: '专辑',
          id: 10,
          text: '张'
        },
        {
          value: '视频',
          id: 1014,
          text: '个'
        },
        {
          value: '歌词',
          id: 1006,
          text: '个'
        },
        {
          value: '歌单',
          id: 1000,
          text: '个'
        },
        {
          value: '声音主播',
          id: 1018,
          text: '个'
        },
        {
          value: '用户',
          id: 1002,
          text: '个'
        }
      ],
      currindex: 0,
      searchdata: '',
      count: 0,
      songdata: [],
      currpage: 0,
      index1: -1
    }
  },
  components: {
    SunNav,
    bottom
  },
  filters: {
    songname(e) {
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
    },
    albumname(e){
      if(e==''){
        return ''
      }else{
        return '《'+e+'》'
      }
    },
    fintime(v) {
      return v = formatDate(new Date(v),'mm:ss')
    },
  },
  created() {
    this.searchlistdata()
    this.$bus.$on('againsearch',(searchkeyword)=>{
      console.log(searchkeyword);
      this.currpage = 1
      this.searchlistdata(searchkeyword)
    })
  },
  computed:{
    finkeyword() {
      return  this.searchdata = this.$route.query.keyword
    },
    // include() {
    //   let keyword = this.$route.query.keyword;
    //   return function(v){
    //         var Regex = eval('/'+keyword+'/ig');
    //         console.log(Regex,v);
    //         return Regex.test(v);
    //     }

    // }
  },
  methods: {
    //选项切换
    liclick(index) {
      this.currindex = index
      this.searchlistdata(this.title[index].id)
    },
    //获取query的keywork后请求
    async searchlistdata(keyword,index) {
      let searchlistdata =[]
        console.log(keyword);

      if(index===undefined){
        index = 1

        searchlistdata = await searchlist({keywords:this.$route.query.keyword,type:index,offset:0})
        console.log(1);
      }else{
        console.log(index);
        searchlistdata = await searchlist({keywords:keyword,type:index,offset:Math.abs((this.currpage-1)*30)})
        console.log(searchlistdata);
      }
      console.log(searchlistdata,index);
      switch (index) {
          //单曲
        case 1:
          this.count = searchlistdata.result.songCount
          this.songdata = searchlistdata.result.songs
          break;

          //歌手
        case 100:
          this.count = searchlistdata.result.artistCount
          break;

          //专辑
        case 10:
          console.log(searchlistdata.result.albumCount);
          this.count = searchlistdata.result.albumCount
          break;

          //视频
        case 1014:
          this.count = searchlistdata.result.videoCount
          break;

          //歌词
        case 1006:
          this.count = searchlistdata.result.songCount
          break;

          //歌单
        case 1000:
          this.count = searchlistdata.result.playlistCount
        //   //声音主播
        // case 100:
        //   this.count = searchlistdata.result.artistCount
          break;
          //用户
        case 1002:
          this.count = searchlistdata.result.userprofileCount
          break;

      }
    },
    //点击搜索框图标
    inputsearch() {
      this.searchlistdata(this.searchdata,this.title[this.currindex].id)
      this.$router.push({path:"/searchjiemian",query:{keyword:this.searchdata}})
    },
    //prev
    numclick(e){
      this.currpage = e
      this.searchlistdata(this.searchdata,this.title[this.currindex].id)
    },
    songplay(index) {
      this.index1 = index
      
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
    }
  },
}
</script>

<style scoped lang="less">
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: rgb(235, 5, 5);
  border-radius: 5px;
}
/deep/ .el-pagination.is-background .el-pager li:not(.active):hover{
  color:  rgb(235, 5, 5);
}
ul{
  list-style:none;
}
  .searchjiemian{
    width: 100%;
    min-height: calc(100vh - 77px);
    background-color: rgb(245,245,245);
  }
  .center{
    width: 50%;
    height: 100%;
    min-height: calc(100vh - 17px);
    margin: 0 auto;
    background-color: rgb(255,255,255);
    border-left: 1px solid rgb(211,211,211);
    border-right: 1px solid rgb(211,211,211);
    .searchinput{
      width: 100%;
      height: 110px;
      box-sizing: border-box;
      position: relative;
      .inputbox{
        width: 100%;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none; 

        .input{
        width: 355px;
        height: 40px;
        outline:none; 
        padding-left: 15px;
        border: 1px solid rgb(206,206,206);
        border-radius:  5px 0 0 5px ;
        box-shadow: inset 0 2px 2px #CCC;
        }
      }
    }
    .searchresults{
      width: 100%;
      box-sizing: border-box;
      padding: 0 50px;
      .resultsspan{
        font-size: 14px;
        color: rgb(153,153,153);
      }
      .optionsul{
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        background-color: rgb(247,247,247);
        border-right: 1px solid rgb(204,204,204);
        border-left: 1px solid rgb(204,204,204);
        font-size: .8em;

        .optionsli{
          width: 12.5%;
          text-align: center;
          border-top: 2px solid rgb(204,204,204);
          border-bottom: 1px solid rgb(204,204,204);
          padding: 10px 0;
        }
      }
      .list{
        width: 100%;
        height: 100%;
        margin-top: 30px;
        .listli{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          font-size: 12px;
          .songname{
            flex: 4;
            text-indent: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .songnamespan{
              padding:0 5px;
            }
          }
          .songer{
            flex: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .albumname{
            flex: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time{
            flex: 1;
            text-align: center;
          }
        }
      }
      .Pagination{
        padding: 30px 0 40px 0;
        text-align: center;
      }
    }
  }
  .inputbox::after{
    content: '\e611';
    width: 50px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    line-height: 44px;
    border: 1px solid rgb(206,206,206);
    border-radius: 0 5px 5px 0;
    font-family: 'iconfont';
    font-weight: bold;
    color: rgb(137,137,137);
    background-image: linear-gradient(rgb(255,255,255),rgb(237,237,237));
    pointer-events: auto;
  }
  .recommendbottom1 {
    position: relative;
    width: 100%;
    border-top: 1px solid rgb(211, 211, 211);
    background-color: rgb(245, 245, 245);
    margin-bottom: 62px;
  }
  .recommendbottom2 {
    width: 980px;
    margin: 0 auto;
  }
  .active{
    width: 12.5%;
    text-align: center;
    padding: 10px 0;
    border-top: 2px solid rgb(209, 48, 48);
    background-image: linear-gradient(rgb(248, 248, 248),rgb(254, 254, 254));
    border-left: 1px solid rgb(204,204,204);
    border-right: 1px solid rgb(204,204,204);

  }
  .listli:nth-child(2n+2){
    background-color: rgb(247, 247, 247);
  }
</style>