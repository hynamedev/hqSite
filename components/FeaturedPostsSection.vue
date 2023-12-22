<script setup>
import Post from "@/components/FeaturedPost.vue";
defineProps({
  posts: {
    type: Object,
    required: true
  }
})
</script>

<template>
      <div class="col-lg-8" >


        <div class="post-holder" v-if="posts.length === 0">
          <div class="post-item">
            <div class="post-header">
              <div class="title">
                <h2>Well... this is awkward</h2>
              </div>
            </div>
            <div class="post-body">
              <p>
                There doesn't appear to be any featured posts (Oh noes!)
              </p>
            </div>
          </div>
        </div>

        <Post v-for="post in posts" :title=post.title :content=post.content :link=post.link :post-date=post.postDate :author=post.author></Post>

      </div>
</template>

<style scoped>
@import "../static/css/style.css";
@import "../static/css/bootstrap.css";
@import "../static/css/font-awesome.css";
@import "../static/css/fonts.css";
@import "../static/css/schedule.css";

</style>
