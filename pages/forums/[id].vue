<script setup>
import config from "~/siteConfig.js";
import {
  forumStore,
  isPostStore,
  postStore,
  rankInfoStore,
  rankStore,
  topPostsStore,
  userInfoStore
} from "~/store/store.js";
import ForumCategory from "~/components/ForumCategory.vue";
import mongo from '~/mongoConnection.js'

const route = useRoute()

// true = its a post, false = its a forum/category


definePageMeta({
  middleware: [
    async function (to, from, next) {
      if(process.client) return;

      isPostStore().data = undefined;

      for (let i = 0; i < to.params.id.length; i++) {
        let ascii = to.params.id.toString().charCodeAt(i);
        isPostStore().data = !(ascii < 48 || ascii > 57);
      }

      if(isPostStore().data) {
        postStore().data = await mongo.readPost(to.params.id)
        forumStore().data = await mongo.readDocument('hqSite', 'forums', postStore().data.forumId.toLowerCase())


        const baseURL = config.apiHost;
        const headers = config.authHeader;

        const infoResponse = await fetch(baseURL + "/users/" + postStore().data.author.uuid + "/details", {
          method: 'GET',
          headers: headers,
        });

        if (infoResponse.ok) {
          let json = await infoResponse.json();

          userInfoStore().data = json.user;
          rankStore().data = json.grants.pop();
        } else {
          console.error('Error:', infoResponse.status, await infoResponse.text()); // Log the status and response text
        }

        const rankResponse = await fetch(baseURL + "/ranks/" + rankStore().data.rank, {
          method: 'GET',
          headers: headers,
        });

        if (rankResponse.ok) {
          rankInfoStore().data = await rankResponse.json();
          console.log(rankInfoStore().data)
        } else {
          console.error('Error:', rankResponse.status, await rankResponse.text()); // Log the status and response text
        }

      }
      else {
        forumStore().data = await mongo.readDocument('hqSite', 'forums', to.params.id.toLowerCase())
        topPostsStore().data = (await mongo.readTopPosts(to.params.id.toLowerCase())).sort((a, b) => a.postDate - b.postDate).reverse()

      }
    }
  ]
})


</script>



<template>
  <ForumPost :post="postStore().data" :forum="forumStore().data" v-if="isPostStore().data"/>
  <ForumCategory :forum="forumStore().data" :top-posts="topPostsStore().data" v-else/>
</template>