<template>
  <h1>ABOUT PAGE {{ name }}</h1>
  <hr>
  <div class="text-big" :class="{error: lock}">
    Name is {{ name }} {{ lock }}
  </div>
  <input type="text" v-model="name">
  <div>Name is {{ name }}</div>
  <button :disabled="lock">
    SAVE 1
  </button>
  <button :disabled="lock">
    SAVE 2
  </button>
  <button v-show="lock">
    SAVE 3
  </button>
</template>

<script>
// OPTION API

export default {
  data() {
    return {
      id: 1,
      name: 'Somsak',
      age: 25,
    }
  },
  computed: {
    lock() {
      console.log('xxxxxxxxxxxxxxxxxxxxxx')
      return this.name.length < 10
    },
    vat() {
      return this.age * this.name.length * (this.lock ? 10 : 20)
    },
  },
}
</script>

<style scoped>
.text-big {
  font-size: 72px;
}
.error {
  color: red;
}
</style>
