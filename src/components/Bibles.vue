/**
  Display a combo box with available bible translations.
 */
<template>
  <q-select dense outlined v-model="selected" :options="translations" option-label="title" emit-value
      popup-content-style="white-space: nowrap">
    <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
            <q-item-section avatar>
              <q-item-label>{{ scope.opt.symbol.toUpperCase() }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.title" />
            </q-item-section>
          </q-item>
        </template>
  </q-select>
</template>

<script>
import { mapAll } from 'src/store'

export default mapAll('bibles', {
  props: ['value'],
  emits: ['update:modelValue'],
  computed: {
    selected: {
      get() {
        const t = this.translations.find(t => t.title === this.value)
        const symbol = t.symbol.toUpperCase()
        return this.$q.screen.lt.md ? symbol : `${symbol}&nbsp;&nbsp;|&nbsp;&nbsp;${t.title}`
      },
      set(value) {
        // Inform the parent about the value change
        this.$emit('input', value.title)
      },
    },
  },
  methods: {
    title2(translation) {
      return translation.title
    }
  }
})
</script>
