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
  },
  hcteamsStats: {
    type: Object,
    required: true
  },
})



import jquery from 'jquery'
import {playerStatsStore} from "~/store/store.js";


function formatSeconds(seconds) {
  const units = {
    year: 24 * 60 * 60 * 365,
    month: 24 * 60 * 60 * 30,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1
  }

  for (let name in units) {
    let div = units[name];
    if (seconds >= div) {
      let val = Math.floor(seconds / div);
      return val + ' ' + (val > 1 ? name + 's' : name);
    }
  }

  return '0 seconds';
}

</script>

<template>
  <div class="block">
    <ul class="teams-item">
      <li>
        <div class="team-box bg-06">
          <a :href="'/u/' + props.usernameParameter + '/hcteams'">
            <strong class="title">HCTeams</strong>
            <ul class="statistic-item" v-if="props.hcteamsStats !== null && props.hcteamsStats !== undefined && Object.keys(props.hcteamsStats).length !== 0 ">
              <li>
                <b>{{ (props.hcteamsStats.Playtime !== undefined ? formatSeconds(props.hcteamsStats.Playtime) : "N/A Days") }}</b> Played
              </li>
              <li>
                <b>{{ (props.hcteamsStats.Kills !== undefined ? props.hcteamsStats.Kills : "N/A") }}</b> {{ (props.hcteamsStats.Kills === 1 ? 'Kill' : 'Kills')}}
              </li>
              <li>
                <b>{{ (props.hcteamsStats.Deaths !== undefined ? props.hcteamsStats.Deaths : "N/A") }}</b> {{ (props.hcteamsStats.Deaths === 1 ? 'Death' : 'Deaths')}}
              </li>
              <li>
                <b>{{ (props.hcteamsStats.KDR !== undefined ? props.hcteamsStats.KDR : "N/A") }}</b> K/D Ratio
              </li>
            </ul>
            <ul class="statistic-item" v-else>
              <li>
                No HCTeams Profile
              </li>
            </ul>
          </a>
        </div>
      </li>
      <li>
        <div class="team-box bg-02" v-if="Object.keys(props.practiceStats).length === 0 || props.practiceStats === null">
          <a :href="'/u/' + props.usernameParameter + '/practice'">
            <strong class="title">Practice</strong>
            <ul class="statistic-item">
              <li>
                No Games Yet
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
        <div class="team-box bg-03">
          <a :href="'/u/' + props.usernameParameter + '/bunkers'">
            <strong class="title">Bunkers</strong>
            <ul class="statistic-item">
              <li>
                No Games Yet
              </li>
            </ul>
          </a>
        </div>
      </li>
      <li>
        <div class="team-box bg-04">
          <a :href="'/u/' + props.usernameParameter + '/uhc'">
            <strong class="title">UHC</strong>
            <ul class="statistic-item">
              <li>
                No Games Yet
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
                No Games Yet
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
                No Games Yet
              </li>
            </ul>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>