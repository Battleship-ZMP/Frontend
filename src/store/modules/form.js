import Vue from 'vue';

const state = {
	userData: [],
}

const getters = {
	getUserData(state){
		return state.userData;
	}
};

const mutations = {
	'SET_USER_DATA'(state, data){
		state.userData.push(data);
		state.name = data.name;
	},
	'DELETE_BY_ID'(state, index){
		state.userData.splice(index,1);
	}
};

const actions = {
	setUserData({commit},data){

		commit('SET_USER_DATA',data);
	},
	pushData({commit}){
		Vue.http.put('data.json',state.userData);

	},
	getData({commit}){
		Vue.http.get('data.json').then(response=>response.json()).then(data=>{
			if(data){
				var userData = {};
				for(var i=0 ; i< data.length ; i++){
					userData={
						name: data[i].name,
						surname: data[i].surname,
						age: data[i].age
					};
				commit('SET_USER_DATA', userData);	
				}
				
			}
			
		});
	},
	deleteUserData({commit},index){
		commit('DELETE_BY_ID', index);
	}


};

export default{
	state, getters, mutations, actions
};
