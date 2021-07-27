/**
  Display a combo box with available bible translations.
 */
<template>
  <q-select dense outlined v-model="selected" :options="titles" popup-content-style="white-space: nowrap" />
</template>

<script>
import { mapAll } from 'src/store'

export default mapAll('bibles', {
  name: 'Bibles',
  props: ['value'],
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(value) {
        // Inform the parent about the value change
        this.$emit('input', value)
      },
    },
  },
})
</script>
