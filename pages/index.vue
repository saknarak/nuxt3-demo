<template>
  <h1>INDEX PAGE</h1>
  <div :title="`This is ${name}`">
    My id=<b>{{ id * 10 }}</b>
    name=<i>{{ name.toUpperCase() }}</i>
    <div>
      <input type="text" :disabled="true">
    </div>
  </div>
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
}
</script>

<style>
</style>
