<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on }">
			<v-btn class="white--text" text v-on="on">
				<span>Zaloguj się</span>
			</v-btn>
		</template>
		<v-card>
			<v-card-title class="headline teal white--text" color="teal" teal primary-title>Zaloguj się!</v-card-title>
			<v-card-text class="pa-5">
				<v-form ref="form">
					<v-text-field class="" color="teal" label="E-mail" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
					<v-text-field class="" color="teal" label="Hasło" v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :rules="[rules.required, rules.minLength]"></v-text-field>
				</v-form>
				<p>Nie masz jeszcze konta? Zarejestruj się!</p>
				<Register />
				
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn color="teal" class="white--text" @click="submit">Wyślij</v-btn>
				<v-btn color="error" class="white--text" @click="dialog = false">Zamknij</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import Register from './Register.vue'

	export default{
		data(){
			return{
				email: '',
				password: '',
				rules: {
					required: value => !!value || 'To pole jest wymagane!',
					email: value => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(value) || 'Niepoprawny email!'
					},
					minLength: value => value.length >= 8 || 'Hasło musi mieć minimum 8 znaków!',
				},
				show1: false,
				dialog: false,
			}
		},
		methods: {
			submit(){
				if(this.$refs.form.validate()){
					const authData = {
						email: this.email,
						password: this.password
					};
					this.dialog = false;
					this.$store.dispatch('signIn', authData);
				}
			},
			metoda(){
				console.log('login zamkniety');
			}
		},
		components:{
			Register
		}
	}
</script>