<script setup>

import config from '~/siteConfig.js';
import mongo from '~/mongoConnection.js';
import jquery from 'jquery'

import ProfileComments from "~/components/ProfileComments.vue";
import FancyUserHeader from "~/components/FancyUserHeader.vue";
import {
  bannedStore, playerStatsStore,
  punishmentStore,
  rankInfoStore,
  rankStore, teamStatsStore,
  userInfoStore,
  usernameStore,
  uuidStore
} from '~/store/store.js';
const route = useRoute()



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

        playerStatsStore().data = await mongo.readPlayerStats(uuidStore().data);

      }
  ]
})


</script>

<template>
  <div class="container">
    <main class="main">
      <FancyUserHeader :username-parameter="usernameStore().data"/>
      <div class="row">

        <PrimaryUserInfo :usernameParameter="usernameStore().data"/>

        <div class="col-lg-9">
          <section id="content">
            <div class="tabs-section">
              <ProfileTabs :username-parameter="usernameStore().data" :loggedInStaff="false" selectedTab="general"/>

              <GeneralUserInfo :username-parameter="usernameStore().data"
                               :uuid-parameter="uuidStore().data"
                               :practice-stats="playerStatsStore().data"
                               :team-stats="teamStatsStore().data"/>

              <ProfileComments :username-parameter="usernameStore().data"/>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>