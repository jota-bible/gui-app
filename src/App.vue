<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$q.notify.setDefaults({ timeout: 1000 })
    const lastRoute = this.$store.state.settings.lastRoute
    if (lastRoute && !window.location.search) {
      this.$router.push(lastRoute)
    }
  },
  watch: {
    $route(to, from) {
      // Allows to reopen the last page, e.g. Reading Plan in PWA mode
      this.$store.commit('settings/lastRoute', to.path)
    },
  },
}
</script>

<style>
#q-app > div {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>
