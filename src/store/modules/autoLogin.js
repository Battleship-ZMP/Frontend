import Vue from 'vue'
import axios from '@/axios-files/axios-db'

const actions = {
	fetchUser({getters}){
		
		if(!getters.getToken){
			return
		}
		console.log(getters.getToken);
		axios.get('/users.json?auth=' + getters.getToken)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
	},
	autoLogin({commit}){
		const token = localStorage.getItem('token');
		if(!token){
			return
		}
		const userId = localStorage.getItem('userId');
		commit('setUserData', {
			token: token,
			userId: userId
		});
	}
};

export default {actions};
