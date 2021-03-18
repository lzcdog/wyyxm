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
        <div class="loginname" @click="loginclick" v-show="!logincheck">登录</div>
        <div v-show="logincheck" class="avatarUrl">
          <img :src="avatarUrl" alt=""   style="width:100%;height:100%;border-radius: 50%;">
          <div class="userstate">
            <ul style="list-style:none;">
              <li>
                <i class="iconfont icon-yonghu"></i>
                <a href="#"  style="text-decoration: none;color: rgb(204, 204, 204);">我的主页</a>
              </li>
              <li>
                <i class="iconfont icon-xinxi"></i>
                <a href="#"  style="text-decoration: none;color: rgb(204, 204, 204);">我的信息</a>
              </li>
              <li>
                <i class="iconfont icon-dengji"></i>
                <a href="#"  style="text-decoration: none;color: rgb(204, 204, 204);">我的等级</a>
              </li>
              <li >
                <i class="iconfont icon-yinlehuiyuan"></i>
                <a href="#"  style="text-decoration: none;color: rgb(204, 204, 204);">VIP会员</a>
              </li>
              <li>
                <i class="iconfont icon-shezhi"></i>
                <a href="#"  style="text-decoration: none;color: rgb(204, 204, 204);">个人设置</a>
              </li>
              <li >
                <i class="iconfont icon-renzheng1"></i>
                <a href="#"  style="text-decoration: none;color: rgb(204, 204, 204);">实名认证</a>
              </li>
              <li @click="exit">
                <i class="iconfont icon-tuichu"></i>
                <a href="#"  style="text-decoration: none; color: rgb(204, 204, 204);">退出</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="hot">HOT</div>
  </div>
</template>

<script>
import Triangle from '@/components/subnav/Triangle'
//引入二维码的接口
import {EwmKey,EwmSc,CheckEwm} from "../../network/login"
export default {
  name: "NavBarItem",
  components:{
    Triangle
  },
  data() {
    return {
      title: ["发现音乐", "我的音乐", "朋友", "商城", "音乐人", "下载客户端"],
      currindex: 0,
      key: '',
      base64: '',
      status: 0,
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
    //用户头像url
    avatarUrl() {
      if((this.$store.state.user.userinfo).length==0){
        return ''
      }else{
        return this.$store.state.user.userinfo[0].avatarUrl
      }
    },
    //用户登录状态和文字头像切换
    logincheck() {
      if((this.$store.state.user.userinfo).length==0){
        return false
      }else{
        return this.$store.state.user.userinfo[0].logincheck
      }
    }
  },
  mounted(){
    this.$bus.$on('againgetkey',()=>{
      this.getewmkey()
    })
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
    //发送登录界面是否显示
    loginclick(){
      this.$bus.$emit('loginshow')
      //调用接口方法
      this.getewmkey()
    },
    //第一步获取二维码key
    async getewmkey(){
      try{
        this.key = await EwmKey()
        //第二步获取二维码base64
        if(this.key){
          this.getewmbase()
          this.cheakewm()
          //发送base64到login页面中
          
        }else{
          this.$message.error('网络波动')
        }
      }catch(err) {
        console.log(err);
      }
    },
    //获取二维码方法
    async getewmbase(){
    this.base64 = await EwmSc({
      key:this.key.data.unikey,
      qrimg:'qrimg'
    })
    this.$bus.$emit('pushbase64',this.base64)
    },
    //判断二维码是否过期
    async cheakewm(){
    this.status = await CheckEwm({
      key:this.key.data.unikey,
    })
    if(this.status.code==800){
      // this.getewmkey();
      //发送二维码失效事件
      this.$bus.$emit('ewmoverdue')
    }
    // else{
    //   console.log(this.status.code);
    //   console.log(this.status);
    // }
    if(this.status.code == 803){
      this.$bus.$emit('okback')
      this.$message({
          message: '登录成功',
          type: 'success'
      });
    }
    setTimeout(() => {
      this.cheakewm()
    }, 30000);
    
    },
    exit(){
      this.$store.state.user.userinfo = []
      this.$message.success('退出成功')
    }
  },
};
</script>

<style scoped lang="less">
.avatarUrl{
  width: 30px;
  height: 30px;
  position: relative;
}
.userstate{
  width: 160px;
  height: 240px;
  background-color: rgb(43, 43, 43);
  position: absolute;
  left: -55px;
  top: 31px;
  z-index: 8888;
  opacity: 0;
  box-shadow: 0 0 5px rgb(0 0 0);
}
.userstate ul li{
  line-height: 34px;
  text-align: left;
  padding-left: 30px;
  font-size: 10px;
}
.userstate i{
  color: rgb(138,138,138);
  font-size: 18px;
  margin-right: 10px;
  vertical-align: middle;

}

.avatarUrl:hover .userstate{
  opacity: 1;
}
.userstate ul li:hover{
  background-color: rgb(53,53,53);
}
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

</style>