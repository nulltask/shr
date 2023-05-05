// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,

  modules: ['@unocss/nuxt'],

  runtimeConfig: {
    databaseUrl: process.env.POSTGRES_URL,
  },
});
