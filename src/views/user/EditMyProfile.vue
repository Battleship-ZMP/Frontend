<template>
	<v-card class="recipe-form-card">
		<v-card-title class="headline teal white--text" color="teal" teal primary-title>Edytuj profil</v-card-title>
		<v-card-text class="pa-5">
			<v-form ref="form">
				<v-row class="">
					<v-col class="" md="8" cols="12">
						<v-text-field class="" color="teal" label="Biografia" v-model="userData.bio" ></v-text-field>
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
						<v-file-input class="" color="teal" label="Awatar" @change="avatar" counter show-size prepend-icon="mdi-camera" :rules="[rules.isPhoto]"></v-file-input>
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
	

	export default{
		data(){
			return{
				photo: '',
				rules:{
					required: v => !!v || 'To pole jest wymagane!',
					isPhoto: v => !v || v.type.includes('image') || 'Zdjęcie albo nic!',
				},
				url: localStorage.getItem('photo'),
				file: null

			}
		},
		computed:{
			userData(){
				return this.$store.getters.getUserData;
			}
		},
		methods:{
			submit(){
				if(this.$refs.form.validate()){

					const userData = {
						bio: this.userData.bio,
						file: this.file,
						photo: this.photo,
						docId: localStorage.getItem('docId')
					};
					console.log(userData);
					if(userData.file == null){
						userData.photo = this.url;
						this.$store.dispatch('editUserWithoutFile', userData);
					}else{

						this.$store.dispatch('editUserWithFile', userData);
					}
				}
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
		},
		created(){

			this.$store.dispatch('autoLogin');
			
		}
}
</script>