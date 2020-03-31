import Vue from 'vue'
import Vuex from 'vuex'
import view from './modules/view';
import form from './modules/form';
import register from './modules/register';
import user from './states/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
		view,
		form,
		register
	},
	state:{
		user,
	}
})
