<template>
  <div id="app">
    <router-view/>
    <Home/>
  </div>
</template>

<script>
import Home from "./views/home.vue";
export default {
  name: 'App',
  components:{
    Home
  }
}
</script>

<style>

</style>
