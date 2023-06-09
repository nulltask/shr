// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,

  modules: ['nuxt-security', '@unocss/nuxt'],

  runtimeConfig: {
    databaseUrl: process.env.POSTGRES_URL,
  },

  security: {
    csrf: true,
  },

  contentSecurityPolicy: {
    'connect-src': ['vitals.vercel-insights.com'],
  },
});
