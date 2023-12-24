<script setup>
import config from '~/siteConfig.js';
import {usernameStore, uuidStore} from '~/store/store.js';

const props = defineProps({
  usernameParameter: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="profile-header shiny-border">
    <div>
      <img :src="'https://minotar.net/avatar/' + uuidStore().data + '/34'" :alt="usernameStore().data" height="34" width="34" class="avatar-face">
      {{ props.usernameParameter }}
    </div>
  </div>
</template>