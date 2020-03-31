import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'

const getters = {

};

const mutations = {

};

const actions = {
	signIn({commit}, authData){
		axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyDL8y7NwSxsYvaNf8M7K_MwMoNMhgMSzow')
		.then(res => {
			
		})
		.catch(err => console.log(err));
	}
};

export default {
	getters, mutations, actions
};