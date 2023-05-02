// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    databaseUrl: process.env.POSTGRES_URL,
  },
});
