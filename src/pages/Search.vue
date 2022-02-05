<template>
  <div class="search-container">
    <q-page id="search" class="col q-px-lg q=pb-md justify-start items-start content-start">
      <q-input
        ref="input"
        v-model="input"
        placeholder="Podaj tekst zawierający odnośniki biblijne lub frazę do wyszukania w tekście przekładu"
        dense
        style="margin-top: 0"
        autofocus
        @keyup.enter="find(input)"
        @keyup.esc="input = ''"
      >
        <template v-slot:append>
          <q-icon
            v-if="input !== ''"
            name="icon-mat-close"
            @click="find('')"
            class="cursor-pointer"
            style="font-size: 0.8em"
          >
            <q-tooltip>Wyczyść kryteria i wyniki wyszukiwania</q-tooltip>
          </q-icon>

          <q-icon name="icon-mat-search" @click="find(input)" class="cursor-pointer">
            <q-tooltip>Szukaj</q-tooltip>
          </q-icon>
        </template>

        <template v-slot:after>
          <!-- Search whole words or partial -->
          <q-btn
            dense
            flat
            icon="icon-mdi-arrow-expand-horizontal"
            @click="words = !words"
            :text-color="words ? 'primary' : 'disabled'"
          >
            <q-tooltip>{{ wordsTooltip }}</q-tooltip>
          </q-btn>
        </template>
      </q-input>

      <!-- Message line -->
      <div id="message" class="q-my-sm">
        <q-circular-progress
          ref="progress"
          v-show="progress > 0"
          color="primary"
          track-color="grey-4"
          size="sm"
          indeterminate
        />
        <span v-if="progress > 0">Szukam...</span>
        <span v-else-if="passages.length > 1">
          Znaleziono fragmentów:
          <span style="font-weight: bold">{{ passages.length }}</span>

          <q-btn outline dense class="q-mx-sm" icon="icon-mdi-content-copy" @click="copyFound">
            <q-tooltip>Kopiuj znalezione wersety do schowka</q-tooltip>
          </q-btn>

          <q-btn
            outline
            dense
            icon="icon-mat-vertical_split"
            text-color="primary"
            @click="layout = 'split'"
            v-show="layout === 'formatted'"
          >
            <q-tooltip>Włącz nawigację</q-tooltip>
          </q-btn>

          <q-btn
            outline
            dense
            icon="icon-mat-view_agenda"
            text-color="primary"
            @click="layout = 'formatted'"
            v-show="layout === 'split'"
          >
            <q-tooltip>Zmień układ na sformatowany do wydruku</q-tooltip>
          </q-btn>

          <q-btn
            outline
            dense
            class="q-mx-sm"
            icon="icon-la-sort-numeric-down"
            @click="sortAndDeduplicate"
            :text-color="shouldSort ? 'primary' : 'disabled'"
          >
            <q-tooltip>{{ shouldSortTooltip }}</q-tooltip>
          </q-btn>
        </span>

        <span v-else-if="error">{{ error }}</span>

        <span
          v-else-if="passages.length === 0 && !chapterFragment && searchTerm !== ''"
        >Nic takiego nie znaleziono :-(</span>

        <!-- Passage displayed -->
        <span v-if="layout === 'split'">
          <span v-if="chapterFragment">
            <span id="chapter-label" class="q-mr-sm">Wyświetlany rozdział:</span>
            <span class="bold q-mr-xs">{{ chapterCaption }}</span>
          </span>

          <q-btn-group v-if="chapterFragment" outline class="q-ml-sm">
            <!-- Previous chapter -->
            <q-btn
              outline
              dense
              text-color="primary"
              icon="icon-mat-navigate_before"
              @click="adjacentChapter(-1)"
            >
              <q-tooltip>Poprzedni rozdział</q-tooltip>
            </q-btn>
            <!-- Next chapter -->
            <q-btn
              outline
              dense
              text-color="primary"
              icon="icon-mat-navigate_next"
              @click="adjacentChapter(1)"
            >
              <q-tooltip>Następny rozdział</q-tooltip>
            </q-btn>
          </q-btn-group>

          <q-btn
            outline
            dense
            text-color="primary"
            class="q-ml-sm"
            icon="icon-mdi-content-copy"
            @click="copySelected"
            v-show="chapterFragment && !isNaN(chapterFragment[2])"
          >
            <q-tooltip>Kopiuj zaznaczone wersety do schowka</q-tooltip>
          </q-btn>

          <q-btn
            id="player"
            v-show="chapterFragment"
            outline
            dense
            text-color="primary"
            class="q-ml-sm"
            icon="icon-mat-volume_up"
            @click="playAudio"
          >
            <q-tooltip>Odtwórz rodział w wersji audio</q-tooltip>
          </q-btn>
        </span>
      </div>
      <!-- End of message line -->

      <audio controls id="audio-player" n="1" v-show="audioOn">
        <source :src="audioSource" type="audio/mpeg" />Twoja przeglądarka nie obsługuje słuchania audio :/
      </audio>

      <div v-show="loading">
        <q-circular-progress indeterminate size="30px" color="accent" class="q-my-md q-mr-md" />
        <span>Pobieranie treści przekładu ...</span>
      </div>

      <div id="content" class="q-pb-md" v-show="!loading">
        <div class="row" v-if="layout === 'split'">
          <!-- List of passages -->
          <div id="passages" v-if="passages.length > 1" class="col bottom-clipped q-list">
            <div
              v-for="(item, index) in passages"
              :key="index"
              clickable
              tabindex="0"
              @click="highlightPassage(index)"
              @keyup.prevent.stop.left="highlightPassage(fragmentIndex - 1)"
              @keyup.prevent.stop.right="highlightPassage(fragmentIndex + 1)"
              class="q-item q-item-type row no-wrap compact q-item--clickable q-link cursor-pointer"
            >{{ item }}</div>
          </div>

          <q-list id="chapter" class="col bottom-clipped full-width" v-if="chapterVerses.length">
            <q-item
              v-for="(s, i) in chapterVerses"
              :key="i"
              :class="verseClass(i)"
              class="compact"
              tabindex="0"
              @keyup.left="focusChapterVerse(i - 1)"
              @keyup.right="focusChapterVerse(i + 1)"
            >
              <q-item-section class="reference text-secondary">{{ i + 1 }}</q-item-section>
              <q-item-section class="verse" v-html="highlightSearchTerm(s)"></q-item-section>
            </q-item>
          </q-list>
        </div>

        <div id="formatted" class="row q-pb-md" v-if="layout === 'formatted'">
          <div v-for="(item, i) in formattedSearchResults()" v-bind:key="i" class="formatted-verse">
            <span class="bref" @click="readInContext(i)">{{ item.bref }} {{ item.symbol }}</span>
            <span v-html="item.content" />
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { colors } from 'quasar'
import Header from 'src/components/Header'
import { mapAll } from 'src/store'
import jota from 'src/logic/jota'
import { copyTextToClipboard } from 'src/logic/util'
import { audioSource } from 'src/logic/audio'

const definition = mapAll('search', {
  name: 'Search',
  components: { Header },
  data: () => {
    return {
      audioOn: false,
      colors: {
        primary: colors.getPaletteColor('primary'),
        disabled: 'rgba(0, 0, 0, 0.54)',
      },
      globalListeners: [],
      mouseIsDown: false,
      scrollToSelection: true,
      selectionStart: -1,
      selectionEnd: -1,
    }
  },
  computed: {
    audioPlayer() {
      return document.getElementById('audio-player')
    },
    audioSource() {
      return audioSource(this.chapterFragment)
    },
    loading() {
      return this.$store.state.bibles.loading
    },
    shouldSortTooltip() {
      return (this.shouldSort ? 'Wy' : 'W') + 'łącz sortowanie i usuwanie duplicatów wśród wyszukanych fragmentów'
    },
    wordsTooltip() {
      return (this.words ? 'Wy' : 'W') + 'łącz wyszukiwanie całych słów'
    },
    wordsColor() {
      return this.words ? 'primary' : 'red'
    },
  },
  watch: {
    chapterFragment() {
      if (this.scrollToSelection) {
        const chapter = document.getElementById('chapter')
        if (chapter) chapter.scrollTop = 0
        if (this.audioOn) {
          this.audioPlayer.load()
          this.audioPlayer.play()
        }
      }
      this.scrollToSelection = true
    },
    fragmentIndex(index, previousIndex) {
      // Scroll to show current fragment index verses in the view port
      // Must run after chapter is rendered
      this.$nextTick().then(() => this.highlightPassage(index, previousIndex))
    },
    layout(value) {
      if (value === 'split') {
        if (this.fragmentIndex < 0 || this.fragmentIndex >= this.fragments.length) {
          this.$nextTick().then(() => this.highlightPassage(0))
        }
        document.body.style.overflowY = 'hidden'
      } else {
        document.body.style.overflowY = 'auto'
      }
    },
    passages(value) {
      this.highlightPassage(value.length ? 0 : -1)
    },
    searchTerm() {
      this.$refs.input.focus()
    },
  },

  mounted() {
    const listener1 = event => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'c':
            if (!window.getSelection().toString()) {
              this.copySelected()
            }
            break
          case 'ArrowLeft':
            this.adjacentChapter(-1)
            break
          case 'ArrowRight':
            this.adjacentChapter(1)
            break
        }
      }
    }
    window.addEventListener('keydown', listener1)
    this.globalListeners.push(['keydown', listener1])

    const listener2 = () => {
      const sel = document.getSelection()
      const node1 = sel.baseNode.parentElement.closest('#chapter .q-item')
      const node2 = sel.extentNode.parentElement.closest('#chapter .q-item')
      if (node1) {
        const siblings = Array.from(node1.parentElement.children)
        const index1 = siblings.indexOf(node1)
        const index2 = siblings.indexOf(node2)

        this.scrollToSelection = false
        const [book, chapter] = this.chapterFragment
        if (index1 < index2) {
          this.chapterFragment = [book, chapter, index1, index2]
        } else {
          this.chapterFragment = [book, chapter, index2, index1]
        }
      }
    }
    document.addEventListener('selectionchange', listener2)
    this.globalListeners.push(['selectionchange', listener2])

    const events = [('orientationchange', 'resize')]
    events.forEach(eventType => {
      const listener = window.addEventListener(eventType, this.updateSizes)
      this.globalListeners.push([eventType, listener])
    })

    if (this.$route.query.q) {
      this.input = this.$route.query.q
    }

    if (this.input) {
      this.find(this.input, this.$route.query || {}).then(() => this.$store.commit('search/layout', 'split'))
    }

    this.updateSizes()
  },

  destroyed() {
    this.removeListeners()
    document.body.style.overflowY = 'auto'
  },

  methods: {
    copyFound(e) {
      // const prevLayout = this.$store.state.search.layout
      // this.$store.commit('search/layout', 'formatted')
      // this.$nextTick(() => {
      //   copyTextToClipboard(document.getElementById('formatted').innerText.replace(/\n/gm, '\n\n'))
      //   this.$store.commit('search/layout', prevLayout)
      //   this.$q.notify({ message: 'Skopiowano znalezione fragmenty do schowka', group: false })
      // })

      const prevLayout = this.$store.state.search.layout
      if (e.metaKey || e.ctrlKey) {
        this.$store.commit('search/layout', 'split')
        this.$nextTick(() => {
          copyTextToClipboard(
            Array.from(document.querySelectorAll('#passages > div')).map(e => e.innerText).join('; '))
          this.$store.commit('search/layout', prevLayout)
          this.$q.notify({ message: 'Skopiowano znalezione fragmenty do schowka', group: false })
        })
      } else {
        this.$nextTick(() => {
          // const text = document.getElementById('formatted').innerText.replace(/\n/gm, '\n\n')
          const text = this.fragments.map(fragment =>
            this.$store.getters['settings/formatted'](fragment, this.separator)).join('\n\n')
          copyTextToClipboard(text)
          this.$q.notify({ message: 'Skopiowano znalezione fragmenty do schowka', group: false })
        })
      }
    },

    copySelected() {
      if (this.formattedSelected.length) {
        copyTextToClipboard(this.formattedSelected)
        this.$q.notify({ message: 'Skopiowano zaznaczone wersety do schowka', group: false })
      }
    },

    find(input, opt) {
      const options = opt || {}
      return this.findByInput({ input, options })
    },

    focusChapterVerse(i) {
      if (i >= 0 && i < this.chapterVerses.length) {
        const [book, chapter] = this.chapterFragment
        this.chapterFragment = [book, chapter, i, i]
        document.querySelector(`#chapter > div:nth-child(${i + 1})`).focus()
      }
    },

    formattedSearchResults() {
      return this.fragments.map(fragment => {
        const bref = jota.formatReference(fragment, this.$store.getters['settings/books'], this.separator)
        const symbol = this.$store.getters['bibles/symbol'].toUpperCase()
        const content = ' "' + this.highlightSearchTerm(
          jota.verses(this.$store.state.bibles.content, fragment).join('\n') + '"'
        )
        return { bref, symbol, content }
      })
    },

    highlightPassage(i, previousIndex) {
      const parent = document.getElementById('passages')
      if (previousIndex === undefined) previousIndex = this.fragmentIndex
      if (parent) {
        const next = parent.querySelector(`div:nth-child(${i + 1})`)
        if (next) {
          const previous = parent.querySelector(`div:nth-child(${previousIndex + 1})`)
          if (previous) previous.classList.remove('highlight')
          next.classList.add('highlight')
          next.focus()
          this.fragmentIndex = i
        }
      }
      this.scrollToChapterFragment()
    },

    playAudio() {
      this.audioOn = !this.audioOn
      if (this.audioOn) {
        this.audioPlayer.load()
        this.audioPlayer.play()
      } else {
        this.audioPlayer.pause()
      }
    },

    // readInContext(i) {

    // },

    removeListeners() {
      this.globalListeners.forEach(([eventType, listener]) => {
        // window.removeEventListener(eventType, listener)
        document.removeEventListener(eventType, listener)
      })
      this.globalListeners = []
    },

    scrollToChapterFragment() {
      // Scroll to show selected verses in the middle of the view port
      // Must run after chapter is rendered
      this.$nextTick().then(() => {
        const el = document.getElementById('chapter')
        if (!el) return
        const parentOffset = el.getBoundingClientRect().top
        const [, , start, end] = this.chapterFragment
        if (isNaN(start)) return
        const top = getBounds(start).top - parentOffset
        const bottom = getBounds(end).bottom - parentOffset
        const fragmentHeight = bottom - top
        const diff = el.offsetHeight - fragmentHeight
        if (diff > 0) {
          el.scrollTop += top - diff / 2
        } else {
          el.scrollTop += top
        }

        function getBounds(verseIndex) {
          const verse = el.querySelector(`.q-item:nth-child(${verseIndex + 1})`)
          return verse ? verse.getBoundingClientRect() : { bottom: 0, top: 0 }
        }
      })
    },

    // selectVerses() {
    //   this.scrollToSelection = false
    //   const [book, chapter] = this.chapterFragment
    //   if (this.selectionStart <= this.selectionEnd) {
    //     this.chapterFragment = [book, chapter, this.selectionStart, this.selectionEnd]
    //   } else {
    //     this.chapterFragment = [book, chapter, this.selectionEnd, this.selectionStart]
    //   }
    // },

    selectVerses(i) {
      this.scrollToSelection = false
      const [book, chapter, start, end] = this.chapterFragment
      if (i <= start) {
        this.chapterFragment = [book, chapter, i, end]
      } else {
        this.chapterFragment = [book, chapter, start, i]
      }
    },

    updateSizes() {
      this.$nextTick(() => {
        setTimeout(() => {
          // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
          // Then we set the value in the --vh custom property to the root of the document
          document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
          console.log(`updateSizes window.innerHeight: ${window.innerHeight}`)
        }, 1000)
      })
    },

    verseClass(i) {
      const [, , start, end] = this.chapterFragment
      return {
        'selection-single': i === start && i === end,
        'selection-start': i === start && i !== end,
        'selection-end': i === end && i !== start,
        'selection-middle': start < i && i < end,
      }
    },
  },
})

