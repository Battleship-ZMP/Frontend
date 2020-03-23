<template>
  <div>
    <div class="card" v-for="(userData,index) in data">
      <div class="card-title">Dane</div>
      <div class="card-body">
        <label for="">Imię:</label>
        <p>{{userData.name}}</p>
        <label for="">Nazwisko:</label>
        <p>{{userData.surname}}</p>
        <label for="">Wiek:</label>
        <p>{{userData.age}}</p>
		<button class="btn btn-danger" @click="deleteData(index)">Delete</button>
        
      </div>
    </div>
    <div class="alert alert-danger" v-if="show">
      Nie znaleziono danych :c
      
    </div>
  </div>
</template>

<script>
	import {mapActions} from 'vuex';
	import {mapGetters} from 'vuex';
	export default{
		props: ['searchValue'],
		data(){
			return{
				show: false,
			}
		},
		methods:{
			...mapActions({
				getMyData: 'getData',
				deleteData: 'deleteUserData'
			}),
			getData(){
				this.getMyData();
			},
			deleteData(index){
				// this.deleteData(index);
				// console.log(index);
				if(confirm('Are you sure?')){
					this.data.splice(index,1);		
				}
			},
			setShow(counter, card_length){
				if(counter == card_length){
				  	this.show = true;
				  }else{
				  	this.show = false;
				  }
			}
		},
		computed:{
			...mapGetters({
				data: 'getUserData'
			})
		},
		watch:{
			searchValue(){
				var filter, card, card_title, card_body, i, txtValue, p, counter=0;
				  filter = this.searchValue.toUpperCase();
				  card = document.getElementsByClassName("card");
				  card_title = document.getElementsByClassName('card-title');
				  card_body = document.getElementsByClassName('card-body');

				  for (i = 0; i < card.length; i++) {
			  		p = card_body[i].getElementsByTagName('p');
				  	var card_title_text = card_title[i].innerHTML;

				  	for(var j=0 ; j< p.length ; j++){
				  		var p_text =  p[j].innerHTML;
					    if (p_text.toUpperCase().indexOf(filter) > -1) {
					      card[i].style.display = "";
					      break;
					    } else {
					      card[i].style.display = "none";
					    }

				  	}
				  }
				  for(i=0 ; i< card.length ; i++){
				  	if(card[i].style.display == 'none'){
				  		counter++;
				  	}
				  }
				  this.setShow(counter, card.length);
				  counter = 0;
			}
		}
	}
</script>
