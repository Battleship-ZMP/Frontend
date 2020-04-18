import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'
import axiosDb from '@/axios-files/axios-db'
import {db} from '@/main.js'


const actions = {
	signIn({commit, dispatch}, authData){
		axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyDL8y7NwSxsYvaNf8M7K_MwMoNMhgMSzow', {
			email: authData.email,
			password: authData.password,
			returnSecureToken: true
		})
		.then(res => {
			db.collection('users').get().then((query) =>{
				query.forEach(function(doc) {
					if(doc.data().email == authData.email){
						
						const now = new Date();
						const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
						const userData = {
							token: res.data.idToken,
							userId: res.data.localId,
							userName: doc.data().userName,
							expirationDate: expirationDate,
							photo: doc.data().photo,
							bio: doc.data().bio,
						};
						for(let key in userData){
							localStorage.setItem(key, userData[key]);
						}
						commit('setUserData', userData);
						dispatch('autoLogout', res.data.expiresIn);
					}
				});
			});
		})
		.catch(err => console.log(err));
	}
};

export default {
	actions
};