export default definition
</script>

<style lang="sass">

.q-page-container
  width: 100%
.search-container
  display: flex

main#search
  height: calc(var(--vh, 1vh) * 100 - 50px)
  display: flex
  flex-direction: column

  .q-input
    width: 100%

  .compact
    padding: 1px 8px 0 0
    min-height: 24px

  .formatted-verse
    padding-top: 4px
    padding-bottom: 4px
    width: 100%

    span:nth-child(1)
      margin-right: 8px
      cursor: pointer

  .passage-margin
    height: 4px

#content
  // padding-bottom: 80px
  display: flex
  flex-direction: column
  overflow: auto
  width: 100%

  .row
    display: flex
    flex-direction: row
    flex-grow: 1
    max-height: 100%
    overflow: auto

  .bottom-clipped
    min-height: 0
    overflow: auto
    height: 100%

#chapter
  padding-right: 4px
  > div
    outline: none

  .q-item
    padding-top: 2px

  .reference
    max-width: 2em
    justify-content: start
    text-align: center

  .verse
    justify-content: start

  .selection-single
    box-shadow: inset 1px 1px var(--q-color-primary), inset -1px -1px var(--q-color-primary)
  .selection-start
    box-shadow: inset 1px 1px var(--q-color-primary), inset -1px 1px var(--q-color-primary)
  .selection-middle
    box-shadow: inset 1px 0 var(--q-color-primary), inset -1px 0 var(--q-color-primary)
  .selection-end
    box-shadow: inset 1px -1px var(--q-color-primary), inset -1px -1px var(--q-color-primary)
  .verse
    margin-left: 4px

#message
  > button,
  > span,
  > div
    margin-right: 8px

  .q-btn__wrapper:before
    border-color: $border

#message
  .q-btn__wrapper:before
    border-color: var(--q-color-border)

#passages
  flex: 0 0 auto
  padding-right: 4px
  margin-right: 4px
  border-right: var(--q-color-border) solid 1px

  .compact
    line-height: 24px
    padding: 0 8px !important
    width: 100%
    white-space: nowrap

  .compact:hover
    background-color: rgba(0,0,0,0.1)

  .highlight
    box-shadow: inset 1px 1px var(--q-color-primary), inset -1px -1px var(--q-color-primary)

@media (max-width: 375px)
  #chapter-label
    display: none
</style>
