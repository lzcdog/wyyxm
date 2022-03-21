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
    .center{
      width: 1200px;
      height: 70px;
      margin: 0 auto;
    }
  }
</style>