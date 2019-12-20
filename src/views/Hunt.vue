<template>
    <div class="container">
        <h2>A toi de trouver le trésor !</h2>
        <p>Dirige toi vers le {{ direction.vertical }} - {{ direction.horizontale }}</p>
        <div class="progress mt-5" style="height: 40px">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" v-bind:style="{width: progression + '%'}" aria-valuemin="0" aria-valuemax="100">{{ distanceNow }} m</div>
        </div>
            <button class="btn btn-primary my-5" @click="manualMode">Mode manuel</button>

            <div v-if="manual" class="card container">

                <p>Sud  <i class="fas fa-arrows-alt-h"></i>  Nord</p>
                <input name="latitude" v-model="latManual" type="range" step="0.00001" min="-0.001" max="0.001"/>
                |
                <br>
                <p>Ouest  <i class="fas fa-arrows-alt-h">  </i>Est</p>
                <input name="longitude" v-model="longManual" type="range" step="0.00001" min="-0.001" max="0.001"/>
                |
                <br>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            data: 0,
            distanceStart: 0,
            distanceNow: 0,
            progression: 0,
            latPosition: this.$route.params.lat,
            longPosition: this.$route.params.long,
            latManual: 0,
            longManual: 0,
            category: this.$route.params.name,
            latTreasure: 0,
            longTreasure: 0,
            riddle: '',
            treasure: '',
            name: '',
            manual: false,
            load: false,
            direction: {
                "vertical":"",
                "horizontale":""
            }
        }
    },

    mounted() {
        this.fetchStart()
            //lance une nouvelle requete chaque seconde qui rafraichi la distance entre le telephone et le magasin
            this.$nextTick(function () {
                window.setInterval(() => {
                    if (this.load) {
                        this.getPosition();
                        this.distanceNow = this.distanceCalcul(this.latPosition, this.longPosition, this.latTreasure, this.longTreasure);
                        this.progression = (1 - (this.distanceNow / this.distanceStart)) * 100;
                        if (this.latTreasure > this.latPosition) {
                            this.direction.vertical = "Nord"
                        } else {
                            this.direction.vertical = "Sud"
                        }
                        if (this.longTreasure > this.longPosition) {
                            this.direction.horizontale = "Est"
                        } else {
                            this.direction.horizontale = "Ouest"
                        }
                        if (this.distanceNow <= 10) {
                            this.$alert('Felicitation ! Tu as trouvé ' + this.treasureName + ' tu as gagné: ' + this.treasure);
                        }
                    }
            },1000);
        })
    },

    methods: {
        fetchStart() {
            axios.post('http://49df6375.ngrok.io/api', {
                latitude: this.latPosition.toString(),
                longitude: this.longPosition.toString(),
                category: this.category
             })
             .then(response => {
                this.data = response.data;
                this.distanceStart = response.data.distance + 100;
                this.distanceNow = response.data.distance;
                this.$alert(response.data.enigme);
                this.latTreasure = response.data.latitude;
                this.longTreasure = response.data.longitude;
                this.progression = (1 - (this.distanceNow / this.distanceStart)) * 100;
                this.treasure = response.data.tresor;
                this.treasureName = response.data.title;
                this.load = true;

            }).
            catch(error => this.distance = error)
        },

        getPosition() {
            if (!this.manual) {
                navigator.geolocation.getCurrentPosition( position => {
                    this.latPosition = position.coords.latitude;
                    this.longPosition = position.coords.longitude;
                }) 
            } else {
                this.latPosition = parseFloat(this.latPosition) + parseFloat(this.latManual);
                this.longPosition = parseFloat(this.longPosition) + parseFloat(this.longManual);
            }
        },

        manualMode() {
            if (this.manual) {
                this.manual = false;
            } else {
                this.manual = true;
            }
            
        },

        distanceCalcul(lat1, long1, lat2, long2) {

            const lat = lat1 * (Math.PI/180);
            const long = long1 * (Math.PI/180);
            const latGoal = lat2 * (Math.PI/180);
            const longGoal = long2 * (Math.PI/180);
            
            const radius = 6373.0;
            const dlon = longGoal - long;
            const dlat = latGoal -lat;

            const calculA = Math.sin(dlat / 2)**2 + Math.cos(lat)*Math.cos(latGoal)*Math.sin(dlon/2)**2;
            const calculC = 2 * Math.atan2(Math.sqrt(calculA), Math.sqrt(1 - calculA));

            return Math.round(radius * calculC * 1000);
        },
    }

}
</script>

<style>
.progress {
    font-size: 1.5em;
}
</style>