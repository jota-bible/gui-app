import jota from 'src/logic/jota'
import { translations } from 'src/logic/translations'

// This causes the local bibles to be included in the app.js
// .filter(m => {
//   try {
//     require(`../statics/data/${m.lang}/${m.symbol}.json`)
//     return true
//   } catch (e) {
//     return false
//   }
// })

const bibleLoading = [
  [
    ['Pobieranie...']
  ]
]

const state = {
  content: bibleLoading,
  loading: true,
  translations,
  translation: translations[0],
}

const getters = {
  lang: (state) => state.translation.lang,
  symbol: (state) => state.translation.symbol,
  title: (state) => state.translation.title,
}

const mutations = {
  content(state, payload) {
    state.content = payload
  },
  translation(state, translation) {
    state.translation = translation
  },
  loading(state, payload) {
    state.loading = payload
  }
}

const actions = {
  init(context) {
    const translation = translations.find(t => t.title === context.rootState.settings.defaultBible)
    return context.dispatch('select', translation)
  },

  async selectTitle(context, title) {
    const translation = translations.find(t => t.title === title)
    return context.dispatch('select', translation)
  },
  async select(context, translation) {
    context.commit('translation', translation)
    context.commit('loading', true)

    const {
      lang,
      symbol
    } = context.getters
    const bible = await jota.getBible(lang, symbol)
    context.commit('loading', false)
    Object.freeze(bible)
    context.commit('content', bible)
  },
}

export default { namespaced: true, getters, mutations, actions, state }
