<template>
	<v-container class="">
		<v-card class="">
			<v-row class="pa-3 mb-2" v-for="(recipe,index) in recipes" >
				<v-col class="" cols="12" md="6">
					<div class="caption grey--text">Przepis</div>
					<div class="">{{recipe.name}}</div>
				</v-col>
				<v-col class="" cols="6" sm="4" md="2">
					<div class="caption grey--text">Użytkownik</div>
					<div class="">{{recipe.userName}}</div>
				</v-col>
				<v-col class="" cols="6" sm="4" md="2">
					<div class="caption grey--text">Dodano</div>
					<div class="">{{recipe.date}}</div>
				</v-col>
				<v-col class="" cols="12" sm="4" md="2">
					<div class="caption grey--text">Ocena</div>
					<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in recipe.rating">mdi-star</v-icon>						
					<v-icon class="" color="yellow darken-1" :size="20" v-for="recipe in 5-recipe.rating">mdi-star-outline</v-icon>
				</v-col>
			</v-row>
			<v-divider class=""></v-divider>

		</v-card>
	</v-container>
</template>

<script>
	export default{
		computed:{
			recipes(){
				return this.$store.getters.getRecipes;
			}
		},
		created(){
			this.$store.dispatch('loadRecipes');

		}
	}
</script>