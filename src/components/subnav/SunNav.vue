<template>
  <div class="sunnav">
    <div class="sunnavitem">
      <div :class="title.length == 0 ? 'title2' : 'title1'">
        <div
          @click="titleclick(index)"
          v-for="(item, index) in title"
          :key="index"
          :class="currindex == index ? 'active' : 'titleitem'"
        >
          {{ item }}{{ actived }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SunNav",
  props: {
    title: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      currindex: 0,
    };
  },
  computed: {
    actived() {
      let path = this.$route.path;
      switch (path) {
        case "/findmusic/recommended":
          this.currindex = 0;
          break;
        case "/findmusic/Leaderboard":
          this.currindex = 1;
          break;
        case "/searchjiemian":
          console.log(9);
        this.currindex = 8;
        break;
        // default:
        //   break;
      }
    },
  },
  methods: {
    titleclick(index) {
      this.currindex = index;
      this.$emit("sunnavitemclick", index);
      // switch (index) {
      //   case value:

      //     break;

      //   default:
      //     break;
      // }
    },
  },
};
</script>

<style scoped lang="less">
.sunnav {
  width: 100%;
  background-color: rgb(194, 12, 12);
  .sunnavitem {
    margin: 0 auto;
    width: 800px;

    .title1 {
      width: 800px;

      color: white;
      display: flex;
      font-size: 13px;
      height: 35px;
      align-items: center;
    }
    .title2 {
      height: 7px;
    }
    .active {
      background-color: rgb(155, 9, 9);
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 20px;
      padding: 0 20px;
      margin: 0 18px;

    }
    .titleitem {
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 20px;
      padding: 0 20px;
      margin: 0 18px;
      cursor: pointer;

    }
  }
}
// @media screen and (max-width: 1835px) {
//   .sunnav {
//     .sunnavitem {
//       width: 55%;
//     }
//   }
// }
// @media screen and (max-width: 1376px) {
//   .sunnav {
//     .sunnavitem {
//       width: 68%;
//     }
//   }
// }
// @media screen and (max-width: 1178px) {
//   .sunnav {
//     width: 100%;
//     .sunnavitem {
//       width: 66%;
//     }
//   }
// }
// @media screen and (max-width: 1083px) {
//   .sunnav {
//     width: 121%;
//     .sunnavitem {
//       width: 68%;
//     }
//   }
// }
// @media screen and (max-width: 877px) {
//   .sunnav {
//     width: 144%;
//     .sunnavitem {
//       width: 68%;
//     }
//   }
// }
</style>