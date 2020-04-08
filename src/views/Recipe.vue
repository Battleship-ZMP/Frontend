<template>
	<v-container class="recipe-container">
		<v-row class="">
			<v-col class="" cols="12" md="8" sm="8">
				<img :src="recipe.photo" alt=""></v-col>
				<v-col class="justify-center d-flex flex-column" cols="12" md="4" sm="4">
					<h2 class="display-1">{{recipe.name}}</h2>
					<p>Dodano: {{recipe.date}}</p>
					<div class="d-flex">
						<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in recipe.rating" :key="recipe.rating">mdi-star</v-icon>						
						<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in 5-recipe.rating" :key="recipe.rating">mdi-star-outline</v-icon>
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
		</v-container>
	</template>

	<script>
		export default{
			computed:{
				recipe(){
					return this.$store.getters.getCurrentRecipe;
				}
			},
			created(){
				this.$store.dispatch('loadRecipes');
			}
		}
	</script>

	<style>
		.recipe-container{
			padding: 5rem;
		}	
	</style>