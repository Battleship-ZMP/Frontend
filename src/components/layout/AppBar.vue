<template>
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
			</v-btn>
		</router-link>
		<v-btn style="font-size: 0.7rem" v-if="isLogged" @click="logout" text class="white--text font-weight-normal px-0">
			<v-icon >mdi-exit-to-app</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
	import Register from '@/components/auth/Register'
	import Login from '@/components/auth/Login'

	export default{
		props:['isLogged', 'drawer'],
		components:{
			Register, Login 
		},
		methods: {
			logout(){
				this.$store.dispatch('logout');
			}
		}
	}
</script>