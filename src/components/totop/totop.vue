<template>
  <div>
    <div class="totop" v-show="show1">
      <div class="totop1" >
        <p>^</p>
        <span>TOP</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "totop",
  data(){
    return{
      show1:false
    }
  }
};
</script>

<style scoped lang="less">
.totop {
  width: 45px;
  height: 45px;
  background-color: rgb(245,245,245);
  border: 1px solid rgb(212,212,212);
  position: fixed;
  bottom: 180px;
  right: 400px;
  text-align: center;
  font-size: 10px;
  color: rgb(152,152,152);
  cursor: pointer;
  .totop1{
    padding-top: 7px;
  }
}
</style>