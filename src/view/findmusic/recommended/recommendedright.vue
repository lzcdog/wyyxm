<template>
  <div>
    <div class="frame2">
      <div class="righthead">
        <div class="headcontent" v-if="!logincheck">
          <p class="headp">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </p>
          <div class="headbutton">
            <a class="headbutton1" @click="login2" style="cursor:pointer">用户登录</a>
          </div>
        </div>
        <div v-if="logincheck" class="userinfo">
          <div class="userinfo1">
            <div class="userinfotitle">
              <img :src="this.$store.state.user.userinfo[0].avatarUrl" alt="" style="vertical-align: text-top;width:80px;height:80px;margin-left:20px;border:1px solid rgb(218,218,218)">
              <div class="userinfotext" >
                <div style="margin-top:10px;width:70px;overflow:hidden;text-overflow: ellipsis;
                  white-space: nowrap;">
                  <a style="margin-left:15px;font-weight:bold;">{{this.$store.state.user.userinfo[0].username}}</a>
                </div>
                <div style="margin-top:10px;margin-left:10px;">
                  <img style="width:43px;height:16px;" :src="[this.$store.state.user.userinfo[0].VIPtype==0 ? 'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4357872312/f49a/5cad/ebcd/c1021f3f3e918f6b92b2b2bb58d4719e.png':'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4357872333/eb74/6e09/3b0f/fd6e21661e1d32e1c52658173ffd42b6.png']" alt="">
                </div>
                <div class="lv">
                  <a><i>LV.{{this.$store.state.user.userinfo[0].lv}}</i></a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div class="rightcenter">
        <div class="rightcenter1">
          <div class="centertitle">
            <span class="centertitle1">入驻歌手</span>
            <span class="centertitle2">查看全部></span>
          </div>
          <ul class="centertext">
            <li class="box">
              <div class="boximg">
                <img
                  src="http://p1.music.126.net/p9U80ex1B1ciPFa125xV5A==/5931865232210340.jpg"
                  alt=""
                  class="boximg1"
                />
              </div>
              <div class="boxtext">
                <p class="songname">张惠妹aMEI</p>
                <p class="jieshao">台湾歌手张惠妹</p>
              </div>
            </li>
            <li class="box">
              <div class="boximg">
                <img
                  src="http://p1.music.126.net/1EN_iqQWU_E3DafzEOh3cA==/3302932937408956.jpg"
                  alt=""
                  class="boximg1"
                />
              </div>
              <div class="boxtext">
                <p class="songname">Fine乐团</p>
                <p class="jieshao">独立音乐人</p>
              </div>
            </li>
            <li class="box">
              <div class="boximg">
                <img
                  src="http://p1.music.126.net/ZuktZvjcxpYBjcWC3gmbPg==/19027048718765608.jpg"
                  alt=""
                  class="boximg1"
                />
              </div>
              <div class="boxtext">
                <p class="songname">萬曉利</p>
                <p class="jieshao">民谣歌手、中国现代民谣的代表人物之一</p>
              </div>
            </li>
            <li class="box">
              <div class="boximg">
                <img
                  src="http://p1.music.126.net/v_zYgE9kmAwVGWV2c8hFxA==/7943971513291094.jpg"
                  alt=""
                  class="boximg1"
                />
              </div>
              <div class="boxtext">
                <p class="songname">音乐人赵雷</p>
                <p class="jieshao">民谣歌手</p>
              </div>
            </li>
            <li class="box">
              <div class="boximg">
                <img
                  src="http://p1.music.126.net/6wPGl_ddgAbJTx5kOohcyw==/109951163892302996.jpg"
                  alt=""
                  class="boximg1"
                />
              </div>
              <div class="boxtext">
                <p class="songname">王三溥</p>
                <p class="jieshao">音乐人</p>
              </div>
            </li>
          </ul>
          <div class="tobe">申请成为网易音乐人</div>
        </div>
        <div class="rightcenter2">
          <div class="centertitle">
            <span class="centertitle1">热门主播</span>
          </div>
          <ul class="centertext1">
            <li class="box1">
              <div class="box1img">
                <img
                  class="box1img1"
                  src="http://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg"
                  alt=""
                />
              </div>
              <div class="box1text">
                <p class="zhuboname">陈立</p>
                <p class="jieshao" style="color: #5d5d5d;width:120px;  white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;">
                  心理学家、美食家陈立教授
                </p>
              </div>
            </li>
            <li class="box1">
              <div class="box1img">
                <img
                  class="box1img1"
                  src="http://p1.music.126.net/y5-sM7tjnxnu_V9LWKgZlw==/7942872001461517.jpg"
                  alt=""
                />
              </div>
              <div class="box1text">
                <p class="zhuboname">DJ艳秋</p>
                <p class="jieshao" style="color: #5d5d5d;width:120px;  white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;">
                  著名音乐节目主持人
                </p>
              </div>
            </li>
            <li class="box1">
              <div class="box1img">
                <img
                  class="box1img1"
                  src="http://p1.music.126.net/6cc6lgOfQTo6ovNnTHPyJg==/3427177769086282.jpg"
                  alt=""
                />
              </div>
              <div class="box1text">
                <p class="zhuboname">国家大剧院古典音乐频道</p>
                <p class="jieshao" style="color: #5d5d5d;width:120px;  white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;">
                  国家大剧院古典音乐官方
                </p>
              </div>
            </li>
            <li class="box1">
              <div class="box1img">
                <img
                  class="box1img1"
                  src="http://p1.music.126.net/xa1Uxrrn4J0pm_PJwkGYvw==/3130309604335651.jpg"
                  alt=""
                />
              </div>
              <div class="box1text">
                <p class="zhuboname">谢谢收听</p>
                <p class="jieshao" style="color: #5d5d5d;width:120px;  white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;">
                  南京电台主持人王馨
                </p>
              </div>
            </li>
            <li class="box1">
              <div class="box1img">
                <img
                  class="box1img1"
                  src="http://p1.music.126.net/slpd09Tf5Ju82Mv-h8MP4w==/3440371884651965.jpg"
                  alt=""
                />
              </div>
              <div class="box1text">
                <p class="zhuboname">DJ晓苏</p>
                <p class="jieshao" style="color: #5d5d5d,width:120px;  white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;">
                  独立DJ，CRI环球旅游广播特邀DJ
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendedright",
  methods: {
    login2() {
      this.$bus.$emit('login1')
    }
  },
  computed:{
  logincheck(){
    if((this.$store.state.user.userinfo).length == 0){
      return false
    }else{
      return true
    }
    }
  }
};
</script>

