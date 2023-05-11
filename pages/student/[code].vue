<template>
  <h1>STUDENT {{ $route.params.code }}</h1>
  <hr>
  <div>
    <input ref="photo" type="file" class="form-control" multiple>
  </div>
  <div>
    <button class="btn btn-primary" @click="upload">
      UPLOAD
    </button>
  </div>
</template>

<script>
import axios from '@/lib/axios'

// OPTION API
export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    async upload() {
      const formData = new FormData()
      formData.append('code', this.$route.params.code)
      for (let i = 0; i < this.$refs.photo.files.length; i++) {
        formData.append('photo' + i, this.$refs.photo.files[i])
      }
      await axios.post('/api/students/photo', formData)
    }, // upload
  },
}
</script>
