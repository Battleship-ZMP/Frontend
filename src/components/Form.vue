<template>
  <div>
    <div class="form-group">
      <label for="name">Imie</label>
      <input type="text" name="name" v-model="name">
      <label for="surname">Nazwisko</label>
      <input type="text" name="surname" v-model="surname">
      <label for="age">Wiek</label>
      <input type="text" name="age" v-model="age">
    </div>
    <button class="btn btn-primary" @click="submitForm">Wyślij</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      name: '',
      surname: '',
      age: '',
    }
  },
  methods: {
  	...mapActions({
  		setData: 'setUserData',
      pushUserData: 'pushData'
  	}),
    submitForm() {
      var data = {
        name: this.name,
        surname: this.surname,
        age: this.age,
      };
      this.setData(data);
      this.pushUserData();
      this.name = '';
      this.surname = '';
      this.age = '';
    }
  }

}
</script>