<style lang="less" scoped>
.frame2 {
  width: 250px;
  height: 1420px;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid #d3d3d3;
  .righthead {
    width: 250px;
    height: 126px;
    margin: 0 auto;
    background-image: linear-gradient(rgb(250, 250, 250), rgb(227, 227, 227));
    .headp {
      width: 205px;
      height: 44px;
      margin: 0 auto;
      color: rgb(102, 102, 102);
      font-size: 12px;
      padding: 16px 0;
      line-height: 20px;
    }
    .headbutton {
      width: 250px;
      height: 26px;
      text-align: center;
      .headbutton1 {
        background-color: rgb(213, 18, 24);
        color: white;
        padding: 7px 15px;
        border-radius: 8%;
        font-size: 12px;
      }
    }
  }
  .rightcenter {
    width: 250px;
    height: 455px;
    .rightcenter1 {
      width: 210px;
      height: 455px;
      margin: 0 auto;
      padding-top: 20px;
      margin-bottom: 50px;
      .centertext {
        width: 210px;
        margin-top: 20px;
        list-style: none;
        background-color: rgb(250, 250, 250);
        .box {
          display: flex;
          align-items: center;
          width: 210px;
          margin-bottom: 15px;
          border: 1px solid rgb(233, 233, 233);

          .boximg {
            width: 62px;
            height: 62px;
            .boximg1 {
              width: 62px;
              height: 62px;
            }
          }
          .boxtext {
            margin-left: 15px;
            line-height: 30px;
            .songname {
              font-weight: bold;
              font-size: 13px;
            }
            .jieshao {
              width: 120px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 12px;
              color: rgb(93, 93, 93);
            }
          }
        }
      }
      .tobe {
        width: 210px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        border-radius: 5%;
        border: 1px solid rgb(196, 196, 196);
        background-color: rgb(246, 246, 246);
      }
    }
    .rightcenter2 {
      width: 210px;
      height: 455px;
      margin: 0 auto;
      .centertext1 {
        width: 210px;
        margin-top: 20px;
        list-style: none;
        .box1 {
          display: flex;
          align-items: center;
          width: 210px;
          margin-bottom: 15px;
          // border: 1px solid rgb(233, 233, 233);
          .box1img {
            width: 40px;
            height: 43px;
            .box1img1 {
              width: 40px;
              height: 40px;
            }
          }
          .box1text {
            width: 150px;
            font-size: 12px;
            margin-left: 5px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
.centertitle {
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(204, 204, 204);
  font-size: 14px;
  .centertitle1 {
    font-weight: bold;
  }
  .centertitle2 {
    float: right;
    color: rgb(102, 102, 102);
  }
}
.userinfo{
  width: 100%;
  height: 100%;
  position: relative;
  .userinfo1{
    width: 100%;
    height: 80px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-30%);
    margin: 0 auto;
  }
  .userinfotitle{
    display: flex;
    position: relative;
    .userinfotext{
      display: flex;
      .lv{
        width: 35px;
        height: 15px;
        border: 1px solid rgb(154, 154, 154);
        color:rgb(163, 163, 163);
        border-radius: 10px;
        font-weight: bold;
        font-size: 12px;
        text-align: center;
        align-self: flex-end;
        position: absolute;
        left: 115px;
        top: 40px;
      }
    }
  }
}
</style>