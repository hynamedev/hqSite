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

@import "static/css/style.css";
@import "static/css/bootstrap.css";
@import "static/css/font-awesome.css";
@import "static/css/fonts.css";
@import "static/css/schedule.css";

* {
  margin: 0;
  padding: 0;
}

</style>
<script setup lang="ts">
</script>