<template>
  <div>
    <!-- 轮播图 -->
    <div>
      <swiper class="swiper" :swiperdata="swiperdata"></swiper>
    </div>
    <!-- 轮播图 -->

    <!-- 中间内容 -->
    <div class="centercontent">
      <!-- 左边内容 -->
      <recommendedleft
        :recommendedleftdata="recommendedleftdata"
        :firstdata="firstdata"
        :seconddata="seconddata"
        :updata="updata"
        :newdata="newdata"
        :originaldata="originaldata"
      >
      </recommendedleft>
      <!-- 左边内容 -->

      <!-- 右边内容 -->
      <recommendedright></recommendedright>
      <!-- 右边内容 -->
    </div>
    <!-- 中间内容 -->

    <!-- 底部内容 -->
    <div class="recommendbottom1">
      <recommendbottom class="recommendbottom2"></recommendbottom>
    </div>
    <!-- 底部内容 -->

  </div>
</template>

<script>
//组件
import swiper from "@/components/swiper/swiper";
import recommendedleft from "@/view/findmusic/recommended/recommendedleft";
import recommendedright from "@/view/findmusic/recommended/recommendedright";
import recommendbottom from "@/view/findmusic/recommended/recommendbottom";
//网络请求
import {
  reqswiperdata,
  hotrecommend,
  newshelves,
  listdata,
  // music
} from "../../../network/findmusic";
export default {
  name: "Recommended",

  components: {
    swiper,
    recommendedleft,
    recommendedright,
    recommendbottom,
  },

  data() {
    return {
      swiperdata: [],
      recommendedleftdata: [],
      firstdata: [],
      seconddata: [],
      updata: [],
      newdata: [],
      originaldata: [],
    };
  },

  methods: {
    //定义获取轮播图数据方法
    async getswiperdata() {
      let res = await reqswiperdata({ type: 1 });
      this.swiperdata = res.banners;
    },
    //定义获取热门推荐数据
    async gethotrecommenddata() {
      const res = await hotrecommend({ limit: 8 });
      this.recommendedleftdata = res.result;
    },
    //定义获取新碟上架数据
    async getnewshelvesdata() {
      const res = await newshelves();
      const newshelvesdata = res.albums;
      this.firstdata = newshelvesdata.splice(0, 5);
      this.seconddata = newshelvesdata.splice(0, 5);
      console.log(this.seconddata);
    },
    //定义榜单数据
    async getlistdata() {
      const updata = await listdata({ id: 19723756 });
      const newdata = await listdata({ id: 3779629 });
      const originaldata = await listdata({ id: 2884035 });
      this.updata = updata.playlist.tracks.splice(0, 10);
      this.newdata = newdata.playlist.tracks.splice(0, 10);
      this.originaldata = originaldata.playlist.tracks.splice(0, 10);
      // console.log(this.updata);
      // console.log(this.newdata);
      // console.log(this.originaldata);
    },
    
  },

  created() {
    //调用获取轮播图方法
    this.getswiperdata();
    //调用获取热门推荐方法
    this.gethotrecommenddata();
    //调用获取新碟上架方法
    this.getnewshelvesdata();
    //调用获取新碟上架方法
    this.getlistdata();
    // music({id:122204241}).then(res=>{
    //   console.log(res);
    // })
  },
};
</script>

<style scoped lang="less">
.swiper {
  width: 100%;
  background-color: white;
}
.centercontent {
  display: flex;
  justify-content: center;
}
.recommendbottom1{
  width: 100%;
  height: 140px;
  border-top: 1px solid rgb(211,211,211);
  background-color: rgb(242,242,242);
  margin-bottom: 50px;
  .recommendbottom2{
    width: 980px;
    height: 115px;
    margin: 0 auto;

  }
}
</style>