<template>
  <div>
      <h1>Quel trésor veux-tu poursuivre ?</h1>
      <p>Tu es à {{ latPosition}}, {{ longPosition }}</p>
        <div class="card" v-for="category in json" :key="category">
            <router-link :to="{ name: 'hunt', params: { name: category.name }}">
            <div class="card-header">
            {{ category.name }}
            </div>
            </router-link>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'search',
    data() {
        return {
            latPosition: 'future latitude',
            longPosition: 'future longitude',
            json: 'coucou',
        }
    },

    mounted() {
        this.fetchData();
        navigator.geolocation.getCurrentPosition( position => {
            this.latPosition = position.coords.latitude;
            this.longPosition = position.coords.longitude;
        })
    },

    methods: {
        fetchData(){
            axios.get('/temporary/categories.json').then(response => {
                this.json = response.data;
            })
        }
    }
}
</script>

<style>

</style>