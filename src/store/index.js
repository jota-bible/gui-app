import Vue from 'vue'
import Vuex, { mapMutations, mapActions } from 'vuex'

// Store modules
import bibles from './store-bibles'
import search from './store-search'
import settings from './store-settings'

Vue.use(Vuex)

const modules = {
  bibles,
  search,
  settings
}

const store = new Vuex.Store({
  modules,
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

/**
 * Initialize all modules
 */
Promise.all(Object.entries(modules)
  .map(([k, m]) => Object.keys(m.actions).includes('init') ?
    store.dispatch(k + '/init', null, {
      root: true
    }) : Promise.resolve()))

/**
 * Create mutation for each state field except those already defined
 */
export function defaultMutations(state, mutations) {
  mutations = mutations || {}
  const mutationKeys = Object.keys(mutations)
  Object.keys(state).forEach(k => {
    if (!mutationKeys.includes(k)) {
      mutations[k] = (state, payload) => {
        state[k] = payload
      }
    }
  })
  return mutations
}

/**
 * Automatically maps all of the given store module state, getters, mutations and actions
 * to be used inside of the given component.
 */
export function mapAll(module, component) {
  component.computed = component.computed || {}
  component.methods = component.methods || {}
  const prefix = module + '/'

  // State
  Object.keys(store.state[module]).map(k => {
    if (component.computed[k]) throw new Error(`Computed property '${k} is already defined`)
    component.computed[k] = {
      get() {
        return store.state[module][k]
      },
      set(value) {
        store.commit(module + '/' + k, value)
      }
    }
  })

  // Getters
  Object.keys(store.getters).filter(path => path.startsWith(prefix)).map(path => {
    const k = path.substr(prefix.length)
    if (component.computed[k]) throw new Error(`Computed property '${k} is already defined`)
    component.computed[k] = {
      get() {
        return store.getters[path]
      },
      set(value) {
        store.commit(path, value)
      }
    }
  })

  // Mutations
  Object.keys(store._mutations).filter(path => path.startsWith(prefix)).map(path => {
    const k = path.substr(prefix.length)
    if (component.methods[k]) throw new Error(`Method ${k} matching mutation '${path} is already defined`)
    // If there is no mutation included in the computed map
    if (!Object.keys(component.computed).includes(k)) {
      Object.assign(component.methods, mapMutations(module, [k]))
    }
  })

  // Actions
  Object.keys(store._actions).filter(path => path.startsWith(prefix)).map(path => {
    const k = path.substr(prefix.length)
    if (component.methods[k]) throw new Error(`Method ${k} matching action '${path} is already defined`)
    Object.assign(component.methods, mapActions(module, [k]))
  })

  return component
}

/*
 * If not building with SSR mode, you can
 * directly export the store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the store instance.
 */

export default function () {
  return store
}
