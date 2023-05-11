<template>
  <div>
    <div>
      <div>Header</div>
      <button @click="logout">
        Logout
      </button>
    </div>
    <slot></slot>
    <div>Footer</div>
  </div>
</template>
<script>
import axios from '../lib/axios'

export default {
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
