import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'
import {db, auth} from '@/main'


const actions = {
	signUp({commit, dispatch}, authData){
		auth.createUserWithEmailAndPassword(authData.email, authData.password).then(cred=>{
			console.log(cred.user);
			const userData = {
				userId: cred.user.uid,
				token: cred.user.refreshToken,
				userName: authData.userName
			}
			const now = new Date();
			const timeToLogout = 3600;
			const expirationDate = new Date(now.getTime() + timeToLogout * 1000);
			localStorage.setItem('token', userData.token);
			localStorage.setItem('userId', userData.userId);
			localStorage.setItem('expirationDate', expirationDate);
			commit('setUserData', userData);
			delete authData.password;
			dispatch('saveNewUser', authData);
			dispatch('autoLogout', timeToLogout);
		});
		
	},
	saveNewUser({getters}, authData){
		if(!getters.getUserData.token){
			return
		}
		db.collection('users').add(authData);
	},
	
};

export default {
	actions
};