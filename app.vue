<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script>
// import '@unocss/reset/tailwind.css'
export default {
  setup() {
    useHead({
      link: [
        {
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css',
          rel: 'stylesheet',
        },
      ],
    })
  },
}
</script>
