import Vue from 'vue'

const actions = {
	logout({commit}){
		commit('clearAuthData');
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('id');
	},
	autoLogout({dispatch}, expirationTime){
		setTimeout(()=>{
			dispatch('logout');
		}, expirationTime * 1000);
	}
}

export default {
	actions
}