import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './assets/css/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.bbus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
