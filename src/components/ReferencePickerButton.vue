<template>
   <q-btn outline no-caps dense class="q-px-sm" @click="$emit('select')">
      {{ value }}
    </q-btn>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style lang="sass">
.q-btn--outline .q-btn__wrapper:before
  border: 1px solid var(--q-color-border)

</style>
