import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../components/Form.vue';
import View from '../components/View.vue';
import Home from '@/views/Home.vue';
import Recipe from '@/views/recipes/Recipe.vue';
import RecipeForm from '@/views/recipes/RecipeForm.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/form', component: Form},
  { path: '/view', component: View},
  { path: '/', component: Home},
  { path: '/recipe/:id', component: Recipe},
  { path: '/recipeForm/', component: RecipeForm},
  { path: '/recipeForm/:id', component: RecipeForm},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
