import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './assets/css/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
