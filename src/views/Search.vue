<template>
  <div class="container">
      <h1>Quel trésor veux-tu poursuivre ?</h1>
        <div class="card my-4" v-for="category in categories" :key="category">
            <router-link :to="{ name: 'hunt', params: { name: category.name, lat: latPosition, long: longPosition }}">
            <div class="card-header d-flex justify-content-around align-items-center">
                <i v-bind:class="category.logo "></i>
                <p>{{ category.desc }}</p>
                <i v-bind:class="category.logo "></i>
            </div>
            </router-link>
        </div>
  </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            categories: [
                {name: 'pharmacy',
                desc: 'La panacée',
                logo: 'fas fa-heartbeat'},
                {name: 'beauty',
                desc: 'La beauté éternelle',
                logo: 'fas fa-spa'},
                {name: 'restaurant',
                desc: 'La corne d\'abondance',
                logo: 'fas fa-pizza-slice'},
                {name: 'shopping',
                desc: 'La toison d\'or',
                logo: 'fas fa-tshirt'}
            ],
            latPosition: null,
            longPosition: null
        }
    },

    mounted() {
        this.getPosition()
    },

    methods: {
        getPosition() {
                navigator.geolocation.getCurrentPosition( position => {
                this.latPosition = position.coords.latitude;
                this.longPosition = position.coords.longitude;
            })
        }
    }
}
</script>

<style>
    .card {
        font-size: 2em;
    }

</style>