<template>
	<v-card class="recipe-form-card">
		<v-card-title class="headline teal white--text" color="teal" teal primary-title>Dodaj przepis!</v-card-title>
		<v-card-text class="pa-5">
			<v-form ref="form">
				<v-row class="">
					<v-col class="" md="8" cols="12">
						<v-text-field class="" color="teal" label="Tytuł" v-model="name" :rules="[rules.required]"></v-text-field>
						<v-text-field class="" color="teal" label="Opis" v-model="description" :rules="[rules.required]"></v-text-field>
						<v-text-field class="" color="teal" label="Składniki" v-model="ingredients" :rules="[rules.required]"></v-text-field>
						<v-text-field class="" color="teal" label="Przepis" v-model="instructions" :rules="[rules.required]"></v-text-field>
					</v-col>
					<v-col class="" md="4" cols="12">
						<div class="text-center ">
							<v-avatar v-if="!url" class="" :size="170">
								<v-icon dark class="grey--text" :size="50">mdi-camera</v-icon>
							</v-avatar>
							<div tile color=""  class="avatar-recipe">
								<img v-if="url" :src="url" width="100%" height="auto" alt="">
							</div>
						</div>
						<v-file-input class="" color="teal" label="Zdjęcie" @change="avatar" counter show-size prepend-icon="mdi-camera" :rules="[rules.required]"></v-file-input>
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
				name: '',
				description: '',
				ingredients: '',
				instructions: '',
				photo: '',
				rules:{
					required: v => !!v || 'To pole jest wymagane!',
				},
				url: null,
				file: null

			}
		},
		methods:{
			submit(){
				if(this.$refs.form.validate()){

					const recipeData = {
						description: this.description,
						ingredients: this.ingredients,
						instructions: this.instructions,
						name: this.name,
						rating: 0,
						date: this.getDate(),
						userName: this.$store.getters.getUserData.userName,
						userID: this.$store.getters.getUserData.docId,
						photo: this.photo,
						file: this.file,
						savedByUsers: []
					};
					this.$store.dispatch('addRecipe', recipeData);
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
					this.url = URL.createObjectURL(event);
					this.photo = event.name;
					this.file = event;
					
				}else{
					this.url = null;
				}
				
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