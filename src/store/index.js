import Vue from 'vue'
import Vuex from 'vuex'
import view from './modules/view';
import form from './modules/form';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
		view,
		form
	},
})
