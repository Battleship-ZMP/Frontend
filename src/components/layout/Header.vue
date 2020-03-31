<template>
	<v-container>

		<v-app-bar class="grey lighten-4" flat app>
			<v-app-bar-nav-icon class="grey-text text--lighten-4" @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="grey lighten-4 text-uppercase grey--text">
				<span class="font-weight-light">Todo</span>
				<span>Ninja</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn text v-on="on" color="grey">
						<v-icon left>mdi-chevron-down</v-icon> <!-- or use mdi-chevron-down -->
						<span>Menu</span>
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="link in links" :key="link.text" :to="link.route">
						<v-list-item-title>{{ link.text }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn text color=" lighten-4" class=" text--darken-1 font-weight-normal" style="color: #9e9e9e;" >
				<span>Sign Out</span>
				<v-icon right>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer
		v-model="drawer"
		:color="color"
		:right="false"
		app
		dark
		>
		<v-list
		dense
		nav
		class="py-0"
		>
		<v-list-item two-line :class="miniVariant && 'px-0'">
			<v-row class="justify-center flex-column align-center" >
				<div>
					<v-list-item-avatar size="100">
						<img src="https://randomuser.me/api/portraits/men/81.jpg">
					</v-list-item-avatar>

					<v-list-item-content>
						<p class="white--text subtitle-1 mt-1">
							The Net Ninja
						</p>
					</v-list-item-content>
				</div>
			</v-row>
		</v-list-item>

		<v-divider></v-divider>

		<v-list-item
		v-for="item in items"
		:key="item.title"
		link router to="item.path"
		>
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
	export default {
		data () {
			return {
				drawer: true,
				items: [
				{ title: 'Tablica', icon: 'mdi-view-dashboard' },
				{ title: 'Moje Przepisy', icon: 'mdi-image' },
				{ title: 'About', icon: 'mdi-help-box' },
				],
				color: 'teal',
				miniVariant: true,
				background: false,
			}
		}
	}
</script>
<style scoped>
	
</style>
