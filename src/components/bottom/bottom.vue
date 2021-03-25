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
        <p style="margin-top: 10px">
          <span style="margin-right: 15px">网易公司版权所有©1997-2021</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a href="">浙网文[2018]3506-263号</a>
        </p>
        <p style="margin-top: 10px">
          <span style="margin-right: 20px"
            >违法和不良信息举报电话：0571-89853516</span
          >
          <span>举报邮箱：<a href="">ncm5990@163.com</a></span>
        </p>
        <p style="margin-top: 10px">
          <a href="" style="margin-right: 10px"
            >粤B2-20090191-18 工业和信息化部备案管理系统网站</a
          >
          <span class="iconfont icon-jingcha" style="font-size: 18px"></span>
          <span> 浙公网安备 33010902002564号</span>
        </p>
      </div>

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
    </div>
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