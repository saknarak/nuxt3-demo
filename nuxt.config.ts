// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  modules: [
    // '@unocss/nuxt',
  ],
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:1880/api',
        changeOrigin: true,
        // prependPath: false,
      },
    },
  },
})
