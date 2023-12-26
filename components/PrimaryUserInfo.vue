<script setup>
import {onBeforeMount} from "vue";

const props = defineProps({
  usernameParameter: {
    type: String,
    required: true
  }
})


import jquery from 'jquery'
import config from '~/siteConfig.js'
import {
  bannedStore,
  punishmentStore,
  rankInfoStore,
  rankStore,
  userInfoStore,
  usernameStore,
  uuidStore
} from "~/store/store.js";



const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} ${years > 1 ? 'Years' : 'Year'} Ago`;
  if (months > 0) return `${months} ${months > 1 ? 'Months' : 'Month'} Ago`;
  if (days > 0) return `${days} ${days > 1 ? 'Days' : 'Day'} Ago`;
  if (hours > 0) return `${hours} ${hours > 1 ? 'Hours' : 'Hour'} Ago`;
  if (minutes > 0) return `${minutes} ${minutes > 1 ? 'Minutes' : 'Minute'} Ago`;
  return 'Just Now';
};

</script>

<template>
  <div class="col-lg-3">
    <aside id="sidebar">
      <div class="box">
        <div class="banned-box" v-if="bannedStore().data">
                <span class="text">
                  <strong class="title">Banned</strong>
                  {{ formatTimeAgo(userInfoStore().data.lastSeenAt) }}
                </span>
        </div>
        <div class="online-box" v-else-if="userInfoStore().data.online">
                <span class="text">
                  <strong class="title">Online</strong>
                  Playing {{ userInfoStore().data.lastSeenOn }}
                </span>
        </div>
        <div class="offline-box" v-else>
                <span class="text">
                  <strong class="title">Offline</strong>
                  Last Seen {{ formatTimeAgo(userInfoStore().data.lastSeenAt) }}
                </span>
        </div>


        <div id="user-info" class="user-box" :data-player="usernameStore().data">
          <div class="img-box">
            <img :src="'https://visage.surgeplay.com/bust/400/' + uuidStore().data + '.png'" :alt="usernameStore().data" height="168" width="168" style="transform: scale(1.0); object-fit: contain;" class="avatar-half">
          </div>
          <strong class="name">{{ usernameStore().data }}</strong>
        </div>
        <div class="premium-box">
                <span class="btn btn-info" :style="'border-color: #' + rankInfoStore().data.websiteColor + '; background-color: #' + rankInfoStore().data.websiteColor + ' ; pointer-events:none; cursor: default;'">
                {{ rankInfoStore().data.displayName }}
                </span>
        </div>
      </div>
      <div class="box">
        <strong class="heading">General Statistics</strong>
        <ul class="statistics-item">
          <li>
            First joined
            <b>{{ new Date(userInfoStore().data.firstSeenAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(",", "") }}</b>
          </li>

        </ul>
      </div>
      <div class="box profile-friends-box" data-url="/u/0698321465877836/friends-box">
        <strong class="heading">
          0 friends :(
        </strong>
        <div class="friends-box-plagin">
        </div>
      </div>

    </aside>
  </div>
</template>