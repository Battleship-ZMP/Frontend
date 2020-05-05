<template>
	<v-container class="">
		<v-chip class="mr-2 sort-chip mb-2" @click="sortRecipes('date', 'asc')" filter filter-icon="mdi-chevron-up" :input-value="true">Czas dodania</v-chip>
		<v-chip class="mr-2 sort-chip mb-2" filter filter-icon="mdi-chevron-down" @click="sortRecipes('date', 'desc')" :input-value="true">Czas dodania</v-chip>
		<v-chip class="mr-2 sort-chip mb-2" @click="sortRecipes('name', 'asc')" filter filter-icon="mdi-chevron-up" :input-value="true">Nazwa</v-chip>
		<v-chip class="mr-2 sort-chip mb-2" @click="sortRecipes('name', 'desc')" filter filter-icon="mdi-chevron-down" :input-value="true">Nazwa</v-chip>
		<v-chip class="mr-2 sort-chip mb-2" @click="sortRecipes('rating', 'asc')" filter filter-icon="mdi-chevron-up" :input-value="true">Ocena</v-chip>
		<v-chip class="mr-2 sort-chip mb-2" filter filter-icon="mdi-chevron-down" @click="sortRecipes('rating', 'desc')" :input-value="true">Ocena</v-chip>
		<v-row class="">
			<v-col class=""  cols="12" md="4" sm="6" v-for="(recipe,index) in recipes" :key="recipe.id">
				<router-link class="" :to="`/recipe/${recipe.id}`" style="text-decoration: none;">
					<v-card class="h-100" >
						<v-card-title class="justify-center">
							<img class="" :src="recipe.photo" alt="" style=" height: 200px">
						</v-card-title>
						<v-card-text class="text-center">
							<div class="">
								<div class="caption grey--text">Przepis</div>
								<div class="">{{recipe.name}}</div>
							</div>
							<div class="">
								<div class="caption grey--text">Użytkownik</div>
								<div class="">{{getUserName(recipe.userID)}}</div>
							</div>
							<div class="">
								<div class="caption grey--text">Dodano</div>
								<div class="">{{recipe.date}}</div>
							</div>
							<div class="">
								<div class="caption grey--text">Ocena</div>
								<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in getRating(recipe.rating)" :key="recipe.rating">mdi-star</v-icon>						
								<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in 5-getRating(recipe.rating)" :key="recipe.rating">mdi-star-outline</v-icon>
							</div>
						</v-card-text>
						
					</v-card>
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default{
		props: ['givenRecipes'],
		computed:{
			recipes(){
				const recipes = this.$store.getters.getRecipes;
				const profileRecipes = [];
				if(this.$route.path == '/myprofile'){
					for(var i=0 ; i<recipes.length ; i++){
						if(recipes[i].userID == localStorage.getItem('docId')){
							profileRecipes.push(recipes[i]);
						}
					}
					return profileRecipes;
				}else{
					if(this.givenRecipes){
						return this.givenRecipes;
					}else{
						return recipes;
					}
				}
			},
			users(){
				return this.$store.getters.getUsers;
			}
		},
		methods:{
			getRating(rating){
				if(rating.length != 0){
					return rating.reduce((a,b)=> {return a+b;}) / rating.length;
				}else{
					return 0;
				}
			},
			sortRecipes(sortBy, sortType){
				this.$store.dispatch('sortRecipes', {
					sortBy: sortBy,
					sortType: sortType
				});
			},
			getUserName(userID){
				return this.$store.getters.getUserName(userID);
			}
		}
	}
</script>

<style>
	.sort-chip{
		cursor: pointer!important;
	}
</style>


