<template>
  <div class="home">
    <h1>Bienvenue Wild Hunter !</h1>
    <p>Lance toi dans une chasse au trésor sans plus attendre !</p>
    <router-link to="/search"><i class="far fa-compass"></i></router-link>
  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>

<style scoped>
  i {
    font-size: 15em;
    color: black;
    -webkit-transition: -webkit-transform .8s ease-in-out;
    transition: transform .8s ease-in-out;
  }
  i:hover {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
</style>
