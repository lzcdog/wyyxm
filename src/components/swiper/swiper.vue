<template>
  <div>
    <div class="swiper1">
  
      <div class="test" >
        
        <el-carousel trigger="click" :interval="4000" arrow="always" :autoplay="true" @change="dddd">
        <el-carousel-item  v-for="(item, index) in swiperdata" :key="index">
          <img :src="item.pic" alt="" class="dd" />
        </el-carousel-item>
      </el-carousel>
      <div class="download">
        <img src="../../assets/img/download.png" alt="" class="ddd">
      </div>
      </div>
      <div class="test1" >
        <div  class="test2" :style="{backgroundImage:'url('+backimg+')'}" style="background-size: cover;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    swiperdata: {
      type: Array,
      default: [],
    },
  },
  data(){
    return{
      backimg:''
    }
  },
  watch:{
    swiperdata(newv){
      this.backimg = newv[0].pic
    }
  },
  methods:{
    dddd(e){
      this.backimg = this.swiperdata[e].pic
    }
  }
};
</script>

<style scoped lang="less">
.ddd{
  box-shadow: 5px 0px 7px rgba(0,0,0,0.5);

}
.test1{
  height: 285px;
  width: 100%;
  position: absolute;
  top: 105px;
  z-index: 1;
  overflow: hidden;
  .test2{
  width: 100%;
  height: 285px;
  transform: scale(70);
  transform-origin:50% 50%;
    filter: blur(2px);
  }
}
.test{
  display: flex;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  z-index: 5;
  height: 285px;
}
.swiper1 {
  width: 100%;
  background-color:rgb(245,245,245);
}

/deep/.el-carousel {
  width: 730px;
  position: relative;
}
/deep/ .el-carousel__container {
  width: 100%;
  height: 285px !important;
}
.dd {
  width: 100%;
  height: 100%;
}
/deep/ .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  // background-color: rgb(217, 27, 27);
}
/deep/ .el-carousel__indicators--outside{
  width: 25%;
  position: absolute;
  left: 37.5%;
  bottom: 0%;
  margin-bottom: 1px;
}
/deep/.el-carousel__arrow:hover{
  background-color: black;
}
/deep/.el-carousel__arrow{
  width: 45px;
  background-color: transparent;
  height: 45px;
}
/deep/.el-icon-arrow-right{
  font-size: 35px;
}
/deep/ .el-icon-arrow-left{
  font-size: 35px;
}
</style>