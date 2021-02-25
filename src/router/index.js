import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
const findmusic = ()=> import("../view/findmusic/Findmusic.vue")
const mymusic = ()=>import("../view/mymusic/Mymusic.vue")
const recommended = ()=>import("../view/findmusic/recommended/recommended.vue")
const Leaderboard = ()=>import("../view/findmusic/Leaderboard/Leaderboard.vue")
const router = new VueRouter({
  mode:"history",
  routes:[
    {
      path: "/",
      redirect: "/findmusic"
    },
    {
      path: "/findmusic",
      component: findmusic,
      meta:{
        title: '首页'
      },
      children:[
        {
          path: "recommended",
          component: recommended
        },
        {
          path: "Leaderboard",
          component: Leaderboard
        }
      ]
    },
    {
      path: "/mymusic",
      component: mymusic
    }
  ]
})
export default router