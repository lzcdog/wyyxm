<template>
  <div>
    <div class="login">
      <div class="title">
        <a style="margin-left:20px">{{modeshow != 3 ? '登录' : '手机号登录'}}</a>
        <a style="cursor: pointer;margin-right:20px;color:rgb(136,136,136);font-size: 18px; font-weight: 400;" @click="cancle">x</a>
      </div>
      <div :class="[modeshow==3 ? 'contentb' : 'contenta']">
        <!-- 二维码 -->
        <div class="content1" v-show="modeshow==1">
          <div class="detail">
            <div class="phone">
              <img src="../../assets/img/13.png" alt="" style="width:125px;height:220px">
            </div>
          <div class="right">
              <div style="font-size: 18px;">扫码登录</div>
              <div style="margin-top:10px;width:150px;height:150px" >
                <img :src="imgurl" alt="" style="width:100%;height:100%">
              <div class="ewmoverdue" v-show="ewmoverdue">
                <span class="tip">二维码已失效</span>
                <a href="#" class="F5" @click="refresh">点击刷新</a>
              </div>
              </div>
              
              <div style="margin-top:10px;font-size: 12px;">使用 <a href="" style="color: rgb(12,115,194);text-decoration: none">网易云音乐APP</a> 扫码登录</div>
          </div>
        </div>
        <div class="othermode" @click="changmode">
          选择其他登录模式
        </div>
        </div>
        <!-- 其他登录 -->
        <div class="content2" v-show="modeshow==2">
          <div class="detail">
            <div class="left">
              <img src="../../assets/img/9.png" alt="">
              <div>
                <a class="phonelogin" @click="phonelogin">
                  <span>手机号登录</span>
                </a>
                <br/>
                <a class="registered">
                  <span>注册</span>
                </a>
              </div>
            </div>
            <div class="right">
              <ul style="list-style: none;" class="ringht1">
                <li >
                  <i class="iconfont icon-weixin" style="color:rgb(105,183,53);border:1px solid rgb(204, 204, 204);border-radius: 50%;font-size:23px;padding:7px"></i>
                  <span>微信登录</span>
                </li>
                <li>
                  <i class="iconfont icon-qq" style="color:rgb(52,161,222);border:1px solid rgb(204, 204, 204);border-radius: 50%;font-size:23px;padding:7px"></i>
                  <span>QQ登录</span>
                </li>
                <li>
                  <i class="iconfont icon-weibo" style="color:red;border:1px solid rgb(204, 204, 204);border-radius: 50%;font-size:23px;padding:7px"></i>
                  <span>微博登录</span>
                </li>
                <li>
                  <i class="iconfont icon-wangyi0" style="color:red;border:1px solid rgb(204, 204, 204);border-radius: 50%;font-size:23px;padding:7px"></i>
                  <span>网易邮箱账号登录</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="hetong" >
              <input type="checkbox" id="dd"  @click="checkchange">
              <label for="dd"> 同意</label>
              <a href="">《服务条款》
              </a>
              <a href="">《隐私政策》
              </a>
              <a href="">《儿童隐私政策》
              </a>
          </div>
          <div class="changeewm" @click="changewm">
            <img src="../../assets/img/12.png" alt="" style="width: 57px;
          height: 57px;">
          </div>
        </div>
        <div class="content3" v-show="modeshow==3">
          <div class="phonebox">
              <div class="phonetext">
                <div class="phonecheck" >
                  <a href="" class="phonea">+86</a>
                </div>
                <div class="phoneinput">
                  <input v-model="phonenum" id="wyyusername"  type="text" placeholder="请输入手机号" style="border:none;height:25px;outline:none;padding-left:10px">
                </div>
              </div>
              <div class="phonepassword">
                <input v-model="password" id="wyypsw" type="password" placeholder="请输入密码" style="width:95%;border:none;height:25px;outline:none;padding-left:10px">
              </div>
              <div class="phoneother" style="font-size:12px;margin-top:10px">
                <div class="autologin" style="text-algin:center">
                  <input type="checkbox" id="auto" style="vertical-align:middle" >
                  <label for="auto" style="margin-left:10px;">记住账号密码</label>
                </div>
                <div class="forword">
                  <span>忘记密码?</span>
                </div>
              </div>
              <div class="loginclick" @click="login">
                <a href="#" style="line-height: 31px;font-size:12px;text-decoration:none;color:White;">登 录</a>
              </div>
          </div>
          <div class="otherlogin2">
            <div class="otherlogin3" style="margin-left:20px" @click="otherclick">
              <a href="#" style="text-decoration:none;color:rgb(12,114,195)"> 其他登录方式</a>
            </div>
            <div class="otherlogin4" style="margin-right:20px" >
              <a href="#" style="text-decoration:none;color:rgb(179,179,179)">没有账号？免费注册 ></a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
