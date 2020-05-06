<template>
	<v-autocomplete v-model="model" :items="items" :search-input.sync="search" clearable hide-details  item-text="name" label="Wyszukaj przepis..." class="pa-4" color="white">
		<template v-slot:no-data>
			<v-list-item>
				<v-list-item-title>
					Znajdź swój
					<strong>przepis</strong>
					dla siebie!
				</v-list-item-title>
			</v-list-item>
		</template>
		<!-- <template v-slot:selection="{ attr, on, item, selected }">
			<v-chip v-bind="attr" :input-value="selected" color="blue-grey" class="white--text" v-on="on">
				<span v-text="item.name"></span>
			</v-chip>
		</template> -->
		<template v-slot:item="{ item }">
			<div @click="goTo(item.id)" tag="router-link" :to="'/recipe/'+item.id" class="d-flex" style="width:100%">
				<v-list-item-avatar color="indigo" class="headline font-weight-light white--text">
					<img :src="item.photo" alt="">
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.name"></v-list-item-title>
				</v-list-item-content>
			</div>
		</template>
	</v-autocomplete>
</template>

<script>
	export default {
		data(){
			return{
				model: null,
				items: [],
				search: null,
			}
			
		},

		watch: {
			search (val) {
				if (this.items.length > 0) {
					return;
				}
				this.items = this.recipes;
			},
		},
		computed:{
			recipes(){
				return this.$store.getters.getRecipes;
			}
		},
		beforeRouteLeave(to,from,next){
			this.model = '';
			next();
		},
		methods:{
			goTo(id){
				this.$router.push('/recipe/'+id);
			}
		}
	}
</script>