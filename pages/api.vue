<script setup>
import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";
import cookies from 'vue-cookies'
import authConfig from "~/siteConfig.js";
import config from "~/siteConfig.js";



</script>



<template>
  <div class="container">
    <main class="main">
      <div class="profile-header shiny-border">
        <div>Backend API Statistics</div>
      </div>

          <div class="box">
            <div id="user-info" class="user-box">

              <strong class="name">API Statistics</strong>
              <strong>Last Request</strong>&nbsp;- ${lastRequest}
              <br>
              <strong>Last Error</strong>&nbsp;- ${lastError}
              <br>
              <strong>Last Latency</strong>&nbsp;- ${lastLatency}ms
              <br>
              <strong>Average Latency</strong>&nbsp;- ${avgLatency}ms
            </div>
            <div class="premium-box">
              <span class="btn btn-info" style="border-color: #00DE00; background-color: #00DE00; pointer-events:none; cursor: default;">Online</span>
            </div>
          </div>
    </main>
  </div>
</template>