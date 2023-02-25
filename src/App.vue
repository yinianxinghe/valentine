<template>
  <div id="app">
    <router-view />
    <audio src="./assets/告白气球.mp3" loop='true' autoplay="autoplay" ref="MusicPlay" muted hidden></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  border: none;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  overflow: hidden;
}
</style>
