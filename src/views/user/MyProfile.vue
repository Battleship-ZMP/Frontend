<template>
	<v-container class="">
		<v-row class="align-center flex-column">
			<v-avatar class="" :size="200">
				<img class="" :src="currentUser.photo" alt="">
			</v-avatar>
			<h2>{{currentUser.userName}}</h2>
			<p>{{currentUser.bio}}</p>
		</v-row>
		<Home />
		
	</v-container>
</template>

<script>
	import Home from '@/views/Home'

	export default{
		computed:{
			currentUser(){
				return this.$store.getters.getUserData;
			}
		},
		components:{
			Home
		}
	}
</script>