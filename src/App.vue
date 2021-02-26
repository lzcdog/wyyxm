<template>
  <div id="app">
    <nav-bar></nav-bar>
    <bot-nav class="botnav"></bot-nav>
    <router-view ></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import BotNav from '@/components/botnav/BotNav'
export default {
  name: 'App',
  components: {
    NavBar,
    BotNav
  },
}
</script>

<style lang="less">
@import "./assets/css/base.css";
.botnav{
  position: fixed;
  // top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 19;

}

</style>
