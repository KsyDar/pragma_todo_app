// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/index.scss"],
  devtools: { enabled: false },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/stylelint-module",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
  ],
  veeValidate: {
    autoImports: true,
  },
  stylelint: {
    include: "**/*.(scss)",
  },
  eslint: {},
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
