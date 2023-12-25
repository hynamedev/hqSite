
<script setup>
import $ from 'jquery'


</script>

<template>


  <div class="wrapper">
    <header>
      <Header />
    </header>

    <NuxtPage />

  </div>

  <footer>
    <Footer :cb=true />
  </footer>
</template>

<style>

@import "/static/css/font-awesome.css";
@import "/static/css/fonts.css";
@import "/static/css/schedule.css";
@import "/static/css/style.css";

</style>