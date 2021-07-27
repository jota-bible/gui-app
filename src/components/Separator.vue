<template>
  <q-btn outline dense text-color="primary" style="width: 32px; height: 32px; font-weight: 900;" @click="toggle">
    {{ value }}
    <q-tooltip>Zmiana znaku oddzielającego rozdział od wersetu</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    toggle() {
      const newValue = this.value === ':' ? ',' : ':'
      this.$emit('input', newValue)
    },
  },
}
</script>

<style lang="sass">
.q-btn__wrapper:before
    border-color: $border
</style>
