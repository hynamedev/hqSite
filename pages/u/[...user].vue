<script setup>

import jquery from 'jquery'
const route = useRoute()


const baseURL = 'http://localhost:8080'; // replace with your base URL
const headers = {'MHQ-Authorization': 'website'};

let user = reactive({ data: null});
let userInfo = reactive({ data: null });
let userGrants = reactive({ data: null });

const response = await fetch(baseURL + "/lookup/byName", {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    names: route.params.user
  })
});


console.log(JSON.stringify({
  names: route.params.user
}))

if (response.ok) {
  user.data = (await response.json())[route.params.user[0]];


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
  userGrants.data = json.grants;

} else {
  console.error('Error:', infoResponse.status, await infoResponse.text()); // Log the status and response text
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
<!--                rank shit ig???? -->
                <span class="btn btn-info" style="border-color: #AAAAAA; background-color: #AAAAAA; pointer-events:none; cursor: default;">
                Default
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
                <li>
                  <b>1 days</b>
                  played
                </li>
              </ul>
            </div>
            <div class="box profile-friends-box" data-url="/u/0698321465877836/friends-box">
              <strong class="heading">
                0 friends
              </strong>
              <div class="friends-box-plagin">
              </div>
              <div>
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
                    <a :href="'/u/' + user.data.username" class="profile-tab active">
                      General
                    </a>
                  </li>
                  <li>
                    <a :href="'/u/' + user.data.username + '/practice'" class="profile-tab ">
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
                <ul class="teams-item">
                  <li>
                    <div class="team-box bg-02">
                      <a :href="'/u/' + user.data.username + '/practice'">
                        <strong class="title">Practice</strong>
                        <ul class="statistic-item">
                          <li>
                            No Games Played
                          </li>
                        </ul>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="block" id="comments" :data-url="'/u/' + user.data.username + '/comments'">
                <section class="comments-block">
                  <h2>
                    <i class="fa fa-comments" aria-hidden="true"></i> Comments
                  </h2>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>