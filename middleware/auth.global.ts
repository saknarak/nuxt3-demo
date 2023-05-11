// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('to=', to, 'from=', from)
  if (to.path === '/login' || to.path === '/') {
    return
  }

  let token = sessionStorage.getItem('token')
  if (!token) {
    console.log('no token')
    // eslint-disable-next-line no-undef
    return navigateTo('/login')
  }
  let tmp = token.split('.')
  // JSON.parse, JSON.stringify
  let data = JSON.parse(atob(tmp[1]))
  let now = (new Date().getTime()) / 1000
  if (now > data.exp) {
    // eslint-disable-next-line no-undef
    return navigateTo('/login')
  }
})
