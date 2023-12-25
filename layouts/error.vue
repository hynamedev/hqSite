<template>


  <div class="wrapper">
    <header>
      <Header />
    </header>

    <div class="container">
      <div class="alert alert-danger">
                <span style="font-size: 24px">
                    404: Page Not Found
                </span>
      </div>
    </div>

    <footer>
      <Footer :cb=true />
    </footer>
  </div>
</template>

<style>

* {
  margin: 0;
  padding: 0;
}

</style>
<script setup>
import jquery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

</script>