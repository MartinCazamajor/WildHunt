<template>
    <div class="container">
        <p> {{ latPosition }}, {{ longPosition }}, {{ manual }}, {{ id }} </p>
        <div class="progress mt-5">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" v-bind:style="{width: progression + '%'}" aria-valuemin="0" aria-valuemax="100">{{ distanceStart - distanceNow }} m</div>
        </div>
            <button class="btn btn-primary my-5" @click="manualMode">Mode manuel</button>
        <div>
            <input type="range" v-model.number="amount">
            <p>{{ amount }}%</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {

    data() {
        return {
            id: 0,
            distanceStart: 0,
            distanceNow: 0,
            amount: 0,
            progression: 0,
            latPosition: this.$route.params.lat,
            longPosition: this.$route.params.long,
            riddle: 'pas bon',
            treasure: '',
            name: '',
            manual: false,
        }
    },

    created() {
        //lance la premiere requete qui donne la position du magasin ciblé
        this.fetchStart()

        //lance une nouvelle requete chaque seconde qui rafraichi la distance entre le telephone et le magasin

        this.$nextTick(function () {
            window.setInterval(() => {
                this.fetchNow();
            },1000);
        })
    },

    mounted() {
        this.$alert(this.riddle)
    },

    methods: {
        fetchStart() {
            this.riddle = 'blablaba';
            axios.post('http://f3eee2a6.ngrok.io/api', {
                latitude: this.latPosition,
                longitude: this.longPosition,
                category: this.$route.params.name
             })
             .then(response => {
                this.id = response.data;
                //this.distanceStart = response.data.distance + 100;
                //this.distanceNow = response.data.distance;
                //this.riddle = response.data.riddle;

            }).
            catch(error => this.distance = error)
        },

        fetchNow() {
            if (!this.manual) {
            this.getPosition();
            this.amount++;
            axios.post('http://f3eee2a6.ngrok.io/api', {
                latitude: this.latPosition,
                longitude: this.longPosition,
                id: this.id
            })
            .then(response => {
                this.id = response.data;
                //this.distanceNow = response.data.distance;
                //this.treasure = response.data.treasure;
                //this.name = response.data.name;

            }).
            catch(error => this.distance = error)
            } else {
                this.progression = this.amount;
            }
        },

        getPosition() {
            navigator.geolocation.getCurrentPosition( position => {
            this.latPosition = position.coords.latitude;
            this.longPosition = position.coords.longitude;
            })
        },

        manualMode() {
            if (this.manual) {
                this.manual = false;
            } else {
                this.manual = true;
            }
            
        }
    }

}
</script>

<style>
</style>