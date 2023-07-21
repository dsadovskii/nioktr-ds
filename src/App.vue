<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style lang="scss">
@import 'assets/scss/main';
@import 'assets/scss/indents';
#app {
  padding: 100px;
}
</style>
