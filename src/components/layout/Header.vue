<template>
	<v-container>

		<v-app-bar class="grey lighten-4" flat app>
			<v-app-bar-nav-icon class="grey--text " @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="grey lighten-4  grey--text">
				<span class="font-weight-light">Cool</span>
				<span>Recipes</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<Login v-if="!isLogged" />
			<Register v-if="!isLogged" />
			<v-btn v-if="isLogged" @click="logout" text color=" lighten-4" class=" text--darken-1 font-weight-normal" style="color: #9e9e9e;" >
				<span>Wyloguj</span>
				<v-icon right>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" color="teal" left app dark>
			<v-list dense nav class="py-0">
				<v-row class="align-center justify-center mt-5 mb-3 flex-column" >
					<v-avatar class="" size="100">
						<img class="" src="https://cdn.vuetifyjs.com/images/john.jpg" alt="">
					</v-avatar>
					<p class="white--text subtitle-1 mt-1">
						Daniel Lewicki
					</p>
				</v-row>

				<v-divider class="my-2"></v-divider>

				<v-list-item v-for="item in items" :key="item.title" link router :to="item.path">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-container>
</template>

<script>
	import Register from '@/components/auth/Register'
	import Login from '@/components/auth/Login'

	export default {
		data () {
			return {
				drawer: true,
				items: [
				{ title: 'Tablica', icon: 'mdi-view-dashboard', path: '/dashboard' },
				{ title: 'Moje Przepisy', icon: 'mdi-image', path: '/recipes' },
				{ title: 'About', icon: 'mdi-help-box', path: '/' },
				],
				color: 'teal',
				miniVariant: true,
				background: false,
				
				
			}
		},
		components:{
			Register, Login
		},
		computed:{
			isLogged(){
				return this.$store.getters.getUserData.token != null  ? true : false;
			}
		},
		methods: {
			logout(){
				this.$store.dispatch('logout');
			}
		}
	}
</script>
<style scoped>
	
</style>
