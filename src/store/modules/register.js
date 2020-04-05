import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'
import axiosDb from '@/axios-files/axios-db'


const actions = {
	signUp({commit, dispatch}, authData){
		axiosAuth.post('/accounts:signUp?key=AIzaSyDL8y7NwSxsYvaNf8M7K_MwMoNMhgMSzow', {
			email: authData.email,
			password: authData.password,
			returnSecureToken: true
		}).then(res => {
			console.log(res);
			const userData = {
				userId: res.data.localId,
				token: res.data.idToken,
			}
			const now = new Date();
			const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
			localStorage.setItem('token', res.data.idToken);
			localStorage.setItem('userId', res.data.localId);
			localStorage.setItem('expirationDate', expirationDate);
			commit('setUserData', userData);
			dispatch('saveNewUser', authData);
		})
		.catch(err => {
			console.log(err);
		});
	},
	saveNewUser({getters}, authData){
		if(!getters.getUserData.token){
			return
		}
		console.log(getters.getUserData.token);
		axiosDb.post('/users.json?auth=' + getters.getUserData.token, authData);
	},
	
};

export default {
	actions
};