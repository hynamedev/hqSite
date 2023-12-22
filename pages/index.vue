<script setup>
const route = useRoute()

import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";

let posts = ref([]);
let onlinePlayers = ref(1)
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
</script>


<template>
    <div class="container">
      <main class="main">
        <div class="home-banner">
          <img src="/static/images/logos/logo.png" class="logo">
          <h2>
            <b>MineHQ</b> Network
          </h2>
          <h3>WHERE THE <b>BEST</b> PLAYERS PLAY</h3>
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
              <div class="main-top-content" v-if="onlinePlayers === 1">
                There is currently {{ onlinePlayers }} player online
              </div>
              <div class="main-top-content" v-else>
                There are currently {{ onlinePlayers }} players online
              </div>
            </div>

            <div class="main-top-col">
              <div class="main-top-content main-top-button">
                <a href="store" class="btn btn-danger">
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
                  <iframe src="https://discord.com/widget?id=443523471578759221&theme=light" width="350" height="500" allowtransparency="true" frameborder="0" style="width: 100%"></iframe>
                </div>
                <div class="discord-widget-footer">
                  <a href="/discord">
                    DISCORD.GG/MINEHQ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>