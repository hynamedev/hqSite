<script setup>
import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";

function login(username, password) {

}
</script>


<style scoped>
@import "../static/css/style.css";
@import "../static/css/bootstrap.css";
@import "../static/css/font-awesome.css";
@import "../static/css/fonts.css";
@import "../static/css/schedule.css";

</style>


<template>
    <div class="container">
      <main class="main">
        <div class="login">
          <div class="container">
            <div class="row">
              <div class="col-md-6 offset-md-3">
                <section id="content" class="login-box">
                  <div class="login-holder">
                    <div class="login-header">
                      <div class="bg-stretch" id="stretch-background"></div>
                      <img src="../static/images/logos/logo.png" width="96" height="96" alt="Logo">
                    </div>
                    <form method="post">
                      <h2><i class="fa fa-lock" aria-hidden="true"></i><span>LOGIN</span></h2>
                      <div class="input-group">
                        <input type="text" name="username" autofocus placeholder="username" required id="id_username">
                        <input type="password" name="password" placeholder="password" required id="id_password">
                      </div>
                      <div class="btn-holder">
                        <button type="submit" class="btn btn-primary">Log in</button>
                      </div>
                      <div class="login-links">
                        <a href="register" class="register">register an account</a>
                        <a href="reset">reset your password</a>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>