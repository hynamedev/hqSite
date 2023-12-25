<script setup>
import Posts from "~/components/FeaturedPostsSection.vue";
import {ref} from "vue";

const route = useRoute()
let posts = ref([]);
let onlinePlayers = ref(1)
function getPosts() {
  posts = ref([{title: "a", content: "a", link: "a", postDate: 0, author: "tt"},
    {
      title: "b",
      content: "b",
      link: "ac",
      postDate: 0,
      author: "tt"
    }]);
}
</script>



<template>
  <div class="container">
    <main class="main">
      <section id="content">
        <div class="forum">
          <div class="forum-tools">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="">
                  <i class="fa fa-home"></i>
                  Forums
                </a>
              </li>
            </ol>
            <div class="btn-holder">
              <a href="login" class="btn btn-success">
                New Post
              </a>
            </div>
          </div>
          <table class="table forum-list">
            <thead>
            <tr>
              <th>
                <h3>
                  MineHQ
                </h3>
              </th>
              <th>Threads</th>
              <th>Last Active</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <h3>
                  <a href="forums/overview">
                    Overview
                  </a>
                </h3>
                <div>This section shows posts from all forums.</div>
              </td>
              <td>
                5886
              </td>
              <td>
                <time datetime="1560556332866" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/news">
                    News
                  </a>
                </h3>
                <div>News, announcements, changes, and more</div>
              </td>
              <td>
                20
              </td>
              <td>
                <time datetime="1560518907625" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/official-events">
                    Official Events
                  </a>
                </h3>
                <div>Events hosted by MineHQ Staff</div>
              </td>
              <td>
                3
              </td>
              <td>
                <time datetime="1560541518762" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            </tbody>
          </table>
          <table class="table forum-list">
            <thead>
            <tr>
              <th>
                <h3>
                  Community
                </h3>
              </th>
              <th>Threads</th>
              <th>Last Active</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <h3>
                  <a href="forums/general-discussion">
                    General Discussion
                  </a>
                </h3>
                <div>Talk about (almost) anything here - just follow the server rules!</div>
              </td>
              <td>
                1526
              </td>
              <td>
                <time datetime="1560554760541" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/media">
                    Media
                  </a>
                </h3>
                <div>Got a cool video? Here&#39;s the place to share it!</div>
              </td>
              <td>
                699
              </td>
              <td>
                <time datetime="1560534619316" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            </tbody>
          </table>
          <table class="table forum-list">
            <thead>
            <tr>
              <th>
                <h3>
                  Games
                </h3>
              </th>
              <th>Threads</th>
              <th>Last Active</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <h3>
                  <a href="forums/teams">
                    Teams
                  </a>
                </h3>
                <div>Discuss HCTeams</div>
              </td>
              <td>
                2043
              </td>
              <td>
                <time datetime="1560556332866" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/squads">
                    Squads
                  </a>
                </h3>
                <div>Discuss HCSquads</div>
              </td>
              <td>
                897
              </td>
              <td>
                <time datetime="1560556151096" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/uhc">
                    UHC
                  </a>
                </h3>
                <div>Discuss UHC</div>
              </td>
              <td>
                36
              </td>
              <td>
                <time datetime="1560543336654" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/practice">
                    Practice
                  </a>
                </h3>
                <div>Discuss Practice</div>
              </td>
              <td>
                177
              </td>
              <td>
                <time datetime="1560556162237" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/bunkers">
                    Bunkers
                  </a>
                </h3>
                <div>Discuss Bunkers</div>
              </td>
              <td>
                28
              </td>
              <td>
                <time datetime="1560444337083" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="forums/kitmap">
                    KitMap
                  </a>
                </h3>
                <div>Discuss KitMap</div>
              </td>
              <td>
                11
              </td>
              <td>
                <time datetime="1559777157466" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            </tbody>
          </table>
          <table class="table forum-list">
            <thead>
            <tr>
              <th>
                <h3>
                  Other
                </h3>
              </th>
              <th>Threads</th>
              <th>Last Active</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <h3>
                  <a href="forums/suggestions">
                    Suggestions
                  </a>
                </h3>
                <div>Got a cool suggestion? Post it here!</div>
              </td>
              <td>
                446
              </td>
              <td>
                <time datetime="1560544260350" data-format="ago" data-toggle="tooltip"></time>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  <a href="login2980">
                    Bug Reports
                  </a>
                </h3>
                <div>Found a bug? Let us know here.</div>
              </td>
              <td>
              </td>
              <td>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>