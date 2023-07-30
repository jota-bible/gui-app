/** Top header on the screen */
<template>
  <q-header>
    <q-toolbar id="toolbar" inverted class="text-primary background q-pl-lg q-pt-sm">
      <q-toolbar-title> <span id="jota"></span> {{ pageTitle }} </q-toolbar-title>

      <!-- Show only on the main page -->
      <div class="row no-wrap items-center" v-if="isMainRoute">
        <span id="translation-label" class="text-secondary q-mr-sm"> Przekład: </span>
        <Bibles v-model="currentBible" class="q-pr-sm" />

        <!-- Reading plan -->
        <q-btn id="reading-plan" flat dense icon="icon-mat-playlist_add_check" to="/reading-plan">
          <q-tooltip> Plan czytania </q-tooltip>
        </q-btn>

        <!-- Help -->
        <q-btn
          id="help"
          flat
          dense
          icon="icon-mat-help"
          type="a"
          href="https://docs.google.com/document/d/1unCVgpMRlzlaRRXdxdDkmNyVxqG7honM49lSKS9TTnU"
          target="_blank"
        >
          <q-tooltip> Informacje o programie </q-tooltip>
        </q-btn>

        <!-- Settings -->
        <q-btn id="settings" flat dense icon="icon-mat-settings" to="/settings">
          <q-tooltip> Ustawienia </q-tooltip>
        </q-btn>

        <!-- Make a component to handle responsive toolbar -->
        <q-btn id="more" flat dense icon="more_vert">
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

      <!-- Come back button -->
      <span v-else>
        <q-btn flat to="/" class="print-hide"
          >Powrót
          <q-tooltip> Powrót do strony głównej </q-tooltip>
        </q-btn>
      </span>
    </q-toolbar>
  </q-header>
</template>

<script>
import Bibles from 'src/components/Bibles'
import { mapAll } from 'src/store'

export default mapAll('settings', {
  name: 'MainLayout',
  components: { Bibles },
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

#help
  margin-right: 2px

#more
  display: none

.q-layout
  display: flex

.q-toolbar__title
  font-size: 26px

// Header background the same as the rest
.q-layout__section--marginal
  background: transparent

// Make the toolbar responsive, the idea is to have as many buttons visible as possible
// then menu show only when not all the buttons are bisible
// Also element with lower priority like titles and lables to be hidden first
@media (max-width: 510px)
  .q-toolbar__title
    display: none
@media (max-width: 444px)
  #translation-label
    display: none
@media (max-width: 382px)
  #help, #settings
    display: none
  .q-toolbar__title
    flex: 0
    padding: 0
@media (max-width: 356px)
  #reading-plan
    display: none
@media (max-width: 382px)
  #more
    display: inline-flex
</style>
