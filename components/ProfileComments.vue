<script setup>
import config from '~/siteConfig.js';

const props = defineProps({
  usernameParameter: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="block" id="comments" :data-url="'/u/' + props.usernameParameter + '/comments'">
    <section class="comments-block">
      <h2>
        <i class="fa fa-comments" aria-hidden="true"></i>
        Comments
      </h2>
      <div class="alert alert-danger">
        <i class="fa fa-lock" aria-hidden="true"></i>
        You must be logged in to comment on {{ props.usernameParameter }}'s profile.
      </div>
    </section>
  </div>
</template>