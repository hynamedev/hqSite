<script setup>
const route = useRoute()

const baseURL = 'http://localhost:8080'; // replace with your base URL
const headers = {'MHQ-Authorization': 'website'};

let user = reactive({ data: null, online: true });
user = {
  data: {
    primeavian: {
      uuid: "aee1b4bb-3652-4d90-b95a-a976d26fa85a",
      name: "primeavian"
    }
  },
  banned: true,
  online: true
};

// const response = await fetch(baseURL + "/lookup/byName", {
//   method: 'POST',
//   headers: headers,
//   body: JSON.stringify({
//     names: route.params.user
//   })
// });
//
// if (response.ok) {
//   user.data = (await response.json());
//   console.log('User data:', user.data); // Log the user data
//
// } else {
//   console.error('Error:', response.status, await response.text()); // Log the status and response text
// }

</script>



<style scoped>
@import "@/static/css/style.css";
@import "@/static/css/bootstrap.css";
@import "@/static/css/font-awesome.css";
@import "@/static/css/fonts.css";
@import "@/static/css/schedule.css";

</style>

<template>
  <div class="container">
    <main class="main">
      <div class="profile-header shiny-border">
        <div>
          <img :src="'https://crafatar.com/avatars/' + user.data[route.params.user[0]].uuid + '?size=34&amp;overlay'" :alt="user.data[route.params.user[0]].name" height="34" width="34" class="avatar-face">
          {{ user.data[route.params.user[0]].name }}
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <aside id="sidebar">
            <div class="box">
              <div class="banned-box" v-if="user.banned">
                <span class="text">
                  <strong class="title">Banned</strong>
                  Last Seen <time datetime="1559509196295" data-format="ago" data-toggle="tooltip"></time>
                </span>
              </div>
              <div class="online-box" v-else-if="user.online">
                <span class="text">
                  <strong class="title">Online</strong>
                  Last Seen <time datetime="1559509196295" data-format="ago" data-toggle="tooltip"></time>
                </span>
              </div>
              <div class="offline-box" v-else>
                <span class="text">
                  <strong class="title">Offline</strong>
                  Last Seen <time datetime="1559509196295" data-format="ago" data-toggle="tooltip"></time>
                </span>
              </div>


              <div id="user-info" class="user-box" data-player="0698321465877836">
                <img :src="'https://crafatar.com/renders/body/' + user.data[route.params.user[0]].uuid + '?overlay'" :alt="user.data[route.params.user[0]].name" height="200" width="88" style="object-fit: contain;" class="avatar-half">
                <strong class="name">{{ user.data[route.params.user[0]].name }}</strong>
              </div>
              <div class="premium-box">
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
                  <b><time datetime="1555107934267" data-format="date" data-toggle="tooltip"></time></b>
                </li>
                <li>
                  <b>1 days</b>
                  played
                </li>
                <li>
                  <b>238</b> views per month
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
                    <a :href="'/u/' + user.data[route.params.user[0]].name" class="profile-tab active">
                      General
                    </a>
                  </li>
                  <li>
                    <a :href="'/u/' + user.data[route.params.user[0]].name + '/practice'" class="profile-tab ">
                      Statistics
                    </a>
                  </li>
                  <li>
                    <a :href="'/u/' + user.data[route.params.user[0]].name + '/threads'" class="profile-tab ">
                      Forums
                    </a>
                  </li>
                </ul>
                <ul class="tab-item nav nav-tabs">
                </ul>
              </div>
              <div class="block">
                <ul class="teams-item">
                  <li>
                    <div class="team-box bg-02">
                      <a :href="'/u/' + user.data[route.params.user[0]].name + '/practice'">
                        <strong class="title">Practice</strong>
                        <ul class="statistic-item">
                          <li>
                            <b>3 hours</b> Played
                          </li>
                          <li>
                            <b>7</b> Wins
                          </li>
                          <li>
                            <b>14</b> Losses
                          </li>
                          <li>
                            <b>0.50</b> W/L Ratio
                          </li>
                        </ul>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="block" id="comments" data-url="/u/0698321465877836/comments">
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