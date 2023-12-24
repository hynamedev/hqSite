<script setup>
import config from "~/siteConfig.js";
import {staffRankDataStore, staffRankNameStore, staffRanksStore} from "~/store/store.js";

const route = useRoute()

useSeoMeta({
  title: 'Staff - ' + config.serverName,
})

definePageMeta({
  middleware: [
    async function (to, from, next) {
      if(process.client) return;
      const baseURL = config.apiHost; // replace with your base URL
      const headers = config.authHeader;

      const response = await fetch(baseURL + "/staff", {
        method: 'GET',
        headers: headers
      });

      if (response.ok) {
        const json = await response.json();
        staffRankDataStore().data = json;
        staffRankNameStore().data = Object.keys(json);

        for(let i = 0; i < staffRankNameStore().data.length; i++) {
          const rankResponse = await fetch(baseURL + "/ranks/" + staffRankNameStore().data[i], {
            method: 'GET',
            headers: headers
          });

          if(rankResponse.ok) {
            const rank = await rankResponse.json();
            staffRanksStore().data.push(rank)
          } else {
            console.error('Error:', rankResponse.status, await rankResponse.text()); // Log the status and response text
          }
        }
      } else {
        console.error('Error:', response.status, await response.text()); // Log the status and response text
      }
    }
  ]
})



</script>




<template>
  <div class="container">
    <main class="main">
      <div class="main-top">
      </div>
      <div class="staff-section">
        <section id="content">
          <div class="block" v-for="rank in staffRanksStore().data">
            <h2 :style="'background-color: #' + rank.websiteColor">
              {{ rank.displayName }}
            </h2>
            <ul :class="'staff-item' + (rank.id === 'owner' ? '' : ' item-small')">
              <li v-for="user in staffRankDataStore().data[rank.id]">
                <div class="user-box">
                  <a :href="'/u/' + user.lastUsername" class="link-box">
                    <div class="img-box" style="overflow: hidden">
                      <img :src="'https://visage.surgeplay.com/bust/124/' + user.id + '.png'" :alt="user.lastUsername" height="124" width="124" style="object-fit: contain;" class="avatar-half">
                    </div>
                    <span class="name"> {{ user.lastUsername }}</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>