<script setup>
import Posts from "~/components/FeaturedPostsSection.vue";
import {ref} from "vue";
const route = useRoute()
</script>



<template>
  <h1>{{ route.params.forum }}</h1>
</template>