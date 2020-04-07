import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'
import db from '@/firebase-settings/fb-settings'


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
				userName: authData.userName
			}
			const now = new Date();
			const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
			localStorage.setItem('token', res.data.idToken);
			localStorage.setItem('userId', res.data.localId);
			localStorage.setItem('expirationDate', expirationDate);
			commit('setUserData', userData);
			dispatch('saveNewUser', authData);
			dispatch('autoLogout', res.data.expiresIn);
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
		db.collection('users').add(authData);
	},
	
};

export default {
	actions
};