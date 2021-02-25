<template>
  <div>
    <div class="frame1">
      <!-- 热门推荐 -->
      <div class="hotrecommend">
        <!-- 热门标题 -->
        <div class="hottitle">
          <!-- 同心圆 -->
          <div class="tongxinyuan">
            <div class="big"></div>
            <div class="small"></div>
            <span class="name">热门推荐</span>
          </div>
          <!-- 同心圆 -->

          <!-- 标题内容 -->
          <div class="titlecontent">
            <div v-for="(item, index) in title1" :key="index" class="title1">
              {{ item }}
            </div>
          </div>
          <!-- 标题内容 -->

          <!-- 更多 -->
          <div class="gengduo">
            更多
            <span
              style="font-size: 13px; color: rgb(193, 13, 12)"
              class="iconfont icon-xiangqian"
            ></span>
          </div>
          <!-- 更多 -->
        </div>
        <!-- 热门标题 -->

        <!-- 热门歌单内容 -->
        <div class="neirong">
          <div
            class="neirong1"
            v-for="(item, index) in recommendedleftdata"
            :key="index"
          >
            <div class="neirong2">
              <div class="img">
                <img class="neirong2img" :src="item.picUrl" alt="" />
                <div class="beijing1"></div>
              </div>

              <div class="bf1">
                <div class="iconfont icon-erji" style="font-size: 12px">
                  {{ finallyplayCount(item.playCount) }}
                </div>
                <div
                  class="iconfont icon-bo_fang"
                  style="font-size: 15px"
                ></div>
              </div>
              <div class="name1">{{ item.name }}</div>
            </div>
          </div>
        </div>

        <!-- 热门歌单内容 -->
      </div>
      <!-- 热门推荐 -->

      <!-- 新碟上架 -->
      <div class="newshelves">
        <div class="newshelvescontent">
          <div class="newshelvestitle">
            <!-- 同心圆 -->
            <div class="tongxinyuan">
              <div class="big"></div>
              <div class="small"></div>
              <span class="name">新碟上架</span>
            </div>
            <!-- 同心圆 -->

            <!-- 更多 -->
            <div class="gengduo">
              更多
              <span
                style="font-size: 13px; color: rgb(193, 13, 12)"
                class="iconfont icon-xiangqian"
              ></span>
            </div>
            <!-- 更多 -->
          </div>

          <div class="newshelvescontent">
            <div class="newshelvestext">
              <div
                class="iconfont icon-zuo"
                @click="zuo()"
                style="position: relative"
                :style="{ color: disable ? '#999' : 'black' }"
              ></div>

              <div class="newshelvesbox">
                <!-- 'transition':dd==true ? 'none 0s ease 0s':'left 1s ease-out 0s' -->
                <ul
                  class="newshelvesbox1"
                  style="position: absolute; top: 25px"
                  :style="{ left: left[0] + 'px' }"
                >
                  <li
                    class="boxtext"
                    v-for="(item, index) in firstdata"
                    :key="index"
                  >
                    <div class="imgbox">
                      <img class="boximg" :src="item.blurPicUrl" alt="" />
                      <div class="beijing2"></div>
                      <div class="cd"></div>
                    </div>
                    <a href="" style="font-size: 12px" class="songname">{{ item.name }}</a>
                    <p style="font-size: 12px; color: #666" class="songername">
                      {{ songername(item.artists) }}
                    </p>
                  </li>
                </ul>
                <ul
                  class="newshelvesbox1"
                  style="
                    position: absolute;
                    top: 25px;
                    transition: none 0s ease 0s;
                  "
                  :style="{ left: left[1] + 'px' }"
                >
                  <li
                    class="boxtext"
                    v-for="(item, index) in seconddata"
                    :key="index"
                  >
                    <div class="imgbox">
                      <img class="boximg" :src="item.blurPicUrl" alt="" />
                      <div class="beijing2"></div>
                      <div class="cd"></div>
                    </div>
                    <a href="" style="font-size: 12px" class="songname">{{ item.name }}</a>
                    <p style="font-size: 12px; color: #666" class="songername">
                      {{ songername(item.artists) }}
                    </p>
                  </li>
                </ul>
              </div>
              <div
                href="#"
                class="iconfont icon-jiantouyou"
                @click="you()"
                :style="{
                  color: disable ? 'black' : '#999',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 新碟上架 -->

      
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendedleft",
  props: {
    recommendedleftdata: {
      type: Array,
      default: [],
    },
    firstdata: {
      type: Array,
      default: [],
    },
    seconddata: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      title1: ["华语", "流行", "摇滚", "民摇", "电子"],
      left: [0, 645],
      disable: true,
      name: "",
    };
  },

  computed: {
    //歌单人数数量
    finallyplayCount() {
      return function (playCount) {
        if (playCount >= 10000) {
          return Math.round(playCount / 10000) + "万";
        } else {
          return playCount;
        }
      };
    },
    //歌手名字
    songername() {
      // const artists = this.seconddata.map((v) => v.artists);
      return function (artists){
        const length1 = (artists).length
        if(length1>1){
          let name = ''
          for(let i = 0;i<length1;i++){
            if(i<length1-1){
              name = name+artists[i].name+' / '
            }else{
              name = name+artists[i].name
            }
          }
          return this.name = name
        }else{
          return artists[0].name
        }
      }
    },
  },

  methods: {
    zuo() {
      if (this.left[0] == 0 && this.left[1] == 645) {
        alert("暂无专辑");
      } else {
        let one = 0;
        let two = 0;
        let left = [];
        this.left.map((v) => {
          if (v == 645) {
            one = 0;
          } else {
            two = 645;
          }
        });
        left.push(one, two);
        this.left = left;
        this.disable = true;
      }
    },
    you() {
      if (this.left[0] == 645 && this.left[1] == 0) {
        alert("暂无专辑");
      } else {
        let one = 0;
        let two = 0;
        let left = [];
        this.left.map((v) => {
          if (v == 645) {
            one = 0;
          } else {
            two = 645;
          }
        });
        left.push(two, one);
        this.left = left;
        this.disable = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.frame1 {
  // position: absolute;
  // position: relative;
  width: 730px;
  background-color: #fff;
  border: 1px solid rgb(211, 211, 211);
  .hotrecommend {
    width: 100%;
    height: 550px;
    padding-top: 20px;
    .hottitle {
      padding-bottom: 5px;
      border-bottom: 3px solid rgb(193, 12, 12);
      margin: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .titlecontent {
        flex: 5;
        display: flex;
        .title1 {
          border-right: 1px solid rgb(207, 208, 219);
          padding: 0 10px;
          font-size: 12px;
          color: rgb(102, 102, 102);
        }
      }
    }
    .neirong {
      margin: 0 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .neirong1 {
        width: 140px;
        height: 185px;
        margin-bottom: 50px;
        .neirong2 {
          width: 140px;
          height: 140px;
          padding: 20px 0 50px;
          .img {
            position: relative;
            .neirong2img {
              width: 140px;
              height: 140px;
            }
          }

          .bf1 {
            display: flex;
            color: rgb(204, 204, 204);
            justify-content: space-between;
            position: relative;
            top: -25px;
            padding: 3px 10px;
            background: rgba(0, 0, 0, 0.4);
          }
          .name1 {
            margin-top: -20px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .newshelves {
    width: 100%;
    height: 280px;
    .newshelvescontent {
      .newshelvestitle {
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 3px solid rgb(193, 12, 12);
        padding: 0 20px;
      }
      .newshelvescontent {
        width: 689px;
        height: 188px;
        margin: 0 20px;
        margin-top: 20px;
        border: 1px solid rgb(211, 211, 211);
        background-color: rgb(245, 245, 245);
        .newshelvestext {
          display: flex;
          height: 188px;
          width: 666px;
          margin: 0 auto;
          align-items: center;
          justify-content: space-between;
          .newshelvesbox {
            position: relative;
            width: 645px;
            height: 180px;
            display: flex;
            overflow: hidden;
            white-space: nowrap;
            justify-content: space-between;
            .newshelvesbox1 {
              list-style: none;
              display: flex;
              padding: 6px 10px;
              width: 645px;
              height: 180px;
              .boxtext {
                width: 116px;
                height: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 9px;
                .imgbox {
                  border: 1px solid rgb(172, 172, 172);
                  width: 108px;
                  height: 100px;
                  box-shadow: 0px 5px 5px #888888;
                  margin-bottom: 5px;
                  position: relative;
                  z-index: 9;

                  .boximg {
                    border: 1px solid rgb(172, 172, 172);
                    width: 100px;
                    height: 100px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.cd {
  width: 50px;
  height: 100px;
  background: rgba(14, 14, 14, 0.75);
  border-radius: 0 1500px 1500px 0;
  position: absolute;
  top: 0px;
  right: -7px;
  z-index: -1;
}
.tongxinyuan {
  display: flex;
  flex: 1.2;
  align-items: center;
  padding-right: 5px;
}
.big {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgb(193, 12, 12);
}
.small {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  top: 0px;
  left: -13px;
}
.name {
  font-size: 20px;
}
.beijing {
  width: 0px;
  height: 0px;
  border-top: 60px solid white;
  border-left: 80px solid white;
  border-right: 60px solid transparent;
  border-bottom: 80px solid transparent;
  opacity: 0.2;
}
.beijing1 {
  .beijing();
  position: absolute;
  top: 0;
  left: 0px;
}
.beijing2 {
  width: 0px;
  height: 0px;
  border-top: 52px solid white;
  border-left: 55px solid white;
  border-right: 50px solid transparent;
  border-bottom: 50px solid transparent;
  position: absolute;
  top: 0;
  left: 0px;
  opacity: 0.2;
}
.gengduo {
  flex: 1;
  text-align: right;
  font-size: 12px;
  color: rgb(102, 102, 151);
}
a {
  text-decoration: none;
}
.songername{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>