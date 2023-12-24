<script setup>
import config from '~/siteConfig.js';

const props = defineProps({
  usernameParameter: {
    type: String,
    required: true
  },
  uuidParameter: {
    type: String,
    required: true
  },
  practiceStats: {
    type: Object,
    required: true
  }
})



import jquery from 'jquery'
import {playerStatsStore} from "~/store/store.js";


const baseURL = config.apiHost; // replace with your base URL
const headers = config.authHeader;

</script>

<template>
  <div class="block">
    <ul class="teams-item">
      <li>
        <div class="team-box bg-02" v-if="Object.keys(props.practiceStats).length === 0">
          <a :href="'/u/' + props.usernameParameter + '/practice'">
            <strong class="title">Practice</strong>
            <ul class="statistic-item">
              <li>
                No Games Played
              </li>
            </ul>
          </a>
        </div>
        <div class="team-box bg-02" v-else>
          <a :href="'/u/' + props.usernameParameter + '/practice'">
            <strong class="title">Practice</strong>
            <ul class="statistic-item">
              <li>
                <b>N/A Days</b> Played
              </li>
              <li>
                <b>{{ props.practiceStats.GLOBAL.WINS }}</b> Wins
              </li>
              <li>
                <b>{{ props.practiceStats.GLOBAL.LOSSES }}</b> Losses
              </li>
              <li>
                <b>{{ props.practiceStats.GLOBAL.WLR }}</b> W/L Ratio
              </li>
            </ul>
          </a>
        </div>
      </li>
      <li>
        <div class="team-box bg-06">
          <a :href="'/u/' + props.usernameParameter + '/uhc'">
            <strong class="title">UHC</strong>
            <ul class="statistic-item">
              <li>
                No Games Played
              </li>
            </ul>
          </a>
        </div>
      </li>
      <li>
        <div class="team-box bg-03">
          <a :href="'/u/' + props.usernameParameter + '/bunkers'">
            <strong class="title">Bunkers</strong>
            <ul class="statistic-item">
              <li>
                No Games Played
              </li>
            </ul>
          </a>
        </div>
      </li>
      <li>
        <div class="team-box bg-04">
          <a :href="'/u/' + props.usernameParameter + '/meetup'">
            <strong class="title">Meetup</strong>
            <ul class="statistic-item">
              <li>
                No Games Played
              </li>
            </ul>
          </a>
        </div>
      </li>
      <li>
        <div class="team-box bg-05">
          <a :href="'/u/' + props.usernameParameter + '/minesg'">
            <strong class="title">MineSG</strong>
            <ul class="statistic-item">
              <li>
                No Games Played
              </li>
            </ul>
          </a>
        </div>
      </li>
      <li>
        <div class="team-box bg-01">
          <a :href="'/u/' + props.usernameParameter + '/kitmap'">
            <strong class="title">KitMap</strong>
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
</template>