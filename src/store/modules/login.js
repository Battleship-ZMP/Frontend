import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'

const getters = {

};

const mutations = {

};

const actions = {
	signIn({commit}, authData){
		axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyDL8y7NwSxsYvaNf8M7K_MwMoNMhgMSzow', {
			email: authData.email,
			password: authData.password,
			returnSecureToken: true
		})
		.then(res => {
			commit('setUserData',{
				token: res.data.idToken,
				userId: res.data.localId
			})

		})
		.catch(err => console.log(err));
	}
};

export default {
	getters, mutations, actions
};