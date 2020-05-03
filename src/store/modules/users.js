import Vue from 'vue'
import axios from '@/axios-files/axios-db'
import {fb, db} from '@/main'
import firebase from 'firebase'

const state = {
	users: []
};

const getters = {
	getUsers(state){
		return state.users;
	}
}

const mutations = {
	setUsers(state, users){
		state.users = users;
	}
};

const actions = {
	getUsers({commit}){
		axios.get('/users.json')
		.then(res => {
			const userNames = [];
			for(let key in res.data){
				userNames.push(res.data[key].userName);

			}
			
			commit('setUsers', userNames);
		})
		.catch(err => console.log(err));
	},
	editUserWithFile({dispatch, commit}, userData){
		const storageRef = fb.storage().ref('avatars/'+localStorage.getItem('userId')+'/'+ userData.file.name);
		const uploadTask = storageRef.put(userData.file);
		uploadTask.on('state_changed', snapshot=>{
		}, error=>{
		}, ()=>{
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				delete userData.file;
				userData.photo = downloadURL;
				localStorage.setItem('photo', userData.photo);
				commit('setUserData', userData);
				const docId = userData.docId;
				delete userData.docId;
				db.collection('users').doc(docId).update(userData);
			});
		});
	},
	editUserWithoutFile({dispatch}, userData){
		const docId = userData.docId;
		delete userData.docId;
		delete userData.file;
		db.collection('users').doc(docId).update(userData);
	}
};

export default {
	state, getters, mutations, actions
};