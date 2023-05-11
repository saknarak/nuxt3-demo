<template>
  <div>
    <div>
      <div>Header</div>
      <button @click="logout">
        Logout
      </button>
    </div>
    <slot></slot>
    <div>Footer {{ somsak }}</div>
  </div>
</template>
<script>
import axios from '../lib/axios'

export default {
  async mounted() {
    console.log('default layout mounted')
    clearInterval(this.timer)
    this.timer = setInterval(async () => {
      let token = sessionStorage.getItem('token')
      if (!token) {
        return
      }
      let result = await axios.get('/api/token')
      if (!result.data.token) {
        return this.logout()
      }
      sessionStorage.setItem('token', result.data.token)
      axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`
    }, 5 * 60 * 1000)
  },

  beforeUnmount() {
    console.log('beforeUnmount')
    clearInterval(this.timer)
  },

  async mountedBak() {
    console.log('created')
    let token = sessionStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
      return
    }
    let tmp = token.split('.')
    // JSON.parse, JSON.stringify
    let data = JSON.parse(atob(tmp[1]))
    let now = (new Date().getTime()) / 1000
    if (now > data.exp) {
      this.$router.push('/login')
      return
    }
    // iat, exp
    console.log('data=', data)
    console.log('now=', now, 'exp=', data.exp)
    // 1683773627.216
    // 1683855971
    // no this.$refs
  },

  methods: {
    logout() {
      sessionStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
      this.$router.push('/login')
    },
  },
}
</script>
