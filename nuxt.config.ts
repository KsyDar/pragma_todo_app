// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/index.scss'],
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt',
    'nuxt-mdi'
  ],
  mdi: {
    cache: 'localStorage',
    defaultSize: '2rem'
  },
  stylelint: {
    include: "**/*.(scss)"
  },
  eslint: {
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})
