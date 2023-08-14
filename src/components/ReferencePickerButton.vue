<template>
   <q-btn outline no-caps dense :color="color" class="q-px-sm" @click="$emit('select')">
      {{ value }}
    </q-btn>
</template>

<script>
export default {
  props: ['value', 'alternate'],
  computed: {
    color() {
      return this.alternate === 1 ? 'primary' : this.alternate === 2 ? 'accent' : ''
    }
  }
}
</script>

<style lang="sass">
.q-btn--outline .q-btn__wrapper:before
  border: 1px solid var(--q-color-border)
  color: var(--q-color-alternate) !important

</style>
