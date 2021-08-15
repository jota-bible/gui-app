import { Dark, colors } from 'quasar'
import books from 'src/logic/books'
import jota from 'src/logic/jota'

const localStorageKey = 'com.github.jota-bible.jota-app/settings'
const data = JSON.parse(localStorage.getItem(localStorageKey))

export const defaultState = {
  bookNames: books.bookAbbreviations.join(', '),
  darkMode: true,
  defaultBible: 'Uwspółcześniona Biblia Gdańska (2017)',
  defaultFormat: '',
  defaultSearchResultLayout: 'formatted',
  example: 1,
  format1: '${book} ${chapter}${separator}${start} "${text}"',
  format2: '${book} ${chapter}${separator}${start}-${end} "${textWithNumbers}"',
  format3: '${book} ${chapter}${separator}${start}-${end} ${textWithNewLines}',
  lastRoute: '',
  plan: '',
  planStartDate: '',
  planProgress: 0,
  separator: ',',
  threshold1: 1,
  threshold2: 2,
  threshold3: 10,
}

const state = {
  ...defaultState,
  ...data,
}

const getters = {
  books: state => state.bookNames.split(',').map(s => s.trim()),
  thresholdFormats: state => {
    return [1, 2, 3].map(i => {
      const templateKey = 'format' + i
      let template
      try {
        template = state[templateKey]
      } catch {
        template = defaultState[templateKey]
      }
      return {
        threshold: state['threshold' + i] || 1000,
        format: template
      }
    })
  },
  formatted: (state, getters, rootState, rootGetters) => (fragment, separator) => {
    return jota.formatThreshold(getters.thresholdFormats, fragment, rootState.bibles.content,
      state.bookNames.split(', '), separator, rootGetters['bibles/symbol'])
  },
  formattedExample: (state, getters, rootState, rootGetters) => {
    let result = ''
    try {
      result = format(state, rootState, rootGetters, state.example)
    } catch (e) {
      result = 'Błąd w formule: ' + e
    }
    return result
  },
}

function format(state, rootState, rootGetters, example) {
  const fragment =
    example === 1 ? [0, 0, 0, last(state.threshold1) - 1] :
    example === 2 ? [0, 0, 0, last(state.threshold2) - 1] : [0, 0, 0, last(state.threshold2) - 1]
  return jota.format(
    rootState.bibles.content,
    fragment,
    state['format' + example],
    state.bookNames.split(', '),
    state.separator,
    rootGetters['bibles/symbol']).replace(/\n/g, '<br>')

  function last(n) {
    return n === undefined ? 10 : n
  }
}

const mutations = {}
Object.keys(state).forEach(k => {
  mutations[k] = (state, payload) => {
    state[k] = payload
    saveToLocalStorage()
  }
})
mutations.darkMode = (state, value) => {
  state.darkMode = value
  Dark.set(value)
  saveToLocalStorage()
  applyDarkMode()
}

const actions = {
  init(context) {
    if (context.state.darkMode !== undefined) {
      context.commit('darkMode', context.state.darkMode)
    }
  },
  save(context, payload) {
    context.commit('mutate', payload)
    saveToLocalStorage()
  }
}

function saveToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(state))
}

function applyDarkMode() {
  if (Dark.isActive) {
    const primary = '#3b88d4'
    const foreground = '#bcc5cf'
    const background = '#252525'
    colors.setBrand('primary', primary)
    colors.setBrand('foreground', foreground)
    colors.setBrand('background', background)
    colors.setBrand('selection', primary)
    colors.setBrand('border', colors.lighten(background, 20))
    colors.setBrand('scrollbar-thumb', colors.lighten(background, 10))
    colors.setBrand('scrollbar-thumb-hover', colors.lighten(background, 20))
  } else {
    const primary = '#1976D2'
    const foreground = '#000000'
    const background = '#ffffff'
    colors.setBrand('primary', primary)
    colors.setBrand('foreground', foreground)
    colors.setBrand('background', background)
    colors.setBrand('selection', colors.lighten(primary, 70))
    colors.setBrand('border', colors.lighten(background, -20))
    colors.setBrand('scrollbar-thumb', colors.lighten(background, -15))
    colors.setBrand('scrollbar-thumb-hover', colors.lighten(background, -30))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
