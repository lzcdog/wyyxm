<template>
  <div id="app">
    <nav-bar :class="[actived ? 'fixed':'navbar']" ></nav-bar>
    <bot-nav class="botnav"></bot-nav>
    <div :class="{mask:maskshow}">
      <login :class="{login1:maskshow}" v-show="maskshow" ></login>
    </div>
    <keep-alive include="searchjiemian">
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>

<script>
//导航组件
import NavBar from '@/components/navbar/NavBar'
//播放器组件
import BotNav from '@/components/botnav/BotNav'
//登录页面组件
import login from '@/components/login/login'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    NavBar,
    BotNav,
    login
  },
  data(){
    return{
      maskshow: false,
      fixed: false,
      num: 1
    }
  },
  mounted(){
    axios.get('http://127.0.0.1:7002/').then(res=>{
      console.log(res,'egg');
    })
    this.$bus.$on('loginshow',()=>{
      this.maskshow = true
      document.documentElement.style.overflow='hidden';
    })
    this.$bus.$on('cancleclick',()=>{
      this.maskshow = false
      document.documentElement.style.overflow='visible';
    })
    this.$bus.$on('okback',()=>{
      this.maskshow = false
    })
    
    
  },
  computed:{
    actived() {
      let path =this.$route.path;
      if(path=="/mymusic"){
      return  true
      }else{
      return false
      }
    }
   
  }
}
</script>

<style  lang="less"  >
@import "./assets/css/base.css";
.botnav{
  position: fixed;
  // top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 19;
}

.navbar{
  z-index: 999;
}
.fixed{
  position: fixed;
  top: 0;
  left: 0;
  
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
}
.login1{
  width: 530px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 21;

}

</style>
