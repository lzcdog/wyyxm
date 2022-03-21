<template>
  <div>
    <div class="recommendbottom">
      <div class="left">
        <p>
          <a href="" style="color: #999999">服务条款</a>
          <span style="color: #999999; margin: 0 10px; font-size: 12px">|</span>
          <a href="" style="color: #999999">隐私政策</a>
          <span style="color: #999999; margin: 0 10px; font-size: 12px">|</span>
          <a href="" style="color: #999999">儿童隐私政策</a>
          <span style="color: #999999; margin: 0 10px; font-size: 12px">|</span>
          <a href="" style="color: #999999">版权投诉指引</a>
          <span style="color: #999999; margin: 0 10px; font-size: 12px">|</span>
          <a href="" style="color: #999999">意见反馈</a>
          <span style="color: #999999; margin: 0 10px; font-size: 12px">|</span>
        </p>
    <a data-v-5691a8ff="" href="https://beian.miit.gov.cn/">CopyRight © 粤ICP备2021142241号</a>


      <div class="right">
        <div class="right1">
          <a href="" class="iconfont icon-renzheng" style="font-size: 45px"></a>
          <p class="p2">用户认证</p>
        </div>
        <div class="right1">
          <a href="" class="iconfont icon-CD" style="font-size: 45px"></a>
          <p class="p2">独立音乐人</p>
        </div>
        <div class="right1">
          <a href="" class="iconfont icon-dashang" style="font-size: 45px"></a>
          <p class="p2">赞赏</p>
        </div>
        <div class="right1">
          <a href="" class="iconfont icon-ziyuan" style="font-size: 45px"></a>
          <p class="p2">视频奖励</p>
        </div>
      </div>
    
    </div></div>
  </div>
</template>

<script>
export default {
  name: "bottom",
};
</script>

<style scoped lang="less">
* {
  font-size: 12px;
  color: #666666;
}
a {
  text-decoration: none;
}
.recommendbottom {
  display: flex;
  .left {
    width: 520px;
    height: 100%;
    padding-top: 15px;
  }
  .right {
    display: flex;
    width: 500px;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    .right1 {
      .p2 {
        margin-top: 5px;
        color: rgb(153, 152, 152);
        font-family: "微软雅黑体";
      }
    }
  }
}
</style>