<script setup>
import config from '~/siteConfig.js';

const props = defineProps({
  usernameParameter: {
    type: String,
    required: true
  },
  loggedInStaff: {
    type: Boolean,
    default: false
  },
  selectedTab: {
    type: String,
    default: 'general'
  }

})

</script>

<template>
  <div class="block">
    <ul class="tab-item nav nav-tabs">
      <li>

        <a :href="'/u/' + props.usernameParameter" :class="selectedTab.toLowerCase() === 'general' ? 'profile-tab active' : 'profile-tab'">
          General
        </a>
      </li>
      <li>
        <a :href="'/u/' + props.usernameParameter + '/practice'" :class="selectedTab.toLowerCase() === 'statistics' ? 'profile-tab active' : 'profile-tab'">
          Statistics
        </a>
      </li>
      <li>
        <a :href="'/u/' + props.usernameParameter + '/threads'" :class="selectedTab.toLowerCase() === 'threads' ? 'profile-tab active' : 'profile-tab'">
          Forums
        </a>
      </li>


    </ul>

    <br v-if="loggedInStaff">

    <ul class="tab-item nav nav-tabs" v-if="loggedInStaff">
      <li>
        <a :href="'/u/' + props.usernameParameter + '/staffInfo'" :class="selectedTab.toLowerCase() === 'staffinfo' ? 'admin-tab active' : 'admin-tab'">
          Information
        </a>
      </li>
      <li>
        <a :href="'/u/' + props.usernameParameter + '/punishments'" :class="selectedTab.toLowerCase() === 'punishments' ? 'admin-tab active' : 'admin-tab'">
          Punishments
        </a>
      </li>
      <li>
        <a :href="'/u/' + props.usernameParameter + '/grants'" :class="selectedTab.toLowerCase() === 'grants' ? 'admin-tab active' : 'admin-tab'">
          Grants
        </a>
      </li>


    </ul>

  </div>
</template>