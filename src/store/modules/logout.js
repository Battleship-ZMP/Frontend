import Vue from 'vue'
import {auth} from '@/main'

const actions = {
	logout({commit, getters}){
		commit('clearAuthData');
		const userData = getters.getUserData;
		for(let key in userData){
			if(localStorage.getItem(key) != 'SILENT'){
				localStorage.removeItem(key);
			}
			
		}
		auth.signOut();

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