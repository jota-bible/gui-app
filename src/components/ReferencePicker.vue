<template>
  <div id="reference-picker" class="q-mb-md">
    <div class="info row q-my-sm items-center">
      <span class="text-accent">{{ message }}</span>

      <span v-if="isBookSelected" class="bold q-mr-lg">{{ passageName }}</span>

      <q-btn
        outline
        dense
        text-color="primary"
        class="q-ml-sm"
        icon="icon-mat-undo"
        v-show="isBookSelected"
        @click="back"
      >
        <q-tooltip>Przejdź do wybierania {{ backTooltip }}</q-tooltip>
      </q-btn>

      <q-btn
        outline
        dense
        text-color="primary"
        icon="icon-mat-done"
        v-show="isBookSelected && !isVerseSelected"
        @click="finish"
      >
        <q-tooltip>Zakończ wybieranie fragmentu</q-tooltip>
      </q-btn>
    </div>

    <div v-if="bookIndex === -1" id="reference-picker-books" class="col q-mt-sm">
      <!-- <div class="row q-mb-sm text-h6">Stary testament</div> -->
      <div class="row selectors">
        <ReferencePickerButton v-for="(book, i) in oldTestament" :key="i" :value="book" @select="selectBook(i)"/>
      </div>
      <!-- <div class="row q-mt-sm text-h6">Nowy testament</div> -->
      <div class="row selectors q-mt-md">
        <ReferencePickerButton v-for="(book, i) in newTestament" :key="i" :value="book" @select="selectBook(39+i)"/>
      </div>
    </div>

    <div v-if="!isChapterSelected && isBookSelected" id="reference-picker-chapters" class="col" >
      <div class="row selectors">
        <ReferencePickerButton v-for="chapter in chapters" :key="chapter" :value="chapter+1" @select="selectChapter(chapter)"/>
      </div>
    </div>

    <div v-if="isChapterSelected" id="reference-picker-verses" class="col" >
      <div class="row selectors">
        <ReferencePickerButton v-for="verse in verses" :key="verse" :value="verse+1" @select="selectVerse(verse)"/>
      </div>
    </div>
  </div>
</template>

<script>
import books from 'src/logic/books'
import ReferencePickerButton from 'src/components/ReferencePickerButton.vue'

// arrow_back, done, check_circle, checklist
export default {
  data() {
    return {
      bookIndex: -1,
      chapterIndex: -1,
      verseIndex: -1,
      keyListener: (event) => this.finish()
    }
  },
  components: { ReferencePickerButton },
  computed: {
    books() {
      return books.bookAbbreviations[this.$store.getters['bibles/lang']]
    },
    oldTestament() {
      return this.books.slice(0, 39)
    },
    newTestament() {
      return this.books.slice(39, 66)
    },
    chapters() {
      if (!this.isBookSelected) return []
      const n = this.$store.state.bibles.content[this.bookIndex].length
      return [...Array(n).keys()]
    },
    verses() {
      if (!this.isBookSelected || !this.isChapterSelected) return []
      const n = this.$store.state.bibles.content[this.bookIndex][this.chapterIndex].length
      return [...Array(n).keys()]
    },
    sep() {
      return this.$store.state.settings.separator
    },
    bookName() {
      return this.books[this.bookIndex]
    },
    backTooltip() {
      return this.isChapterSelected ? 'rozdziałów' : 'ksiąg'
    },
    isBookSelected() {
      return this.bookIndex !== -1
    },
    isChapterSelected() {
      return this.chapterIndex !== -1
    },
    isVerseSelected() {
      return this.verseIndex !== -1
    },
    passageName() {
      const book = this.bookName || ''
      const chapter = this.isChapterSelected ? ` ${this.chapterIndex + 1}` : ''
      const verse = this.isVerseSelected ? `${this.sep}${this.verseIndex + 1}` : ''
      return `${book}${chapter}${verse}`
    },
    message() {
      return !this.isBookSelected ? 'Wybierz księgę:' :
        !this.isChapterSelected ? 'Wybierz rozdział w księdze:' :
        'Wybierz werset w:'
    }
  },
  // watch: {

  // },
  methods: {
    selectBook(i) {
      this.bookIndex = i
    },
    selectChapter(i) {
      this.chapterIndex = i
    },
    selectVerse(i) {
      this.verseIndex = i
      this.finish()
    },
    back() {
      if (this.isChapterSelected) this.chapterIndex = -1
      else if (this.isBookSelected) this.bookIndex = -1
    },
    finish() {
      if (!this.isChapterSelected) this.chapterIndex = 0
      if (!this.isVerseSelected) this.verseIndex = 0
      this.$store.commit('search/chapterFragment', [this.bookIndex, this.chapterIndex, this.verseIndex, this.verseIndex])
      this.$store.commit('search/showPicker', false)
      this.bookIndex = -1
      this.chapterIndex = -1
      this.verseIndex = -1
    }
  }
}
</script>

<style lang="sass">
#reference-picker
  .info
    height: 32px
  .row
    gap: 8px;

</style>
