<template>
  <div>
    <sun-nav :title="title" class="sunnav"></sun-nav>
    <div class="dd" >
      <!-- :class="[loading==true ? 'mymusiccenter1':'mymusiccenter']" -->
      <div  class="mymusiccenter" v-if="logincheck">
      <mymusicleft class="mymusicleft"></mymusicleft>
      <mymusicright class="mymusicright"></mymusicright>
    </div>
    <div v-if="!logincheck" class="ddd">
      <div class="pic">
        <div class="pic1">
          <img src="../../assets/img/nologin.png" alt="" class="img">
          <div  @click="login" class="hoveimg"></div>
        </div>
      </div>
      <div class="recommendbottom1">
        <bottom class="recommendbottom2"></bottom>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import SunNav from '@/components/subnav/SunNav'
import mymusicleft from '@/view/mymusic/mymusicleft'
import mymusicright from '@/view/mymusic/mymusicright'
import bottom from '@/components/bottom/bottom'
export default {
  name: "Mymusic",
  components: {
    SunNav,
    mymusicleft,
    mymusicright,
    bottom
  },
  data(){
    return{
      title: [],
      loading: true
    }
  },
  mounted(){
  this.$bus.$on('test',()=>{
      this.loading = false
  })
  this.$bus.$on('loading',()=>{
      this.loading = true
  })
  },
  computed:{
  logincheck(){
    if((this.$store.state.user.userinfo).length == 0){
      return false
    }else{
      return true
    }
  },
  
  },
  methods:{
    login() {
      this.$bus.$emit('login1')
    }
  }
};
</script>

<style scoped >
  .dd{
    height: 100%;
    min-height: 100vh;
    background-color: rgb(245,245,245);
  }
  /* .mymusiccenter1{
    width: 980px;
    height: calc(100vh - 62px);
    margin: 0 auto;
    display: flex;
  } */
  .mymusiccenter{
    width: 980px;
    height: 100%;
    margin: 0 auto;
    
    display: flex;
  }
  .sunnav{
    position: fixed;
    top: 70px;
    z-index: 53;
  }
  .mymusicright{
    position: relative;
    left: 245px;
    top: 60px;
  }
  .pic1{
    margin: 0 auto;
    width: 980px;
    position: relative;
    top: 77px;
    border: 1px solid rgb(211,211,211);
    
  }
  .hoveimg{
    position: absolute;
    top:305px;
    left: 568px;
    width: 167px;
    height: 45px;
    background-repeat: no-repeat;
  }
  .hoveimg:hover{
    /* background-image: url("../../assets/img/loginclick.png"); */
    cursor: pointer;
  }
  .recommendbottom1 {
  position: relative;
  width: 100%;
  border-top: 1px solid rgb(211, 211, 211);
  background-color: rgb(245, 245, 245);
  margin-top: 55px;
  padding-bottom: 70px;
  }
  .recommendbottom2 {
    width: 980px;
    margin: 0 auto;
  }
  .ddd{
    width: 100%;
  }
</style>