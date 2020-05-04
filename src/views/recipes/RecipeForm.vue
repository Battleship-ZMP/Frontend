<template>
	<v-card class="recipe-form-card">
		<v-card-title class="headline teal white--text" color="teal" teal primary-title>{{!$route.params.id ? 'Dodaj przepis!': 'Edytuj przepis!' }}</v-card-title>
		<v-card-text class="pa-5">
			<v-form ref="form">
				<v-row class="">
					<v-col class="" md="8" cols="12">
						<v-text-field class="" color="teal" label="Tytuł" v-model="recipe.name" :rules="[rules.required]"></v-text-field>
						<v-text-field class="" color="teal" label="Opis" v-model="recipe.description" :rules="[rules.required]"></v-text-field>
						<v-text-field class="" color="teal" label="Składniki" v-model="recipe.ingredients" :rules="[rules.required]"></v-text-field>
						<v-text-field class="" color="teal" label="Przepis" v-model="recipe.instructions" :rules="[rules.required]"></v-text-field>
					</v-col>
					<v-col class="" md="4" cols="12">
						<div class="text-center ">
							<v-avatar v-if="recipe.photo == ''" class="" :size="170">
								<v-icon dark class="grey--text" :size="50">mdi-camera</v-icon>
							</v-avatar>
							<div tile color=""  class="avatar-recipe">
								<img v-if="recipe.photo != ''" :src="recipe.photo" width="100%" height="auto" alt="">
							</div>
						</div>
						<v-file-input class="" color="teal" label="Zdjęcie" @change="avatar" counter show-size prepend-icon="mdi-camera" ></v-file-input>
					</v-col>
				</v-row>
				
			</v-form>
		</v-card-text>
		<v-divider></v-divider>
		<v-card-actions class="pa-4">
			<v-btn color="teal" class="white--text" @click="submit">Wyślij</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import {fb, db} from '@/main'

	export default{
		data(){
			return{

				rules:{
					required: v => !!v || 'To pole jest wymagane!',
				},
				file: null

			}
		},
		methods:{
			submit(){
				if(this.$refs.form.validate()){


					if(this.$route.params.id != null){
						const recipeData = {
							description: this.recipe.description,
							ingredients: this.recipe.ingredients,
							instructions: this.recipe.instructions,
							name: this.recipe.name,
							rating: this.recipe.rating,
							date: this.getDate(),
							userName: this.$store.getters.getUserData.userName,
							userID: this.$store.getters.getUserData.docId,
							file: this.file,
							savedByUsers: this.recipe.savedByUsers,
							photo: this.recipe.photo,
							id: this.recipe.id
						};
						this.$store.dispatch('editRecipe', recipeData);
					}else{
						const recipeData = {
							description: this.recipe.description,
							ingredients: this.recipe.ingredients,
							instructions: this.recipe.instructions,
							name: this.recipe.name,
							rating: [],
							date: this.getDate(),
							userName: this.$store.getters.getUserData.userName,
							userID: this.$store.getters.getUserData.docId,
							file: this.file,
							savedByUsers: [],
						};
						console.log(recipeData);
						this.$store.dispatch('addRecipe', recipeData);
					}
				}
			},
			getDate(){
				var formatter = new Intl.DateTimeFormat('pl');
				const now = new Date();
				var date = formatter.format(now);
				date = date+ ' ' + now.getHours() + ':' + now.getMinutes();
				return date;
			},
			avatar(event){
				if(event){
					this.recipe.photo = URL.createObjectURL(event);
					this.file = event;
					
				}else{
					this.recipe.photo = null;
				}
				
			}
		},
		computed:{
			recipe(){
				return this.$store.getters.getCurrentRecipe;
			}
		},
		watch:{
			'$route.path'(){
				this.$store.commit('destroyCurrentRecipe');
			}
		}

	}
</script>

<style>
	.recipe-form-card{
		border: 1px solid #009688;
		margin: 50px;
	}

</style>