//引入md5加密
import md5 from 'js-md5';
//引入登录请求
import {login,userinfoo} from '../../network/login'
export default {
  name: "login",
  data(){
    return{
      modeshow: 1,
      checkshow: false,
      imgurl: '',
      ewmoverdue: false,
      phonenum: '',
      password: ''
    }
  },
  watch:{
    phonenum(newv){
        this.phonenum = newv.replace(/[^0-9]/g,'')
    }  
  },
  methods:{

    //页面交互方法//

    //取消按钮
    cancle() {
      this.$bus.$emit('cancleclick'),
      this.modeshow = 1
    },
    //切换其他模式登录
    changmode() {
      this.modeshow = 2
    },
    //切换二维码登录
    changewm() {
      this.modeshow = 1
    },
    //切换手机号登录
    phonelogin() {
      if(this.checkshow==false){
        this.$message.error('请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》');
      }else{
        this.modeshow = 3
      }
    },
    //切换去wx登录
    otherclick() {
      this.modeshow = 2
    },
    //点击合同协议
    checkchange() {
    this.checkshow = true
    },
    //刷新二维码
    refresh() {
      this.$bus.$emit('againgetkey');
      this.ewmoverdue = false
    },
    //登录
    async login(){
      let regexp = /0?(13|14|15|18|17)[0-9]{9}/g
      if(!regexp.test(this.phonenum)){
        this.$message.error('请输入正确的手机号')
      }else{
        let password = md5(this.password)
        let phonenum = this.phonenum
        const res = await login({phone:phonenum,md5_password:password})
        console.log(res)
        if(res.code!=200){
          this.$message.error('手机号或密码填写错误')
        }else{
          this.SaveInformation()
          const userinfo = await userinfoo({uid:res.profile.userId});
          this.$store.state.user.userinfo.push({username:userinfo.profile.nickname,VIPtype:userinfo.profile.vipType,lv:userinfo.level,userId:res.profile.userId,avatarUrl:res.profile.avatarUrl,logincheck:true})
          this.$bus.$emit('cancleclick'),
          this.modeshow = 1;
          this.CheckStorage();
        }
      }
    },
    //保存手机号和密码
    SaveInformation () {
      let wyyusername = document.getElementById("wyyusername");
      let wyypsw = document.getElementById("wyypsw");
      let auto = document.getElementById("auto");
      if(auto.checked) {
        localStorage.setItem("wyyusername",wyyusername.value);
        localStorage.setItem("wyypsw",wyypsw.value);
      }else {
        localStorage.removeItem("wyyusername");
        localStorage.removeItem("wyypsw");
      }
    },
    //检测本地存储有没有账号密码
    CheckStorage() {
      let auto = document.getElementById("auto");
      console.log(localStorage.getItem("wyyusername"));
      if(localStorage.getItem("wyyusername") && localStorage.getItem("wyypsw")) {
        this.phonenum = localStorage.getItem("wyyusername");
        this.password = localStorage.getItem("wyypsw");
        auto.checked = true
      }else{
        this.phonenum = "";
        this.password = "";
      }
    }
  },
  mounted() {
    this.$bus.$on('pushbase64',(base64)=>{
      let base641 = base64.data.qrimg
      this.imgurl=base641
    }),
    //二维码失效
    this.$bus.$on('ewmoverdue',()=>{
      this.ewmoverdue = true
    }),
    this.CheckStorage();
  },

}
</script>
  
