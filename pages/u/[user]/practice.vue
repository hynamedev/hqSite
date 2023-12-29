<script setup>

import config from '~/siteConfig.js';

import jquery from 'jquery'
import {
  bannedStore, kitsStore, matchesStore, playerEloStore, playerStatsStore,
  punishmentStore,
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
const kits = {};

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
      if(process.client) return;
      const baseURL = config.apiHost; // replace with your base URL
      const headers = config.authHeader;

      const response = await fetch(baseURL + "/lookup/byName", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          names: [to.params.user]
        })
      });

      if (response.ok) {
        const json = await response.json();

        usernameStore().data = json[to.params.user].username;
        uuidStore().data = json[to.params.user].uuid;
      } else {
        console.error('Error:', response.status, await response.text()); // Log the status and response text
      }

      const infoResponse = await fetch(baseURL + "/users/" + uuidStore().data + "/details", {
        method: 'GET',
        headers: headers,
      });

      if (infoResponse.ok) {
        let json = await infoResponse.json();
        if (json.punishments.length === 0) {
          json.punishments.push({
            removedAt: 0
          });
        }
        punishmentStore().data = json.punishments.pop();
        userInfoStore().data = json.user;
        rankStore().data = json.grants.pop();
        bannedStore().data = punishmentStore().data.removedAt == null && (punishmentStore().data.expiresAt != null ? Date.now() < punishmentStore().data.expiresAt : true);
      } else {
        console.error('Error:', infoResponse.status, await infoResponse.text()); // Log the status and response text
      }

      const rankResponse = await fetch(baseURL + "/ranks/" + rankStore().data.rank, {
        method: 'GET',
        headers: headers,
      });

      if (rankResponse.ok) {
        let json = await rankResponse.json();
        rankInfoStore().data = json;
      } else {
        console.error('Error:', rankResponse.status, await rankResponse.text()); // Log the status and response text
      }


      playerEloStore().data = await mongo.readPlayerELO(uuidStore().data);
      playerStatsStore().data = await mongo.readPlayerStats(uuidStore().data);

      matchesStore().data = await mongo.readLast10Matches(uuidStore().data);
      // kitsStore().data = ;

      const kits = await mongo.readAllKits();
      for (let kit in kits) {
        kitsStore().data[kits[kit]._id] = kits[kit];
      }

      // for (let key in playerStatsStore().data) {
      //   console.log(key)
      //   if (typeof playerStatsStore().data[key] === 'object' && playerStatsStore().data[key] !== null && key !== 'GLOBAL') {
      //     kitsStore().data[key] = await mongo.readDocument('Practice', 'kitTypes', key)
      //   }
      // }

    }
  ]
})
stats.push('')
for (let key in playerStatsStore().data) {
  if (typeof playerStatsStore().data[key] === 'object' && playerStatsStore().data[key] !== null) {
    stats.push(key)
  }
}


</script>

