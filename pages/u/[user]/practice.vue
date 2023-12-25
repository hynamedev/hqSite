<script setup>

import config from '~/siteConfig.js';

import jquery from 'jquery'
import {
  bannedStore,
  punishmentStore,
  rankInfoStore,
  rankStore,
  userInfoStore,
  usernameStore,
  uuidStore
} from "~/store/store.js";
import ProfileComments from "~/components/ProfileComments.vue";
import FancyUserHeader from "~/components/FancyUserHeader.vue";
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
    }
  ]
})

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
                  <li>
                    <div class="team-box bg-02">
                      <div>
                        <strong class="title">Global</strong>
                        <ul class="statistic-item">
                          <li>
                            <b>1000</b> Elo
                          </li>
                          <li>
                            <b>1</b> Wins
                          </li>
                          <li>
                            <b>5</b> Losses
                          </li>
                          <li>
                            <b>0.2</b> W/L Ratio
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="team-box bg-03">
                      <div>
                        <strong class="title">Debuff</strong>
                        <ul class="statistic-item">
                          <li>
                            <b>1000</b> Elo
                          </li>
                          <li>
                            <b>1</b> Wins
                          </li>
                          <li>
                            <b>1</b> Losses
                          </li>
                          <li>
                            <b>1</b> W/L Ratio
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="recent-games-title">Recent Matches</div>

              <ul class="recent-games">
                  <li class="shiny-border">
                    <a href="/match/id">
                      <div class="d-flex">
                        <div class="d-flex flex-column flex-sm-row">


                          <div class="d-flex">
                            <div class="avatar">
                              <img src="https://minotar.net/avatar/5dbd02e1-ef79-42d9-85bb-297e459c2816/40" alt="InvalidException" height="40" width="40" class="avatar-face">
                            </div>
                            <div>
                              <div>
                                <strong>InvalidException</strong>
                              </div>
                              <div>
                                <span class="text-success">Winner!</span>
                              </div>
                            </div>
                          </div>

                          <div class="vs">
                            vs
                          </div>

                          <div class="d-flex">
                            <div class="avatar">
                              <img src="https://minotar.net/avatar/eafa69eb-d5f1-4c34-9e91-2bbdd3356611/40" alt="ztxv" height="40" width="40" class="avatar-face">
                            </div>
                            <div>
                              <div>
                                <strong>ztxv</strong>
                              </div>
                              <div>
                                <span class="text-danger">Loser!</span>
                              </div>
                            </div>
                          </div>



                        </div>

                        <div class="flex-grow text-right">
                          <div>
                            No Debuff
                          </div>
                          <div>
                            <time datetime="1692982965702" data-format="ago" data-toggle="tooltip" data-original-title="1:02 PM Aug 25"></time>
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