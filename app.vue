<template>


  <div class="wrapper">
    <header>
      <Header />
    </header>

    <NuxtPage />

    <footer>
      <Footer :cb=true />
    </footer>
  </div>
</template>

<style>

@import "static/css/bootstrap.css";
@import "static/css/font-awesome.css";
@import "static/css/fonts.css";
@import "static/css/schedule.css";
@import "static/css/style.css";

* {
  margin: 0;
  padding: 0;
}

</style>
<script setup>
import jquery from 'jquery'
// import bootstrap from 'bootstrap'
// import bootstrapvue from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

</script>