<template>

  <div class="container">
    <main class="main">
      <FancyUserHeader :username-parameter="usernameStore().data" />
      <div class="row">

        <PrimaryUserInfo :usernameParameter="usernameStore().data"/>

        <div class="col-lg-9">
          <section id="content">
            <div class="tabs-section">
              <ProfileTabs :username-parameter="usernameStore().data" :loggedInStaff="false" selectedTab="statistics"/>

              <div class="block">
                <ul class="nav nav-pills gamemode-item">
                  <li class="nav-item">
                    <a :href="'/u/' + usernameStore().data + '/Practice'" class="nav-link active ">
                      Practice
                    </a>
                  </li>
                  <li class="nav-item">
                    <a :href="'/u/' + usernameStore().data + '/uhc'" class="nav-link ">
                      UHC
                    </a>
                  </li>
                  <li class="nav-item">
                    <a :href="'/u/' + usernameStore().data + '/bunkers'" class="nav-link ">
                      Bunkers
                    </a>
                  </li>
                  <li class="nav-item">
                    <a :href="'/u/' + usernameStore().data + '/meetup'" class="nav-link ">
                      Meetup
                    </a>
                  </li>
                  <li class="nav-item">
                    <a :href="'/u/'  +  usernameStore().data + '/minesg'" class="nav-link ">
                      MineSG
                    </a>
                  </li>
                </ul>

                <ul class="teams-item">
                  <template v-for="key in Object.keys(playerStatsStore().data)">
                    <li v-if="typeof playerStatsStore().data[key] === 'object' && playerStatsStore().data[key] !== null">
                      <div :class="'team-box bg-0' + (stats.indexOf(key) < 9 ? stats.indexOf(key) : 9)">
                        <div>
                          <strong class="title">{{ (key !== 'GLOBAL' ? kitsStore().data[key].displayName : 'Global') }}</strong>
                          <ul class="statistic-item">
                            <li>
                              <b>{{ playerEloStore().data[key] }}</b> Elo
                            </li>
                            <li>
                              <b>{{ playerStatsStore().data[key].WINS }}</b> Wins
                            </li>
                            <li>
                              <b>{{ playerStatsStore().data[key].LOSSES }}</b> Losses
                            </li>
                            <li>
                              <b>{{ Math.ceil(playerStatsStore().data[key].WLR * 100) / 100 }}</b> W/L Ratio
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="recent-games-title">Recent Matches</div>

              <ul class="recent-games">
                <li class="shiny-border" v-for="match in matchesStore().data">
                    <a :href="'/match/' + match._id">
                      <div class="d-flex">
                        <div class="d-flex flex-column flex-sm-row">
                          <div class="d-flex">
                            <div class="avatar">
                              <img :src="'https://minotar.net/avatar/' + uuidStore().data +  '/40'" height="40" width="40" class="avatar-face">
                            </div>
                            <div>
                              <div>
                                <strong> {{ match.postMatchPlayers[uuidStore().data].lastUsername }}</strong>
                              </div>
                              <div v-if="!match.ranked">
                                <span class="text-success" v-if="match.winningPlayers.includes(uuidStore().data)">Winner!</span>
                                <span class="text-danger" v-else>Loser!</span>
                              </div>
                              <div v-else>
                                <span v-if="match.winningPlayers.includes(uuidStore().data)">{{ match.eloChange.winnerNew }} <span class="text-success">(+{{ match.eloChange.winnerGain }})</span></span>
                                <span v-else>{{ match.eloChange.loserNew }} <span class="text-danger">({{ match.eloChange.loserGain }})</span></span>
                              </div>
                            </div>
                          </div>

                          <div class="vs">
                            vs
                          </div>

                          <div class="d-flex">
                            <div class="avatar">
                              <img :src="'https://minotar.net/avatar/' + (match.winningPlayers.includes(uuidStore().data) ? match.losingPlayers[0] : match.winningPlayers[0]) + '/40'"  height="40" width="40" class="avatar-face">
                            </div>
                            <div>
                              <div>
                                <strong>{{ (match.allPlayers.indexOf(uuidStore().data) === 0 ? match.postMatchPlayers[match.allPlayers[1]].lastUsername : match.postMatchPlayers[match.allPlayers[0]].lastUsername) }}</strong>
                              </div>
                              <div v-if="!match.ranked">
                                <span class="text-danger" v-if="match.winningPlayers.includes(uuidStore().data)">Loser!</span>
                                <span class="text-success" v-else>Winner!</span>
                              </div>
                              <div v-else>
                                <span v-if="match.winningPlayers.includes(uuidStore().data)">{{ match.eloChange.loserNew }} <span class="text-danger">({{ match.eloChange.loserGain }})</span></span>
                                <span v-else>{{ match.eloChange.winnerNew }} <span class="text-success">(+{{ match.eloChange.winnerGain }})</span></span>
                              </div>
                            </div>
                          </div>



                        </div>

                        <div class="flex-grow text-right">
                          <div>
                            {{ kitsStore().data[match.kitType].displayName }}
                          </div>
                          <div>
                            {{ formatTimeAgo(new Date(match.endedAt)) }}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
              </ul>

            </div>
          </section>
        </div>
      </div>
    </main>
  </div>


</template>