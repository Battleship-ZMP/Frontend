<template>
	<v-container class="recipe-container">
		<v-row class="">
			<v-col class="" cols="12" md="8" sm="8">
				<img :src="recipe.photo" alt="" class="recipe-img"></v-col>
				<v-col class="justify-center d-flex flex-column" cols="12" md="4" sm="4">
					<div class="d-flex justify-end">
						<v-btn v-if="!this.recipe.savedByUsers.includes(currentUserName) && currentUserName != null ? true : false" depressed color="teal" class="white--text d-flex align-center" @click="saveRecipe">
							<v-icon class="" left>mdi-plus</v-icon>
							<p class="ma-0">Zapisz</p>
						</v-btn>
						<v-btn v-if="this.recipe.savedByUsers.includes(currentUserName) ? true : false" depressed color="grey" class="white--text d-flex align-center" @click="unSaveRecipe">
							<v-icon class="" left>mdi-check</v-icon>
							<p class="ma-0">Zapisano</p>
						</v-btn>
					</div>
					<h2 class="display-1">{{recipe.name}}</h2>
					<p>Dodano: {{recipe.date}}</p>
					<div class="d-flex">
						<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in recipe.rating" :key="recipe.rating">mdi-star</v-icon>						
						<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in 5-recipe.rating" :key="recipe.rating">mdi-star-outline</v-icon>
					</div>
					<div>
						<p>Autor: {{recipe.userName}}</p>
					</div>
				</v-col>
			</v-row>
			<v-row class="flex-column">
				<h2 class="title">Opis:</h2>
				<p>{{recipe.description}}</p>
			</v-row>
			<v-row class="flex-column">
				<h2 class="title">Składniki:</h2>
				<p>{{recipe.ingredients}}</p>
			</v-row>
			<v-row class="flex-column">
				<h2 class="title">Przepis:</h2>
				<p>{{recipe.instructions}}</p>
			</v-row>
			{{$store.getters.getUserData.userName}}
		</v-container>
	</template>

	<script>
		export default{
			data(){
				return{
					saved: false,
					currentUserName: localStorage.getItem('userName'),
				}
			},
			computed:{
				recipe(){
					return this.$store.getters.getCurrentRecipe;
				}
			},
			created(){
				this.$store.dispatch('loadRecipes');

			},
			methods:{
				saveRecipe(){
					if(!localStorage.getItem('token')){
						alert('Musisz się zalogować!');
						return;
					}
					const recipe = this.recipe;
					if(!recipe.savedByUsers){
						recipe.savedByUsers = [];
					}
					if(!recipe.savedByUsers.includes(localStorage.getItem('userName'))){
						recipe.savedByUsers.push(localStorage.getItem('userName'));
						this.saved = true;
					}
					this.$store.dispatch('updateRecipe', recipe);
				},
				unSaveRecipe(){
					const recipe = this.recipe;
					console.log(recipe);
					if(!recipe.savedByUsers){
						recipe.savedByUsers = [];
					}
					for(let i=0; i<recipe.savedByUsers.length ; i++){
						if(recipe.savedByUsers[i] == localStorage.getItem('userName')){
							 recipe.savedByUsers.splice(i,1);
						}
					}
					this.$store.dispatch('updateRecipe', recipe);
					this.saved = false;
				}
			}
		}
	</script>

	<style>
		.recipe-container{
			padding: 5rem;
		}
		.recipe-img{
			max-width: 80%;
			height: auto;
		}	
	</style>