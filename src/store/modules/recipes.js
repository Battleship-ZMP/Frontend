import Vue from 'vue'
import {fb, db} from '@/main'
import router from '@/router';

const state = {
	recipes: [],
	currentRecipe:{
		description: '',
		ingredients: '',
		instructions: '',
		name: '',
		rating: 0,
		date: '',
		userName: '',
		photo: '',
		savedByUsers: [],

	}
	
};

const getters = {
	getRecipes(state){
		return state.recipes;
	},
	getCurrentRecipe(state){
		return state.currentRecipe;
	},
	getSavedRecipes(state){
		const savedRecipes = [];
		for(let i=0 ; i<state.recipes.length ; i++){
			if(state.recipes[i].savedByUsers){
				if(state.recipes[i].savedByUsers.includes(localStorage.getItem('docId'))){
					savedRecipes.push(state.recipes[i]);
				}
			}
			
		}
		return savedRecipes;
	},
	getMyRecipes(state){
		const myRecipes = [];
		for(let i=0 ; i<state.recipes.length ; i++){
			if(state.recipes[i].userID == localStorage.getItem('docId')){
				myRecipes.push(state.recipes[i]);
			}
		}
		return myRecipes;
	}
};

const mutations = {
	setRecipes(state, recipes){
		state.recipes = recipes;
	},
	setCurrentRecipe(state, id){
		state.recipes.forEach((item,index)=>{
			if(item.id == id){
				for(let key in item){
					state.currentRecipe[key] = item[key];
				}
			}
		});
	},
	destroyCurrentRecipe(state){
		for(let key in state.currentRecipe){
			state.currentRecipe[key] = '';
		}
	}
};

const actions = {
	loadRecipes({commit}){
		db.collection('recipes').orderBy('date', 'desc').get().then((query) =>{
			const recipes = [];
			query.forEach(function(doc) {

				const recipe = {};
				for(let key in doc.data()){
					recipe[key] = doc.data()[key];
				}
				recipe['id'] = doc.id;
				recipes.push(recipe);
				
			});
			
			commit('setRecipes', recipes);
			const routerParamId = router.history.current.params.id;
			if(routerParamId){
				commit('setCurrentRecipe', routerParamId);
			}
		});
	},
	setCurrentRecipe({commit, dispatch}, id){
		commit('setCurrentRecipe', id);
	},
	addRecipe({commit},recipeData){
		const storageRef = fb.storage().ref('recipes/'+localStorage.getItem('userId')+'/'+ recipeData.file.name);
		const uploadTask = storageRef.put(recipeData.file);
		uploadTask.on('state_changed', snapshot=>{
		}, error=>{
		}, ()=>{
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				delete recipeData.file;
				recipeData.photo = downloadURL;
				db.collection('recipes').add(recipeData);
			});
		});
	},
	updateRecipe({commit},recipe){
		db.collection('recipes').doc(recipe.id).update(recipe);
	},
	editRecipe({dispatch}, recipeData){
		if(recipeData.file != null){
			const storageRef = fb.storage().ref('recipes/'+localStorage.getItem('userId')+'/'+ recipeData.file.name);
			const uploadTask = storageRef.put(recipeData.file);
			uploadTask.on('state_changed', snapshot=>{
			}, error=>{
			}, ()=>{
				uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
					delete recipeData.file;
					recipeData.photo = downloadURL;
					db.collection('recipes').doc(recipe.id).update(recipeData);
				});
			});
		}else{
			delete recipeData.file;
			dispatch('updateRecipe', recipeData);
		}
	}

};

export default{
	state, getters, mutations, actions
};

