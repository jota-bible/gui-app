/** Top header on the screen */
<template>
  <q-header>
    <q-toolbar id="toolbar" v-if="isMainRoute" inverted class="text-primary background q-pl-lg q-pt-sm gt-sm">
      <q-toolbar-title class="gt-sm"> {{ pageTitle }} </q-toolbar-title>

      <!-- Show only on the main page -->
      <div class="row no-wrap items-center" >
        <span id="translation-label" class="text-secondary q-mr-sm"> Przekład: </span>
        <Bibles v-model="currentBible" class="q-pr-sm" />

        <ButtonReadingPlan />
        <ButtonHelp />
        <ButtonSettings />

        <!-- Make a component to handle responsive toolbar -->
        <q-btn id="more" flat dense icon="icon-mat-more_vert">
          <q-menu auto-close :offset="[110, 0]">
            <q-list id="toolbar-menu">
              <q-item clickable to="/reading-plan">
                <q-item-section> Plan czytania </q-item-section>
              </q-item>
              <q-item clickable @click="help">
                <q-item-section> Informacje o programie </q-item-section>
              </q-item>
              <q-item clickable to="/settings">
                <q-item-section> Ustawienia </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
    <div class="lt-md" style="height: 8px"/>

    <q-toolbar v-if="!isMainRoute">
      <!-- Come back button -->
      <q-btn flat icon="icon-mat-arrow_back_ios" to="/" class="print-hide">
        <q-tooltip> Powrót do strony głównej </q-tooltip>
      </q-btn>
      <q-toolbar-title class="text-primary"> {{ pageTitle }} </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
import Bibles from 'src/components/Bibles'
import ButtonHelp from 'src/components/ButtonHelp'
import ButtonReadingPlan from 'src/components/ButtonReadingPlan'
import ButtonSettings from 'src/components/ButtonSettings'
import { mapAll } from 'src/store'

export default mapAll('settings', {
  name: 'MainLayout',
  components: { Bibles, ButtonHelp, ButtonReadingPlan, ButtonSettings },
  computed: {
    currentBible: {
      get() {
        return this.$store.getters['bibles/title']
      },
      set(title) {
        this.$store.dispatch('bibles/selectTitle', title)
      },
    },
    isMainRoute() {
      return this.$route.path === '/'
    },
    pageTitle() {
      const title = this.$route.meta.title
      const prefix = 'Jota' + (title ? ' - ' : '')
      return prefix + (title || '')
    },
  },
  methods: {
    help() {
      window.open('https://docs.google.com/document/d/1unCVgpMRlzlaRRXdxdDkmNyVxqG7honM49lSKS9TTnU/edit?usp=sharing')
    },
  },
})
</script>

<style lang="sass">
#toolbar
  padding-right: 24px

#toolbar-menu
  min-width: 150px
  padding-left: 16px

#more
  display: none

.q-layout
  display: flex

.q-toolbar__title
  font-size: 26px

// Header background the same as the rest
.q-layout__section--marginal
  background: transparent

</style>
