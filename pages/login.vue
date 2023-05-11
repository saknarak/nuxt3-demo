<template>
  <form>
    <div>busy={{ busy }}</div>
    <div>{{ message }}</div>
    <div>
      <div>
        <label class="form-label">User</label>
      </div>
      <div>
        <input
          ref="user"
          v-model="user"
          class="form-control"
          :disabled="busy"
          autofocus
          @keyup.enter="onUserEnter"
        >
      </div>
    </div>
    <div>
      <div><label class="form-label">Pass</label></div>
      <div><input ref="pass" class="form-control" v-model="pass" :disabled="busy"></div>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-primary"
        @click="doLogin"
        :disabled="lock || busy"
      >
        Login
      </button>
      <button class="btn btn-secondary" @click="doReset">
        Reset
      </button>
    </div>
    <div>{{ message }}</div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  setup() {
    // eslint-disable-next-line no-undef
    setPageLayout('public')
  },
  data() {
    return {
      user: '',
      pass: '',
      busy: false,
      message: '',
    }
  },

  computed: {
    lock() {
      return this.user.length === 0 || this.pass.length === 0
    },
  },

  methods: {
    async doLogin() {
      this.busy = true
      this.message = ''

      try {
        let payload = {
          user: this.user,
          pass: this.pass,
        }
        let result = await axios.post('/api/login', payload)
        console.log('result=', result)
        if (!result.data.token) {
          throw new Error('user or pass incorrect')
        }

        window.sessionStorage.setItem('token', result.data.token)

        this.$router.push('/list')
        // if (this.user === 'user1' && this.pass === '1234') {
        //   this.$router.push('/list')
        // } else {
        //   this.message = 'user หรือ pass ไม่ถูกต้อง'
        //   this.doReset()
        // }
      } catch (e) {
        this.message = e.message
      } finally {
        this.busy = false
      }
    }, // doLogin

    doReset() {
      this.user = ''
      this.pass = ''
      setTimeout(() => {
        this.$refs.user.focus()
      }, 0)
    }, // doReset

    onKeydown(evt) {
      // console.log('onKeydown')
    }, // onKeydown

    onUserEnter(evt) {
      console.log('onKeyup', evt)
      this.$refs.pass.focus()
    }, // onKeyup

    onKeypress(evt) {
      // console.log('onKeypress')
    }, // onKeypress
  }, // methods
}
</script>
