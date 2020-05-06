<template>
	<v-container class="recipe-container">
		<v-row class="">
			<v-col class="" cols="12" md="8" sm="8">
				<img :src="recipe.photo" alt="" class="recipe-img"></v-col>
				<v-col class="justify-center d-flex flex-column" cols="12" md="4" sm="4">
					<div class="d-flex justify-end">
						<v-btn v-if="!this.recipe.savedByUsers.includes(user.docId) && user.docId != null && user.docId != recipe.userID" depressed color="teal" class="white--text d-flex align-center" @click="saveRecipe">
							<v-icon class="" left>mdi-plus</v-icon>
							<p class="ma-0">Zapisz</p>
						</v-btn>
						<v-btn v-if="user.docId == recipe.userID" @click="editRecipe" depressed color="teal" class="white--text d-flex align- mr-2">
							<v-icon class="" left>mdi-pencil</v-icon>
							<p class="ma-0">Edytuj</p>
						</v-btn>
						<v-btn v-if="user.docId == recipe.userID" @click="deleteRecipe" depressed color="error" :loading="deleteLoading" class="white--text d-flex align-center">
							<v-icon class="" left>mdi-trash-can</v-icon>
							<p class="ma-0">Usuń</p>
						</v-btn>
						<v-btn v-if="this.recipe.savedByUsers.includes(user.docId) ? true : false" depressed color="grey" class="white--text d-flex align-center" @click="unSaveRecipe">
							<v-icon class="" left>mdi-check</v-icon>
							<p class="ma-0">Zapisano</p>
						</v-btn>
					</div>
					<h2 class="display-1">{{recipe.name}}</h2>
					<p>Dodano: {{recipe.date}}</p>
					<div class="d-flex">
						<v-icon class="" color="yellow darken-1" :size="20" v-for="(recipe, index) in rating" :key="recipe.rating">mdi-star</v-icon>						
						<v-icon class="" color="yellow darken-1" :size="20" v-for="(recipe,index) in 5-rating" :key="recipe.rating">mdi-star-outline</v-icon>
						<v-dialog v-model="dialog" persistent max-width="400">
							<template v-slot:activator="{ on }">
								<v-btn v-if="user.docId" @click="selectedStar = null" v-on="on" color="teal" depressed class="ml-2 d-flex white--text align-center">
									<v-icon class="" left>mdi-star</v-icon>
									<p class="ma-0">Oceń</p>
								</v-btn>
							</template>
							<v-card class="">
								<v-card-title class="headline teal white--text" color="teal" teal primary-title>Oceń przepis!</v-card-title>
								<v-card-text class="pa-5 justify-center d-flex">

									<v-icon class="recipe-star" color="yellow darken-1" :size="star.size" v-for="(star, index) in starType" @mouseleave="resetStars" @mouseenter="fillStars(index)" @click="selectStar(index)"  :key="index">{{star.name}}</v-icon>

								</v-card-text>
								<v-divider></v-divider>
								<v-card-actions>
									<v-btn color="teal" class="white--text" @click="rateRecipe">Wyślij</v-btn>
									<v-btn color="error" class="white--text" @click="closeDialog">Zamknij</v-btn>
								</v-card-actions></v-card>
							</v-dialog>
						</div>
						<div>
							<p>Autor: {{recipeUserName}}</p>
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
				<v-snackbar v-model="snackbar" :timeout="4000" class="white--text" color="teal" right>
					{{ alertText  }}
					<v-btn color="white" text @click="snackbar = false">
						Zamknij
					</v-btn>
				</v-snackbar>
			</v-container>
		</template>

		<script>
			export default{
				data(){
					return{
						snackbar: false,
						alertText: '',
						saved: false,
						currentUserID: localStorage.getItem('docId'),
						dialog: false,
						selectedStar: null,
						starType: [
						{name: 'mdi-star-outline', size: 50}, 
						{name: 'mdi-star-outline', size: 50},
						{name: 'mdi-star-outline', size: 50},
						{name: 'mdi-star-outline', size: 50},
						{name: 'mdi-star-outline', size: 50}
						],

					}
				},
				watch:{
					'$route.params.id'(){
						this.$store.dispatch('setCurrentRecipe',this.$route.params.id);
					}
				},
				computed:{
					recipe(){
						return this.$store.getters.getCurrentRecipe;
					},
					user(){
						return this.$store.getters.getUserData;
					},
					rating(){
						if(this.recipe.rating.length > 0){
							return this.recipe.rating.reduce((a,b)=> {return a+b;}) / this.recipe.rating.length;
						}else{
							return 0;
						}
					},
					recipeUserName(){
						return this.$store.getters.getRecipeUserName;
					},
					deleteLoading(){
						return this.$store.getters.getDeleteLoading;
					}
					
				},
				created(){
					this.$store.dispatch('loadRecipes');
					this.$store.commit('setCurrentRecipe', this.$route.params.id);
				},
				methods:{
					deleteRecipe(){
						this.$store.commit('setDeleteLoading', true);
						this.$store.dispatch('deleteRecipe',this.recipe.id);
						this.snackbar = true;
						this.alertText = 'Pomyślnie usunięto przepis!';
						setTimeout(()=>{
							this.$router.push('/');
							this.$store.dispatch('loadRecipes');
						},4000);
					},
					saveRecipe(){
						if(!localStorage.getItem('token')){
							alert('Musisz się zalogować!');
							return;
						}
						const recipe = this.recipe;
						if(!recipe.savedByUsers){
							recipe.savedByUsers = [];
						}
						if(!recipe.savedByUsers.includes(localStorage.getItem('docId'))){
							recipe.savedByUsers.push(localStorage.getItem('docId'));
							this.saved = true;
						}
						this.$store.dispatch('updateRecipe', recipe);
					},
					unSaveRecipe(){
						const recipe = this.recipe;
						if(!recipe.savedByUsers){
							recipe.savedByUsers = [];
						}
						for(let i=0; i<recipe.savedByUsers.length ; i++){
							if(recipe.savedByUsers[i] == localStorage.getItem('docId')){
								recipe.savedByUsers.splice(i,1);
							}
						}
						this.$store.dispatch('updateRecipe', recipe);
						this.saved = false;
					},
					editRecipe(){
						this.$router.push('/recipeform/'+this.recipe.id);
					},
					rateRecipe(){
						if(this.selectedStar == null){
							return;
						}
						if(!Array.isArray(this.recipe.rating)){
							this.recipe.rating = [];
						}
						this.recipe.rating.push(this.selectedStar);
						this.$store.dispatch('updateRecipe', this.recipe);
						for(let i =0 ;i< 5 ;i++){
							this.starType[i].name = 'mdi-star-outline';
							this.starType[i].size = 50;
						}
						this.dialog = false;
					},
					fillStars(index){
						for(let i=0 ; i<index+1 ;i++){
							this.starType[i].name = 'mdi-star';
						}
					},
					closeDialog(){
						this.dialog = false;
						for(let i =0 ;i< 5 ;i++){
							this.starType[i].name = 'mdi-star-outline';
							this.starType[i].size = 50;
						}
					},
					resetStars(){
						for(let i=0 ; i<5 ;i++){
							if(this.selectedStar == null || this.selectedStar <= i){
								this.starType[i].name = 'mdi-star-outline';
							}
						}
					},
					selectStar(index){
						var isSelected = false;
						if(this.selectedStar == null){
							this.selectedStar = index+1;
						}else if(this.selectedStar != index+1 ){
							this.selectedStar = index+1;
						}else{
							if(this.selectedStar == index+1){
								isSelected = true;
							}
						}
						for(let i=0 ; i<5 ;i++){
							if(i == index){
								this.starType[i].size = 80;
								this.starType[i].name = 'mdi-star';

							}else{
								this.starType[i].size = 50;
								this.starType[i].name = 'mdi-star-outline';
							}
							if(i <= index){
								this.starType[i].name = 'mdi-star';
							}else{
								this.starType[i].name = 'mdi-star-outline';
							}
							if(isSelected){
								this.starType[i].name = 'mdi-star-outline';
								this.starType[i].size = 50;
								this.selectedStar = null;
							}

						}
						
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
			.recipe-star{
				cursor: pointer;
			}	
		</style>