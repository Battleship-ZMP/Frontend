import Vue from 'vue'
import axios from '@/axios-files/axios-db'

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
	}
};

export default {
	state, getters, mutations, actions
};