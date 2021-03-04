import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const state = {
  musicparms:[],
  duomusicparms:[],
  finmusicparms:[]
}
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
export default store