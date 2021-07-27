<template>
  <q-layout>
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'src/components/Header'
export default {
  components: { Header },
}
</script>
