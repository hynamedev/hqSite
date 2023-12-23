<script setup>
import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";

const route = useRoute()


const baseURL = 'http://localhost:8080'; // replace with your base URL
const headers = {'MHQ-Authorization': 'website'};


let rankNames = null;

let rankData = [];
let ranks = [];

const response = await fetch(baseURL + "/staff", {
  method: 'GET',
  headers: headers
});


if (response.ok) {
  const json = await response.json();
  rankData = json;
  rankNames = Object.keys(json)

  for(let i = 0; i < rankNames.length; i++) {
      const rankResponse = await fetch(baseURL + "/ranks/" + rankNames[i], {
        method: 'GET',
        headers: headers
      });

      if(rankResponse.ok) {
        const rank = await rankResponse.json();
        ranks.push(rank)
      } else {
        console.error('Error:', rankResponse.status, await rankResponse.text()); // Log the status and response text
      }

  }




} else {
  console.error('Error:', response.status, await response.text()); // Log the status and response text
}


</script>




<template>
  <div class="container">
    <main class="main">
      <div class="main-top">
      </div>
      <div class="staff-section">
        <section id="content">
          <div class="block" v-for="rank in ranks">
            <h2 :style="'background-color: #' + rank.websiteColor">
              {{ rank.displayName }}
            </h2>
            <ul class="staff-item">
              <li v-for="user in rankData[rank.id]">
                <div class="user-box">
                  <a :href="'/u/' + user.lastUsername" class="link-box">
                    <img :src="'https://visage.surgeplay.com/full/400/' + user.id + '.png'" :alt="user.lastUsername" height="124" width="55" style="transform: scale(1.2); object-fit: contain;" class="avatar-half">
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