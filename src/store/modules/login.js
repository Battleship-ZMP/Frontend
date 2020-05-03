import Vue from 'vue'
import axiosAuth from '@/axios-files/axios-auth'
import axiosDb from '@/axios-files/axios-db'
import {db, auth} from '@/main.js'


const actions = {
	signIn({commit, dispatch}, authData){
		auth.signInWithEmailAndPassword(authData.email, authData.password).then(cred=>{
			db.collection('users').get().then((query) =>{
				query.forEach(function(doc) {
					if(doc.data().email == authData.email){
						
						const now = new Date();
						const timeToLogout = 3600;
						const expirationDate = new Date(now.getTime() + timeToLogout * 1000);
						const userData = {
							token: cred.user.refreshToken,
							userId: cred.user.uid,
							userName: doc.data().userName,
							expirationDate: expirationDate,
							photo: doc.data().photo,
							bio: doc.data().bio,
							docId: doc.id,
							email: doc.data().email
						};
						for(let key in userData){
							localStorage.setItem(key, userData[key]);
						}
						commit('setUserData', userData);
						dispatch('autoLogout', timeToLogout);
					}
				});
			});
		});
		
	}
};

export default {
	actions
};