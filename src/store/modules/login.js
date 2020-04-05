import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'

const getters = {

};

const mutations = {

};

const actions = {
	signIn({commit, dispatch}, authData){
		axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyDL8y7NwSxsYvaNf8M7K_MwMoNMhgMSzow', {
			email: authData.email,
			password: authData.password,
			returnSecureToken: true
		})
		.then(res => {
			const now = new Date();
			const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
			localStorage.setItem('token', res.data.idToken);
			localStorage.setItem('userId', res.data.localId);
			localStorage.setItem('expirationDate', expirationDate);
			commit('setUserData',{
				token: res.data.idToken,
				userId: res.data.localId
			});
			dispatch('autoLogout', res.data.expiresIn);

		})
		.catch(err => console.log(err));
	}
};

export default {
	getters, mutations, actions
};