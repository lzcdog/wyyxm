<template>
  <div class="navbar">
    <nav-bar-item class="center" @pushindex="getindex"></nav-bar-item>
  </div>
</template>

<script>
import NavBarItem from '@/components/navbar/NavBarItem'
export default {
  name: "Navbar",
  components:{
    NavBarItem,
  },
  methods:{
    getindex(index){
      switch (index) {
        case 0:
          
          break;
      
        default:
          break;
      }
    }
  }
}
</script>

<style scoped lang="less">
  .navbar{
    width: 100%;
    height: 70px;
    background-color: rgb(36, 36, 36);
    position: relative;
    .center{
      width: 60%;
      height: 70px;
      margin: 0 auto;
    }
  }
  @media screen and (max-width:1835px)  {
    .navbar{
    .center{
      width: 80%;
    }
  }
  }
  @media screen and (max-width:1376px)  {
    .navbar{
    .center{
      width: 100%;
    }
  }
  }
  @media screen and (max-width:1100px)  {
    .navbar{
    width: 110%;
    .center{
      width: 110%;
    }
  }
  }
  @media screen and (max-width:876px)  {
    .navbar{
    width: 120%;
    .center{
      width: 120%;
    }
  }
  }
</style>