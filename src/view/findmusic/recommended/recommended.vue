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
      >
      </recommendedleft>
      <!-- 左边内容 -->

      <!-- 右边内容 -->
      <recommendedright></recommendedright>
      <!-- 右边内容 -->

    </div>
    <!-- 中间内容 -->

  </div>
</template>

<script>
//组件
import swiper from "@/components/swiper/swiper";
import recommendedleft from "@/view/findmusic/recommended/recommendedleft";
import recommendedright from "@/view/findmusic/recommended/recommendedright";
//网络请求
import { reqswiperdata,hotrecommend,newshelves } from "../../../network/findmusic";
export default {
  name: "Recommended",

  components: {
    swiper,
    recommendedleft,
    recommendedright,
  },

  data() {
    return {
      swiperdata: [],
      recommendedleftdata: [],
      firstdata: [],
      seconddata: []
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
      const res = await hotrecommend({limit:8});
      this.recommendedleftdata = res.result
    },
    //定义获取新碟上架数据
    async getnewshelvesdata(){
      const res = await newshelves()
      const newshelvesdata = res.albums
      this.firstdata = newshelvesdata.splice(0,5);
      this.seconddata = newshelvesdata.splice(0,5);
      console.log(this.seconddata);
    }
  },

  created() {
    //调用获取轮播图方法
    this.getswiperdata();
    //调用获取热门推荐方法
    this.gethotrecommenddata();
    //调用获取新碟上架方法
    this.getnewshelvesdata()
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  background-color: white;
}
.centercontent{
  display: flex;
  justify-content: center;
}
</style>