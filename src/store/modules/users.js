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
		db.collection('users').get().then(query=>{
			var users = [];
			query.forEach(doc=>{
				var user = {};
				for(let key in doc.data()){
					user[key] = doc.data()[key];
				}
				user.docId = doc.id;
				users.push(user);
			});
			commit('setUsers', users);
		});
		
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
	editUserWithoutFile({dispatch, commit}, userData){
		const docId = userData.docId;
		delete userData.docId;
		delete userData.file;
		commit('setUserData', userData);
		db.collection('users').doc(docId).update(userData);
	}
};

export default {
	state, getters, mutations, actions
};