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

    const headers = config.authHeader;
    const response = await fetch(authConfig.apiHost + `/users/${userId.value}/verifyPassword?password=${password.value}`, {
      method: 'GET',
      headers: headers
    });

    const data = await response.json()

    console.log(data)

    if (data.authorized) {
      // Store session information in a cookie or local storage
      cookies.set('MHQ-UserSession', data.session)
      cookies.set('MHQ-UserIp', data.uuid)

      // Redirect to home page or dashboard
      router.push('/')
    } else {
      // Handle login failure
      console.log('Login failed')
    }
  } catch (error) {
    // Handle request error
    console.log(error)
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
                      <img src="../static/images/logos/logo.png" width="96" height="96" alt="Logo">
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