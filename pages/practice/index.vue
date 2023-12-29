<script setup>

import config from '~/siteConfig.js';

import jquery from 'jquery'
import {
  bannedStore, kitsStore, leaderboardStore, matchesStore, playerEloStore, playerStatsStore,
  punishmentStore, rankedKitsStore,
  rankInfoStore,
  rankStore, teamStatsStore,
  userInfoStore,
  usernameStore,
  uuidStore
} from "~/store/store.js";
import ProfileComments from "~/components/ProfileComments.vue";
import FancyUserHeader from "~/components/FancyUserHeader.vue";
import mongo from "~/mongoConnection.js";
const route = useRoute()
const stats = []

const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

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

definePageMeta({
  middleware: [
    async function (to, from, next) {
      if (process.client) return;
      const baseURL = config.apiHost; // replace with your base URL
      const headers = config.authHeader;
      let kits = await mongo.readRankedKits();
      let kitLeaderboards = [];

      for (const kit of kits) {
        rankedKitsStore().data.push(kit);

        kitLeaderboards[kit._id] = await mongo.getTop10EloInCategory(kit._id);
      }

      kitLeaderboards['GLOBAL'] = await mongo.getTop10EloInCategory('GLOBAL');

      leaderboardStore().data = kitLeaderboards;

  }]
})

</script>

<template>

  <div class="container">
    <main class="main">
      <div class="leaderboards">
        <section id="content">
          <div class="page-current">
            <div class="title">
              <h2><i class="fa fa-trophy" aria-hidden="true"></i>Practice Leaderboards</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="table-holder">
                <table class="table table-responsive table-striped">
                  <thead>
                  <tr>
                    <th class="text-center" colspan="3">
                      Global
                      <span class="bg-box"></span>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="player in leaderboardStore().data['GLOBAL']">
                    <td class="rank">
                      {{ leaderboardStore().data['GLOBAL'].indexOf(player) + 1 }}
                    </td>
                    <td class="username">
                      <div class="avatar">
                        <a :href="'/u/' + player.lastUsername + '/practice'">
                          <img :src="'https://minotar.net/avatar/' + player.uuid + '/16'" height="16" width="16" class="avatar-face">
                          <span>{{ player.lastUsername }}</span>
                        </a>
                      </div>
                    </td>
                    <td class="text-right">
                      {{ player['GLOBAL'] }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center" colspan="3">
                      <a href="/practice/global">
                        More...
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-md-4" v-for="kit in rankedKitsStore().data">
              <div class="table-holder">
                <table class="table table-responsive table-striped">
                  <thead>
                  <tr>
                    <th class="text-center" colspan="3">
                      {{ kit.displayName }}
                      <span class="bg-box"></span>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="player in leaderboardStore().data[kit._id]">
                    <td class="rank">
                      {{ leaderboardStore().data[kit._id].indexOf(player) + 1 }}
                    </td>
                    <td class="username">
                      <div class="avatar">
                        <a :href="'/u/' + player.lastUsername + '/practice'">
                          <img :src="'https://minotar.net/avatar/' + player.uuid + '/16'" height="16" width="16" class="avatar-face">
                          <span>{{ player.lastUsername }}</span>
                        </a>
                      </div>
                    </td>
                    <td class="text-right">
                      {{ player[kit._id] }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center" colspan="3">
                      <a :href="'/practice/' + kit._id">
                        More...
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>


</template>