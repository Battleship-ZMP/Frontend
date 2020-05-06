<template>
	<v-container>

		<v-app-bar color="teal" class="" flat app>
			<v-app-bar-nav-icon class="white--text " @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title style="cursor: pointer!important;" @click="$router.push('/')" class="px-0 white--text">
				<span class="font-weight-light">Cool</span>
				<span>Recipes</span>
			</v-toolbar-title>
			<v-spacer class=""></v-spacer>
			<Login v-if="!isLogged" />
			<Register v-if="!isLogged" />
			<router-link to="/recipeform" style="text-decoration: none">
				<v-btn style="font-size: 0.7rem" v-if="isLogged" text class="white--text font-weight-normal px-0">
					<v-icon >mdi-plus</v-icon>
					<!-- <span>Dodaj przepis!</span> -->
				</v-btn>
			</router-link>
			<v-btn style="font-size: 0.7rem" v-if="isLogged" @click="logout" text class="white--text font-weight-normal px-0">
				<!-- <span>Wyloguj</span> -->
				<v-icon >mdi-exit-to-app</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" color="teal" left app dark>
			<v-list dense nav class="py-0">
				<v-row class="align-center justify-center mt-5 mb-3 flex-column" >
					<v-avatar v-if="this.user.token" class="" size="100">
						<img class="" :src="user.photo" alt="">
					</v-avatar>
					<p class="white--text subtitle-1 mt-1">
						{{this.userName}}
					</p>
					<Login v-if="loginButton"/>
					<AutoComplete />
				</v-row>

				<v-divider class="my-2"></v-divider>

				<v-list-item v-for="page in pages" :key="page.title" link router :to="page.path" v-if="isLogged  || !isLogged && page.login == 'visible'">
					<v-list-item-icon>
						<v-icon>{{ page.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ page.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-container>
</template>

<script>
	import Register from '@/components/auth/Register'
	import Login from '@/components/auth/Login'
	import AutoComplete from '@/components/layout/AutoComplete'

	export default {
		data () {
			return {
				drawer: true,
				pages: [
				{ title: 'Katalog', icon: 'mdi-view-dashboard', path: '/', login: 'visible' },
				{ title: 'Mój Profil', icon: 'mdi-account', path: '/myprofile', login: 'hidden' },
				{ title: 'Moja książka kucharska', icon: 'mdi-book-open-page-variant', path: '/cookbook', login: 'hidden' },
				],
				color: 'teal',
				miniVariant: true,
				background: false,
				loginButton: true
			}
		},
		components:{
			Register, Login, AutoComplete
		},
		computed:{
			isLogged(){
				return this.$store.getters.getUserData.token != null  ? true : false;
			},
			userName(){
				if(this.$store.getters.getUserData.userName == null){
					this.loginButton = true;
				}else{
					this.loginButton = false;
					return this.$store.getters.getUserData.userName;
				}
			},
			user(){
				return this.$store.getters.getUserData;
			}
		},
		methods: {
			logout(){
				this.$store.dispatch('logout');
				if(this.$route.path != '/'){
					this.$router.push('/');
				}
			}
		}
	}
</script>
<style scoped>
	
</style>
