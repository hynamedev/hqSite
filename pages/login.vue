<script setup>
import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";
import cookies from 'vue-cookies'
import authConfig from "~/siteConfig.js";
import config from "~/siteConfig.js";

const userId = ref('')
const password = ref('')



const login = async () => {
  try {
    // Call the loginWith method of the $auth object
    await this.$auth.loginWith('local', {
      data: {
        email: userId.value,
        password: password.value,
        userIp: 'userIp' // replace 'userIp' with the actual user IP
      }
    })

    // If login is successful, the user will be redirected to the home page
    this.$router.push('/')
  } catch (error) {
    // Handle login failure
    console.error('Login failed:', error)
  }
}



</script>



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
                      <img src="/static/images/logos/logo.png" width="96" height="96" alt="Logo">
                    </div>
                    <form @submit.prevent="login">
                      <h2><i class="fa fa-lock" aria-hidden="true"></i><span>LOGIN</span></h2>
                      <div class="input-group">
                        <input v-model="userId" type="text" name="username" autofocus placeholder="username" required id="id_username">
                        <input v-model="password" type="password" name="password" placeholder="password" required id="id_password">
                      </div>
                      <div class="btn-holder">
                        <button type="submit" class="btn btn-primary">Log in</button>
                      </div>
                      <div class="login-links">
                        <a href="/register" class="register">register an account</a>
                        <a href="/reset">reset your password</a>
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