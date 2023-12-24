
<script setup>
import $ from 'jquery'


</script>

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

@import "public/static/css/font-awesome.css";
@import "public/static/css/fonts.css";
@import "public/static/css/schedule.css";

</style>