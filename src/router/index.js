import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../components/Form.vue';
import View from '../components/View.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import RemindPassword from '../components/auth/RemindPassword.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/form', component: Form},
  { path: '/view', component: View},
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/remind_password', component: RemindPassword},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
