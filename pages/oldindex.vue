<script setup>
import config from "~/siteConfig.js";


import Posts from "@/components/FeaturedPostsSection.vue";
import { ref, onMounted } from "vue";
import {
  bannedStore,
  playerCountStore,
  punishmentStore,
  rankInfoStore,
  rankStore,
  userInfoStore,
  usernameStore,
  uuidStore
} from "~/store/store.js";

const route = useRoute()
let posts = ref([]);
function getPosts() {
  posts = ref([{title: "a", content: "a", link: "a", postDate: 0, author: "tt"},
    {
      title: "b",
      content: "b",
      link: "ac",
      postDate: 0,
      author: "tt"
    }]);
}

useSeoMeta({
  title: config.serverName,
})

definePageMeta({
  middleware: [
    async function (to, from, next) {
      if(process.client) return;
      const baseURL = config.apiHost; // replace with your base URL
      const headers = config.authHeader;

      const response = await fetch(baseURL + "/serverGroups/default/playerCount", {
        method: 'GET',
        headers: headers
      });

      if (response.ok) {
        const json = await response.json();

        playerCountStore().data = json.total
      } else {
        console.error('Error:', response.status, await response.text()); // Log the status and response text
      }

    }
  ]
})

onMounted(() => {
  let script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  script.setAttribute('charset', 'utf-8');
  script.setAttribute('async', '');
  document.head.appendChild(script);
});
</script>


<template>
    <div class="container">
      <main class="main">
        <div class="home-banner">
          <img src="/static/images/logos/logo.png" class="logo">
          <h2 v-html="config.serverNameHtml"></h2>
          <h3 v-html="config.slogan"></h3>
        </div>
        <div class="main-top">
          <div class="row">
            <div class="main-top-col">
              <div class="main-top-content content-center">
                <a class="link">
                  <span>
                    <i class="fa fa-globe" aria-hidden="true"></i>Connect to MineHQ.com
                  </span>
                </a>
              </div>
            </div>
            <div class="main-top-col main-top-big">
              <div class="main-top-content" v-if="playerCountStore().data === 1">
                There is currently {{ playerCountStore().data }} player online
              </div>
              <div class="main-top-content" v-else>
                There are currently {{ playerCountStore().data }} players online
              </div>
            </div>

            <div class="main-top-col">
              <div class="main-top-content main-top-button">
                <a href="/store" class="btn btn-danger">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Visit the MineHQ Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="news">
          <div class="row">

            {{ getPosts() }}

            <Posts :posts=posts></Posts>

            <div class="col-lg-4">

              <div class="discord-widget">

                <div class="discord-widget-header">
                  <a class="logo" href="https://discord.com?utm_source=Discord%20Widget&amp;utm_medium=Logo" target="_blank"></a>
                </div>
                <div class="inner-discord" style="height: 456px;overflow: hidden;">
                  <iframe :src="config.discordWidget + '&theme=light'" width="350" height="500" allowtransparency="true" frameborder="0" style="width: 100%"></iframe>
                </div>
                <div class="discord-widget-footer">
                  <a :href="config.discordInvite">
                    {{ config.displayedDiscordInvite }}
                  </a>
                </div>
              </div>

              <div class="twitter-widget">
                <div class="twitter-widget-header">
                  <i class="fa fa-3x fa-twitter mr-2"></i>
                  <span>
                    <b>Latest Tweets</b>
                   <br>
                   From @{{ config.twitter }}
                </span>
                </div>
                <a class="twitter-timeline" data-width="100%" data-height="500" data-chrome="noheader nofooter noborders transparent" data-dnt="true" :href="'https://twitter.com/' + config.twitter + '?ref_src=twsrc%5Etfw'"></a>
                <div class="twitter-widget-footer">
                  <a :href="'https://twitter.com/@' + config.twitter">
                    View on Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>