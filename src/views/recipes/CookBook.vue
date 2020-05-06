<template>
	<v-tabs
	:centered="true" color="teal" :grow="true"   class="ma-4">
	<v-tabs-slider></v-tabs-slider>

	<v-tab href="#tab-0">
		{{tabs[0]}}
	</v-tab>

	<v-tab href="#tab-1">
		{{tabs[1]}}
	</v-tab>

	<v-tab-item value="tab-0" >

		<v-card flat tile>
			<v-card-text>
				<AutoComplete :color="'teal'" :list="myRecipes"/>
				<Home :givenRecipes="myRecipes" />
			</v-card-text>
		</v-card>
	</v-tab-item>
	<v-tab-item value="tab-1" >

		<v-card flat tile>
			<v-card-text>
				<AutoComplete :list="savedRecipes"/>
				<Home :givenRecipes="savedRecipes"/>
			</v-card-text>
		</v-card>
	</v-tab-item>
</v-tabs>

</template>

<script>
	import Home from '@/views/Home'
	import AutoComplete from '@/components/layout/AutoComplete'

	export default{
		data(){
			return{
				tabs: [
				'Moje przepisy' ,
				'Zapisane przepisy'
				],
			}
		},
		components:{
			Home, AutoComplete
		},
		computed:{
			myRecipes(){
				return this.$store.getters.getMyRecipes;
			},
			savedRecipes(){
				return this.$store.getters.getSavedRecipes;
			}
		}
	}
</script>