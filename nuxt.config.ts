// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ['~/assets/css/main.scss'],
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt'
  ],
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
