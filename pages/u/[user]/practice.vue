<script setup>

import jquery from 'jquery'
const route = useRoute()


const baseURL = 'http://localhost:8080'; // replace with your base URL
const headers = {'MHQ-Authorization': 'website'};


let user = reactive({ data: null});
let userInfo = reactive({ data: null });
let userRank = reactive({ data: null });
let rankInfo = reactive({ data: null });

const response = await fetch(baseURL + "/lookup/byName", {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    names: [route.params.user]
  })
});


if (response.ok) {
  user.data = (await response.json())[route.params.user];


} else {
  console.error('Error:', response.status, await response.text()); // Log the status and response text
}


const infoResponse = await fetch(baseURL + "/users/" + user.data.uuid + "/details", {
  method: 'GET',
  headers: headers,
});

if (infoResponse.ok) {
  let json = await infoResponse.json();
  userInfo.data = json.user;
  userRank.data = json.grants[0];
} else {
  console.error('Error:', infoResponse.status, await infoResponse.text()); // Log the status and response text
}

const rankResponse = await fetch(baseURL + "/ranks/" + userRank.data.rank, {
  method: 'GET',
  headers: headers,
});

if (rankResponse.ok) {
  let json = await rankResponse.json();
  rankInfo.data = json;
} else {
  console.error('Error:', rankResponse.status, await rankResponse.text()); // Log the status and response text
}


</script>

<template>
  <div class="container">
    <main class="main">
      <div class="profile-header shiny-border">
        <div>
          <img :src="'https://minotar.net/avatar/' + user.data.uuid + '/34'" :alt="user.data.username" height="34" width="34" class="avatar-face">
          {{ user.data.username }}
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <aside id="sidebar">
            <div class="box">
              <!--              <div class="banned-box" v-if="user">-->
              <!--                <span class="text">-->
              <!--                  <strong class="title">Banned</strong>-->
              <!--                  Last Seen <time datetime="1559509196295" data-format="ago" data-toggle="tooltip"></time>-->
              <!--                </span>-->
              <!--              </div>-->
              <div class="online-box" v-if="userInfo.data.online">
                <span class="text">
                  <strong class="title">Online</strong>
                  Playing {{ userInfo.data.lastSeenOn }}
                </span>
              </div>
              <div class="offline-box" v-else>
                <span class="text">
                  <strong class="title">Offline</strong>
                  Last Seen <time :datetime="userInfo.data.lastSeenAt" data-format="ago" data-toggle="tooltip"></time>
                </span>
              </div>


              <div id="user-info" class="user-box" :data-player="user.data.username">
                <img :src="'https://visage.surgeplay.com/full/400/' + user.data.uuid + '.png'" :alt="user.data.username" height="200" width="88" style="transform: scale(1.3); object-fit: contain;" class="avatar-half">
                <strong class="name">{{ user.data.username }}</strong>
              </div>
              <div class="premium-box">
                <span class="btn btn-info" :style="'border-color: #' + rankInfo.data.websiteColor + '; background-color: #' + rankInfo.data.websiteColor + ' ; pointer-events:none; cursor: default;'">
                {{ rankInfo.data.displayName }}
                </span>
              </div>
            </div>
            <div class="box">
              <strong class="heading">General Statistics</strong>
              <ul class="statistics-item">
                <li>
                  First joined
                  <b><time :datetime="userInfo.data.firstSeenAt" data-format="date" data-toggle="tooltip"></time></b>
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
        <div class="col-lg-9">
          <section id="content">
            <div class="tabs-section">
              <div class="block">
                <ul class="tab-item nav nav-tabs">
                  <li>
                    <a :href="'/u/' + user.data.username" class="profile-tab">
                      General
                    </a>
                  </li>
                  <li>
                    <a :href="'/u/' + user.data.username + '/practice'" class="profile-tab active">
                      Statistics
                    </a>
                  </li>
                  <li>
                    <a :href="'/u/' + user.data.username + '/threads'" class="profile-tab ">
                      Forums
                    </a>
                  </li>
                </ul>
              </div>
              <div class="block">
                <ul class="nav nav-pills gamemode-item">
                  <li class="nav-item">
                    <a href="/u/ImbredYeast/Practice" class="nav-link active ">
                      Practice
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/u/ImbredYeast/uhc" class="nav-link ">
                      UHC
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/u/ImbredYeast/bunkers" class="nav-link ">
                      Bunkers
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/u/ImbredYeast/meetup" class="nav-link ">
                      Meetup
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/u/ImbredYeast/minesg" class="nav-link ">
                      MineSG
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/u/ImbredYeast/survivalgames" class="nav-link ">
                      SurvivalGames
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/u/ImbredYeast/bedwars" class="nav-link ">
                      Bedwars
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
              <div class="block">
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
                              <img src="https://minotar.net/avatar/401202a3-0102-4ed8-979a-e5d4832c8a9b/40" alt="itsjhalt" height="40" width="40" class="avatar-face">
                            </div>
                            <div>
                              <div>
                                <strong>itsjhalt</strong>
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
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>