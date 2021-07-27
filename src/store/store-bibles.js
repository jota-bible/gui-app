import jota from 'src/logic/jota'

/**
 * List of all possible bible versions.
 * The list showing on the screen is filtered by the ones actually present in the static/data folder.
 * In the future user should be able to add/remove the translations.
 */
const meta = [{
    lang: 'pl',
    symbol: 'eib',
    title: 'Biblia Ewangeliczna (2016)'
  },
  {
    lang: 'pl',
    symbol: 'bt5',
    title: 'Biblia Tysiąclecia V (2000)'
  },
  {
    lang: 'pl',
    symbol: 'bw',
    title: 'Biblia Warszawska (brytyjka) (1975)'
  },
  {
    lang: 'pl',
    symbol: 'ubg',
    title: 'Uwspółcześniona Biblia Gdańska (2017)'
  },
  {
    lang: 'en',
    symbol: 'kjv',
    title: 'King James Version'
  },
  {
    lang: 'en',
    symbol: 'niv',
    title: 'New International Version'
  },
  {
    lang: 'en',
    symbol: 'nlt',
    title: 'New Living Translation'
  },
].filter(m => {
  try {
    require(`../statics/data/${m.lang}/${m.symbol}.json`)
    return true
  } catch (e) {
    return false
  }
})

const bibleLoading = [
  [
    ['Pobieranie...']
  ]
]

const state = {
  content: bibleLoading,
  current: meta[0].title,
  loading: true,
  items: meta
}

const getters = {
  currentMeta: state => state.items && state.items.find(it => it.title === state.current),
  lang: (state, getters) => getters.currentMeta.lang,
  symbol: (state, getters) => getters.currentMeta.symbol,
  titles: state => state.items && state.items.map(b => b.title),
}

const mutations = {
  content(state, payload) {
    state.content = payload
  },
  current(state, title) {
    state.current = title
  },
  loading(state, payload) {
    state.loading = payload
  }
}

const actions = {
  init(context) {
    return context.dispatch('select', context.rootState.settings.defaultBible)
  },

  async select(context, title) {
    context.commit('current', title)
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
