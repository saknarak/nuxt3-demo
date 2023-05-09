// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },
  nitro: {
    devProxy: {
      '/devApi': {
        target: 'your url',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
})
