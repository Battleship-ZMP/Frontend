<template>
	<v-card class="recipe-form-card">
		<v-card-title class="headline teal white--text" color="teal" teal primary-title>Edytuj profil</v-card-title>
		<v-card-text class="pa-5">
			<v-form ref="form">
				<v-row class="">
					<v-col class="" md="8" cols="12">
						<v-text-field class="" color="teal" label="Biografia" v-model="userData.bio" ></v-text-field>
						<v-text-field class="" color="teal" label="Stare hasło" v-model="userData.oldPassword" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :rules="[rules.minLength, rules.oldPassword]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
						<v-text-field class="" color="teal" label="Nowe hasło" v-model="userData.newPassword" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :rules="[rules.minLength]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
						<v-text-field class="" color="teal" label="Potwierdź Nowe hasło" v-model="userData.confirmNewPassword" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.matchPassword]"></v-text-field>
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
			<v-btn color="teal" class="white--text" :loading="editLoading" @click="submit">Wyślij</v-btn>
		</v-card-actions>
		<v-snackbar v-model="snackbar" :timeout="4000" class="white--text" color="teal" right>
			{{ alertText  }}
			<v-btn color="white" text @click="snackbar = false">
				Zamknij
			</v-btn>
		</v-snackbar>
	</v-card>
</template>

<script>
	

	export default{
		data(){
			return{
				show1: false,
				snackbar: false,
				alertText: '',
				photo: '',
				rules:{
					required: v => !!v || 'To pole jest wymagane!',
					isPhoto: v => !v || v.type.includes('image') || 'Zdjęcie albo nic!',
					matchPassword: v => v == this.userData.newPassword || 'Hasła muszą być takie same!',
					minLength: value => !value || value.length >= 8 || 'Hasło musi mieć minimum 8 znaków!',
					oldPassword: v=>{
						// if(this.userData.newPassword != ''){
							return !!v || 'Podaj stare hasło!';
						// }
					}
				},
				url: localStorage.getItem('photo'),
				file: null

			}
		},
		computed:{
			userData(){
				return this.$store.getters.getUserData;
			},
			editLoading(){
				return this.$store.getters.getEditLoading;
			}
		},
		watch:{
			editLoading(){
				if(this.editLoading == false){
					this.snackbar = true;
					this.alertText = 'Pomyślnie zedytowano profil!';
				}
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
					localStorage.setItem('bio', userData.bio);
					if(this.userData.newPassword != ''){
						this.$store.commit('setEditLoading', true);
						this.$store.dispatch('changeUserPassword', {
							newPassword: this.userData.newPassword,
							oldPassword: this.userData.oldPassword
						});
					}
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