<script setup>
import Posts from "~/components/FeaturedPostsSection.vue";
import {ref} from "vue";
import config from "~/siteConfig.js";
import {isPostStore, playerCountStore} from "~/store/store.js";
import ForumCategory from "~/components/ForumCategory.vue";
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
    }
  ]
})


</script>



<template>
  <ForumPost :id="route.params.id" v-if="isPostStore().data"/>
  <ForumCategory :id="route.params.id" v-else/>
</template>