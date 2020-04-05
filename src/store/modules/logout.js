import Vue from 'vue'

const actions = {
	logout({commit}){
		commit('clearAuthData');
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('id');
	}
}

export default {
	actions
}