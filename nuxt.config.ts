// https://nuxt.com/docs/api/configuration/nuxt-config
import mongo from './mongoConnection'
import axios from 'axios';

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    ['@nuxtjs/auth-next',
      {
        async login(email: any, password: any, userIp: any) {
          try {
            const response = await this.$axios.$get(`/users/${email}/verifyPassword`, {
              params: {
                password,
                userIp
              }
            })

            if (response.authorized) {
              await this.$auth.setUserToken(response.session)
            } else {
              throw new Error('Unauthorized')
            }
          } catch (error) {
            console.error(error)
          }
        }
      }
    ],
    '@pinia/nuxt',
    async function () {
      await mongo.connect();
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
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta.2/dist/js/bootstrap.bundle.min.js', crossorigin: 'anonymous' },
        { src: '/static/js/main.js', crossorigin: 'anonymous' }
      ]

    }
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'session',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'uuid',
          autoFetch: true
        },
        endpoints: {
          login: false, // We'll handle login with a custom method
          logout: false,
          user: false
        }
      }
    }
  }
})
