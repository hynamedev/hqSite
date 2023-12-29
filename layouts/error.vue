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

@import "/static/css/font-awesome.css";
@import "/static/css/fonts.css";
@import "/static/css/schedule.css";
@import "/static/css/style.css";

* {
  margin: 0;
  padding: 0;
}

</style>
<script setup>
import jquery from 'jquery'
</script>