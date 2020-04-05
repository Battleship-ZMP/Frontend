import Vue from 'vue'
import Vuex from 'vuex'
import register from './modules/register';
import autoLogin from './modules/autoLogin';
import logout from './modules/logout';
import login from './modules/login';
import users from './modules/users';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		register,
		autoLogin,
		logout,
		login,
		users
	},
	state:{
		userData:{
			userId: null,
			token: null,
			user: null,
			userName: null
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
			state.userData.userName = userData.userName;
		},
		clearAuthData(state){
			const obj = state.userData;
			Object.keys(obj).forEach(function(index) {
				obj[index] = null;
			});
		}
	}
})
