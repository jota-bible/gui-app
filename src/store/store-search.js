import jota from 'src/logic/jota'
import { defaultMutations } from 'src/store'

const values = {
  abc: 1
}

const state = {
  chapter: [],
  chapterFragment: [0, 0],
  error: '',
  fragments: [],
  fragmentIndex: -1,
  input: '',
  layout: 'split',
  progress: 0.0,
  searchTermHighlightRegex: '',
  searchTerm: '',
  searchTermHighlightReplacement: '$1<span class="bold">$2</span>$3',
  separator: ':',
  shouldSort: false,
  words: true,
}

const getters = {
  books: (state, getters, rootState, rootGetters) => rootGetters['settings/books'],
  chapterAfter: state => jota.adjacentChapter(state.bible, state.chapterFragment, 1),
  chapterBefore: state => jota.adjacentChapter(state.bible, state.chapterFragment, -1),
  chapterCaption: (state, getters) => jota.chapterCaption(state.chapterFragment, getters.books),
  chapterVerses: (state, getters, rootState) => jota.chapterVerses(rootState.bibles.content, state.chapterFragment),
  formattedSelected: (state, getters, rootState, rootGetters) => {
    return rootGetters['settings/formatted'](state.chapterFragment, state.separator)
  },
  found: state => !!state.fragments.length,
  highlightSearchTerm: state => s => state.searchTermHighlightRegex ?
    s.replace(state.searchTermHighlightRegex, state.searchTermHighlightReplacement) : s,
  passages: (state, getters) =>
    state.fragments.map(osisRef => jota.formatReference(osisRef, getters.books, state.separator)),
}

const mutations = defaultMutations(state, {
  clearSearch(state) {
    state.input = ''
    state.searchTerm = ''
    state.fragments = []
    state.fragmentIndex = -1
    state.chapter = []
    state.chapterFragment = null
  },
  chapterVerses(state, {
    fragment,
    bible
  }) {
    state.chapter = jota.chapterVerses(bible, fragment)
    state.chapterFragment = fragment
  },
  error(state, payload) {
    state.error = payload
  },
  fragments(state, payload) {
    state.fragments = payload
    mutations.fragmentIndex(state, state.fragments.length ? 0 : -1)
  },
  fragmentIndex(state, payload) {
    state.fragmentIndex = payload
    mutations.chapterFragment(state, state.fragments[state.fragmentIndex])
  }
})

const actions = {
  async init(context) {
    context.commit('separator', context.rootState.settings.separator)
  },

  async adjacentChapter(context, direction) {
    const bible = context.rootState.bibles.content
    const fragment = context.state.chapterFragment
    const adjacent = jota.adjacentChapter(bible, fragment, direction)
    if (adjacent) {
      context.commit('chapterVerses', {
        fragment: adjacent,
        bible,
      })
    }
  },

  async findByInput(context, { input, options }) {
    await jota.bibleLoadingPromise
    const t0 = Date.now()
    const bible = context.rootState.bibles.content
    const translation = context.rootGetters['bibles/symbol']
    // Replace in order to avoid next line starting with a number
    const text = input.replace(/\n/g, '#')
    if (!text) {
      context.commit('clearSearch')
      return
    }
    context.commit('searchTerm', input)

    const beforeFragmentCount = context.state.fragments.length
    const progress = {
      step: value => {
        // instant-feedback win the widget does not work
        // context.commit('progress', value / bible.length)
      },
    }
    const { words, shouldSort } = context.state
    Object.assign(options, { words, shouldSort, translation })
    context.commit('progress', 0.1)
    context.commit('error', '')
    try {
      const fragments = Object.freeze(
        await jota.search(bible, text, options, progress))

      // Layout decision matrix
      // Fragments count | Previous fragment count | Current Layout | Default layout | Result layout
      // 0-1             |                         |                 |                | split
      // > 1             | < 2                     |                 | x              | x
      // > 1             | >= 2                    | x               |                | x
      const layout = fragments.length < 2 ? 'split' :
        beforeFragmentCount < 2 ? context.rootState.settings.defaultSearchResultLayout :
        context.state.layout
      context.commit('layout', layout)
      const searchReplacement = words && !text.startsWith('/') ? '$1<span class="bold">$2</span>$3' : '<span class="bold">$1</span>'
      context.commit('searchTermHighlightReplacement', searchReplacement)
      context.commit('searchTermHighlightRegex', jota.highlightRegex(progress.regex))
      context.commit('fragments', fragments)
      console.log(`Search took ${Date.now() - t0} ms`)
    } catch (ex) {
      context.commit('fragments', [])
      context.commit('error', 'Błąd: ' + ex.message)
      console.error(ex.message)
    } finally {
      context.commit('progress', 0)
    }
  },

  moveFragmentIndex(context, delta) {
    const index = context.state.fragmentIndex
    const shouldChange = delta > 0 ? index < context.state.fragments.length - delta : index >= -delta
    if (shouldChange) {
      context.dispatch('setFragmentIndex', index + delta)
    }
  },

  async sortAndDeduplicate(context) {
    context.commit('shouldSort', !context.state.shouldSort)
    if (context.state.shouldSort) {
      // Pass the slice to unfreeze the array to be sorted
      const fragments = await jota.sortAndDeduplicate(context.state.fragments.slice())
      context.commit('fragments', Object.freeze(fragments))
    }
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
  values,
}
