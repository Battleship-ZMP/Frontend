<template>
	<v-container class="">
		<v-row class="">
			<v-col class="" cols="12" md="4" sm="6" v-for="(recipe,index) in recipes" :key="recipe.id">
				<router-link class="" :to="`/recipe/${recipe.id}`" style="text-decoration: none;">
					<v-card class="" >
						<v-card-title class="justify-center">
							<img class="" src="https://cdn.vuetifyjs.com/images/john.jpg" alt="" style="max-width: 95%">
						</v-card-title>
						<v-card-text class="text-center">
							<div class="">
								<div class="caption grey--text">Przepis</div>
								<div class="">{{recipe.name}}</div>
							</div>
							<div class="">
								<div class="caption grey--text">Użytkownik</div>
								<div class="">{{recipe.userName}}</div>
							</div>
							<div class="">
								<div class="caption grey--text">Dodano</div>
								<div class="">{{recipe.date}}</div>
							</div>
							<div class="">
								<div class="caption grey--text">Ocena</div>
								<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in recipe.rating" :key="recipe.rating">mdi-star</v-icon>						
								<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in 5-recipe.rating" :key="recipe.rating">mdi-star-outline</v-icon>
							</div>
						</v-card-text>
						<v-divider class=""></v-divider>

					</v-card>
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default{
		
		computed:{
			recipes(){
				const recipes = this.$store.getters.getRecipes;
				const profileRecipes = [];
				if(this.$route.path == '/myProfile'){
					for(var i=0 ; i<recipes.length ; i++){
						if(recipes[i].userName == localStorage.getItem('userName')){
							profileRecipes.push(recipes[i]);
						}
					}
					return profileRecipes;
				}else{
					return recipes;
				}
			}
		},
		created(){
			
			this.$store.dispatch('loadRecipes');

		}
	}
</script>


