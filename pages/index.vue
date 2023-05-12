<template>
  <h1>INDEX PAGE</h1>
  <button @click="doConnect">
    Connect
  </button>
  <div :title="`This is ${name}`">
    <div>CODE: {{ code }}</div>
    <div>TEMP: {{ temp }}</div>
    <div>HUMI: {{ humi }}</div>
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
      code: 'unknown',
      temp: 25,
      humi: 50,
    }
  },

  beforeMount() {
    this.client?.end()
  },

  methods: {
    doConnect() {
      console.log('conn')
      // mqtt 1883
      // ws, wss
      this.client = mqtt.connect('ws://localhost:8083')
      console.log('....')

      this.client.on('connect', () => {
        console.log('connected....')
        this.client.subscribe('demo/+')
        this.client.subscribe('test/+')
      })

      this.client.on('message', (topic, message) => {
        // message is Buffer
        console.log(topic, message.toString())
        let data = JSON.parse(message.toString())
        this.temp = data.temp
        this.humi = data.humi
        // topic==demo/01
        this.code = topic.split('/').pop()
      })
    },
  },
}
</script>

<style>
</style>
