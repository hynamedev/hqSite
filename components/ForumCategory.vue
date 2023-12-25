<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="container">
    <main class="main">
      <section id="content">
        <div class="forum">
          <div class="forum-tools">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="https://www.lunar.gg/forums">
                  <i class="fa fa-home"></i>
                  Forums
                </a>
              </li>
              <li class="breadcrumb-item">
                <a href="https://www.lunar.gg/forums/official-events">
                  Official Events
                </a>
              </li>
            </ol>
            <div class="btn-holder">
              <div class="btn-group">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                  Hot
                </button>
                <div class="dropdown-menu">
                  <a href="https://www.lunar.gg/forums/official-events" class="dropdown-item">
                    Hot
                  </a>
                  <a href="https://www.lunar.gg/forums/official-events/top" class="dropdown-item">
                    Top
                  </a>
                  <a href="https://www.lunar.gg/forums/official-events/new" class="dropdown-item">
                    New
                  </a>
                </div>
              </div>
              <a href="https://www.lunar.gg/forums/new/official-events" class="btn btn-success">
                New Post
              </a>
            </div>
          </div>
          <table class="table thread-list">
            <thead>
            <tr>
              <th colspan="2">
                <h3>
                  Official Events
                </h3>
              </th>
              <th>Replies</th>
              <th>Last Reply</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
<span class="upvotes ">
46
</span>
              </td>
              <td>
                <h3>
                  <a href="https://www.lunar.gg/forums/66526/upcoming-faction-tournament" class="break-word">
                    Upcoming Faction Tournament
                  </a>
                </h3>
                <div>
                  By
                  <a href="https://www.lunar.gg/u/james_is_awesome">
<span class="name-color-platform-admin">
james_is_awesome,
</span>
                  </a>
                  <time datetime="1560359731231" data-format="ago" data-toggle="tooltip" data-original-title="1:15 PM Jun 12 2019">4 years ago</time>
                </div>
              </td>
              <td>
                38
              </td>
              <td>
                <time datetime="1560541518762" data-format="ago" data-toggle="tooltip" data-original-title="3:45 PM Jun 14 2019">4 years ago</time>
              </td>
            </tr>
            <tr>
              <td>
<span class="upvotes ">
64
</span>
              </td>
              <td>
                <h3>
                  <a href="https://www.lunar.gg/forums/78861/practice-10v10-tournament-2-ban-wave" class="break-word">
                    Practice 10v10 Tournament #2 + Ban Wave
                  </a>
                </h3>
                <div>
                  By
                  <a href="https://www.lunar.gg/u/Physci">
<span class="name-color-owner">
Physci,
</span>
                  </a>
                  <time datetime="1559157951117" data-format="ago" data-toggle="tooltip" data-original-title="3:25 PM May 29 2019">4 years ago</time>
                </div>
              </td>
              <td>
                52
              </td>
              <td>
                <time datetime="1559419072476" data-format="ago" data-toggle="tooltip" data-original-title="3:57 PM Jun 1 2019">4 years ago</time>
              </td>
            </tr>
            <tr>
              <td>
<span class="upvotes ">
47
</span>
              </td>
              <td>
                <h3>
                  <a href="https://www.lunar.gg/forums/49814/practice-10v10-tournament-1" class="break-word">
                    Practice 10v10 Tournament #1
                  </a>
                </h3>
                <div>
                  By
                  <a href="https://www.lunar.gg/u/Physci">
<span class="name-color-owner">
Physci,
</span>
                  </a>
                  <time datetime="1558646328149" data-format="ago" data-toggle="tooltip" data-original-title="5:18 PM May 23 2019">4 years ago</time>
                </div>
              </td>
              <td>
                19
              </td>
              <td>
                <time datetime="1558796061194" data-format="ago" data-toggle="tooltip" data-original-title="10:54 AM May 25 2019">4 years ago</time>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>