<style scoped lang="less">
  .ewmoverdue{
    width:100%;
    height:100%;
    transform: translateY(-150px);
    background-color: rgba(255, 255, 255, 0.8);
    .tip{
      position: absolute;
      margin: 0 auto;
      top: 40%;
      left: 50%;
      font-size: 12px;
      color: rgba(0,0,0,0.80);
      transform: translate(-50%,-50%);
    }
    .F5{
      text-decoration: none;
      padding: 4px 10px;
      position: absolute;
      margin: 0 auto;
      top: 60%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size: 12px;
      text-align: center;
      background: linear-gradient(180deg, #81DD81 0%, #55A055 100%);
      border: 1px solid #5BAF5B;
      color: white;
      border-radius: 5px;
    }
  }
  .box{
    display: inline-block;
    width: 205px;
    height: 31px;
    text-align: center;
    line-height: 31px;
    font-size: 12px;
    border-radius: 5px;
    margin-top: 10px;
    color: white;
  }
  .login{
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 16px rgb(0 0 0);
    .title{
      width: 100%;
      height: 38px;
      font-size: 15px;
      font-weight: bold;
      color: rgb(255, 255, 255);
      background-color: rgb(45,45,45);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .contenta{
      width: 100%;
      height: 334px;
      background-color: rgb(255,255,255);
      .content1{
        .detail{
          width: 100%;
          height: 220px;
          margin: 0 auto;
          display: flex;
          transform: translateY(40px);
          background-color: rgb(255,255,255);
          .phone{
            margin-left: 100px;
          }
          .right{
            text-align: center;
            margin-left: 50px;
          }
        }
      }
      .content2{
        .detail{
          width: 85%;
          margin: 0 auto;
          display: flex;
          transform: translateY(40px);
          // background-color: rgb(255,255,255);
          .left{
            border-right: 1px solid rgb(204,204,204);
            margin-right: 30px;
            padding-right: 30px;
            .phonelogin{
              .box();
              border: 1px solid rgb(57, 132, 206);
              background-image: linear-gradient(rgb(59, 138, 212),rgb(31, 112, 192));
            }
            .registered{
              .box();
              text-indent: 20px;
              letter-spacing:20px;
              border: 1px solid rgb(196, 196, 196);
              color: #000;
              background-image: linear-gradient(rgb(255, 255, 255),rgb(241, 241, 241));
            }
          }
          .right{
            li{
              line-height: 48px;
              font-size: 12px;
              span{
                vertical-align: bottom;
                display: inline-block;
                margin-left: 15px;
                transform: translateY(-5px);
              }
            }
          }
        }
        .hetong{
          transform: translateY(70px);
          font-size: 12px;
          margin-left: 30px;
          a{
            text-decoration:none;
            color: rgb(80, 125, 175);
          }
        }
        .changeewm{
          position: absolute;
          right: 0;
          bottom:-2px;
        }
      }
      
    }
    .contentb{
      width: 530px;
      height: 273px;
      background-color: rgb(255,255,255);
      .content3{
        width: 100%;
        height: 151px;
        padding: 30px 0 43px;
        .phonebox{
          width: 50%;
          height: 100%;
          margin: 0 auto;
          .phonetext{
            width: 100%;
            height: 30px;
            border: 1px solid rgb(205,205,205);
            line-height: 30px;
            text-align: center;
            display: flex;
            background-color: rgb(255,255,255);
            .phonecheck{
              border-right: 1px solid  rgb(205,205,205);
              padding: 0 15px 0 5px;
            }
            .phonea{
              width: 100%;
              height: 100%;
              text-decoration: none;
              color:black;
              font-size:12px;
            }
          }
          .phonepassword{
            width: 100%;
            height: 30px;
            margin-top: 15px;
            border: 1px solid rgb(205,205,205);
            background-color: rgb(255,255,255);
          }
          .phoneother{
            color:rgb(102,102,102);
            display: flex;
            justify-content: space-between;
          }
          .loginclick{
            width: 100%;
            height: 31px;
            text-align: center;
            border-radius: 5px;
            margin-top: 25px;
            background-image: linear-gradient(rgb(59, 138, 212),rgb(31, 112, 192));
          }
        }
        .otherlogin2{
          width: 100%;
          height: 49px;
          transform: translateY(42px);
          font-size: 12px;
          background-color: rgb(247,247,247);
          border-top: 1px solid rgb(198,198,198);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    
  .othermode{
    width: 118px;
    height: 28px;
    margin: 0 auto;
    line-height: 28px;
    text-align: center;
    border: 1px solid #979797;
    color: rgba(0,0,0,0.80);
    font-size: 12px;
    border-radius: 15px;
    cursor: pointer;
    transform: translateY(60px);
  }
  }
  
</style>