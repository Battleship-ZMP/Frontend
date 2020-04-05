import Vue from 'vue'
import Vuex from 'vuex'
import register from './modules/register';
import autoLogin from './modules/autoLogin';
import logout from './modules/logout';
import login from './modules/login';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		register,
		autoLogin,
		logout,
		login
	},
	state:{
		userData:{
			userId: null,
			token: null,
			user: null
		}
		
	},
	getters:{
		getUserData(state){
			return state.userData;
		}
	},
	mutations : {
		setUserData(state, userData){
			state.userData.userId = userData.userId;
			state.userData.token = userData.token;
		},
		clearAuthData(state){
			state.userData.token = null;
			state.userData.userId = null;
			state.userData.user = null;
		}
	}
})
