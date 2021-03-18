<template>
  <div>
    <sun-nav :title="title" class="sunnav"></sun-nav>
    <div class="dd" >
      <!-- :class="[loading==true ? 'mymusiccenter1':'mymusiccenter']" -->
      <div  class="mymusiccenter" v-if="logincheck">
      <mymusicleft class="mymusicleft"></mymusicleft>
      <mymusicright class="mymusicright"></mymusicright>
    </div>
    <div v-if="!logincheck">
      ddd
    </div>
    </div>
    
  </div>
</template>

<script>
import SunNav from '@/components/subnav/SunNav'
import mymusicleft from '@/view/mymusic/mymusicleft'
import mymusicright from '@/view/mymusic/mymusicright'
export default {
  name: "Mymusic",
  components: {
    SunNav,
    mymusicleft,
    mymusicright
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
  .mymusicleft{
    
  }
</style>