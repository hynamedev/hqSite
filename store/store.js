// store.js
import { defineStore } from 'pinia';

export const usernameStore = defineStore({
  id: 'user',
  state: () => ({
    data: null
  }),
});

export const uuidStore = defineStore({
  id: 'uuid',
  state: () => ({
    data: null
  }),
});

export const userInfoStore = defineStore({
  id: 'userInfo',
  state: () => ({
    data: null
  }),
});

export const rankStore = defineStore({
  id: 'rank',
  state: () => ({
    data: null
  }),
});

export const rankInfoStore = defineStore({
  id: 'rankInfo',
  state: () => ({
    data: null
  }),
});

export const punishmentStore = defineStore({
  id: 'punishment',
  state: () => ({
    data: null
  }),
});

export const bannedStore = defineStore({
  id: 'banned',
  state: () => ({
    data: false
  }),
});

export const playerCountStore = defineStore({
  id: 'playerCount',
  state: () => ({
    data: 0
  }),
});


export const staffRankDataStore = defineStore({
  id: 'staffRankData',
  state: () => ({
    data: []
  }),
});

export const staffRankNameStore = defineStore({
  id: 'staffRankNames',
  state: () => ({
    data: null
  }),
});

export const staffRanksStore = defineStore({
  id: 'staffRanks',
  state: () => ({
    data: []
  }),
});

export const playerStatsStore = defineStore({
  id: 'practiceStats',
  state: () => ({
    data: {}
  }),
});


export const matchStore = defineStore({
  id: 'matchStats',
  state: () => ({
    data: {}
  }),
});

export const kitStore = defineStore({
  id: 'kit',
  state: () => ({
    data: {}
  }),
});


export const isPostStore = defineStore({
  id: 'isPost',
  state: () => ({
    data: undefined
  }),
});


export const postStore = defineStore({
  id: 'post',
  state: () => ({
    data: {}
  }),
});


export const featuredPostsStore = defineStore({
  id: 'featuredPosts',
  state: () => ({
    data: []
  }),
});


export const forumStore = defineStore({
  id: 'forum',
  state: () => ({
    data: {}
  }),
});

export const topPostsStore = defineStore({
  id: 'topPosts',
  state: () => ({
    data: []
  }),
});

export const teamStatsStore = defineStore({
  id: 'teamStats',
  state: () => ({
    data: {}
  }),
});


