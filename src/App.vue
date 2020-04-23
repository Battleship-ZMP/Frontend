<template>
  <v-app>
    <app-header class=""></app-header>

    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import {fb, db} from '@/main'
  import Header from './components/layout/Header.vue';

  export default {
    name: 'App',

    components: {
      appHeader: Header,
    },
    created(){
      this.$store.dispatch('autoLogin');
      this.$store.dispatch('fetchUser');
      this.$store.dispatch('loadRecipes');
      
    },

    data: () => ({
    //
  }),
  };
</script>
