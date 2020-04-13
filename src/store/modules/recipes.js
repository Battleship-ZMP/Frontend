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
		photo: ''
	}
	
};

const getters = {
	getRecipes(state){
		return state.recipes;
	},
	getCurrentRecipe(state){
		return state.currentRecipe;
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
	}
};

const actions = {
	loadRecipes({commit}){
		db.collection('recipes').get().then((query) =>{
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
		console.log(recipeData);
		const storageRef = fb.storage().ref('avatars/'+localStorage.getItem('userId')+'/'+ recipeData.file.name);
		const uploadTask = storageRef.put(recipeData.file);
		uploadTask.on('state_changed', snapshot=>{

		}, error=>{
		}, ()=>{
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				console.log('File available at', downloadURL);
				delete recipeData.file;
				recipeData.photo = downloadURL;
				db.collection('recipes').add(recipeData);
			});
		});
	}

};

export default{
	state, getters, mutations, actions
};

