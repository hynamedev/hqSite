// https://nuxt.com/docs/api/configuration/nuxt-config
import mongo from './mongoConnection'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ['@pinia/nuxt',
    async function () {
      mongo.connect();
    }
  ],
  app: {
    head: {
      link: [
        // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta.2/dist/css/bootstrap.min.css', crossorigin: 'anonymous' },
        // { rel: 'stylesheet', href: '/static/css/bootstrap.css', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: '/static/css/style.css', crossorigin: 'anonymous' }
      ],
      script: [
        { src: 'https://code.jquery.com/jquery-3.2.1.min.js', crossorigin: 'anonymous' },
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta.2/dist/js/bootstrap.bundle.min.js', crossorigin: 'anonymous' }
      ]

    }
  }
})
