<script setup>
const route = useRoute()

import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";
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
        <div class="container">
          <div class="block-sections">
            <div class="row justify-content-md-center">
              <div class="col-lg-5">
                <div class="holder-section-box">
                  <div class="img-title">
                    <div class="bg-stretch" id="stretch-background"></div>
                    <img src="../static/images/logos/logo.png" width="96" height="96" alt="Logo">
                  </div>
                  <div class="holder-section-text">
                    <h2>Register In-Game</h2>
                    <p><b>Step 1:</b> Join the server and use the command: /register &lt;youremail&gt;
                    </p>
                    <span class="register-link">/register someone@example.com</span>
                    <p><b>Step 2:</b> Find the email from us in your inbox and click the button to continue
                      the registration process!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>