import Vue from 'vue'
import db from '@/firebase-settings/fb-settings'

const state = {
	recipes: [],
	currentRecipe:{
		description: '',
		ingredients: '',
		instructions: '',
		name: '',
		rating: 0,
		date: '',
		userName: ''
	}
	
};

const getters = {
	getRecipes(state){
		return state.recipes;
	}
};

const mutations = {
	setRecipes(state, recipes){
		state.recipes.push(recipes);
	},
	setCurrentRecipe(state){
		state.recipes.forEach((item,index)=>{
			if(item.userName == localStorage.getItem('userName')){
				console.log(item.userName);
			}
			
		});
	}
};

const actions = {
	loadRecipes({commit}){
		db.collection('recipes').get().then((query) =>{
			query.forEach(function(doc) {
				const recipes = {};
				for(let key in doc.data()){
					recipes[key] = doc.data()[key];
				}
				commit('setRecipes', recipes);
			});
		});
	}

};

export default{
	state, getters, mutations, actions
};

