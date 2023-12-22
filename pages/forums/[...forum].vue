<script setup>
import Posts from "~/components/FeaturedPostsSection.vue";
import {ref} from "vue";
const route = useRoute()
</script>


<style scoped>
@import "../../static/css/style.css";
@import "../../static/css/bootstrap.css";
@import "../../static/css/font-awesome.css";
@import "../../static/css/fonts.css";
@import "../../static/css/schedule.css";
</style>


<template>
  <h1>{{ route.params.forum }}</h1>
</template>