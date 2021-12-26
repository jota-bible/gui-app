<template>
  <q-page class="col q-px-lg justify-start items-start content-start">
    <div class="row">
      <div class="col">
        <div class="row items-center">
          <span class="label">Domyślny przekład:</span>
          <Bibles v-model="defaultBible" />
        </div>

        <div class="row items-center q-mt-sm">
          <span class="label">Domyślny separator:</span>
          <q-btn
            outline
            dense
            text-color="primary"
            style="width: 32px; height: 32px; font-weight: 900;"
            @click="toggleSeparator"
          >
            {{ separator }}
            <q-tooltip>Zmiana znaku oddzielającego rozdział od wersetu</q-tooltip>
          </q-btn>
        </div>
      </div>

      <div class="col">
        <div class="row items-center">
          <span class="q-mr-sm">Domyślny układ wyników wyszukiwania:</span>
          <q-select
            dense
            outlined
            v-model="defaultSearchResultLayout"
            :options="layouts"
            emit-value
            map-options
          ></q-select>
        </div>
      </div>
    </div>

    <div class="row items-center">
      <span class="label">Skrótowe nazwy ksiąg:</span>
      <div class="col">
        <q-input dense v-model="bookNames" autogrow />
      </div>
    </div>

    <div class="row items-center">
      <span class="label">Tryb ciemny:</span>
      <q-toggle v-model="darkMode" />
    </div>

    <div id="format" class="row items-center q-pt-md">
      <div class="col col-grow">
        <span>Format fragmentu w zależności od ilości wersetów, podaj dolną granicę przedziału.</span>
        <div class="row items-center">
          <q-input dense class="threshold" type="number" v-model.number="threshold1" />
          <q-input dense class="format" v-model="format1" @focus="example = 1" />
        </div>
        <div class="row items-center">
          <q-input dense class="threshold" type="number" v-model.number="threshold2" />
          <q-input dense class="format" v-model="format2" @focus="example = 2" />
        </div>
        <div class="row items-center">
          <q-input dense class="threshold" type="number" v-model.number="threshold3" />
          <q-input dense class="format" v-model="format3" @focus="example = 3" />
        </div>
      </div>

      <div class="col q-pl-md">
        Znaczniki:
        <br />
        ${book} - nazwa księgi
        <br />
        ${chapter} - numer rozdziału
        <br />
        ${separator} - znak oddzielający numer rozdział od numeru wersetu
        <br />
        ${start} - początkowy werset
        <br />
        ${end} - końcowy werset
        <br />
        ${text} - tekst bez numerów wersetów
        <br />
        ${textWithNumbers} - tekst z numerami wersetów
        <br />
        ${textWithNewLines} - tekst z numerami wersetów i każdy od nowej linii
        <br />
        ${translation} - symbol przekładu
        <br />
        ${translationUpperCase} - symbol przekładu dużymi literami
        <br />
      </div>
    </div>

    <div class="q-mt-md" v-if="formattedExample">
      <div>Przykład formatowania Rodz 1 dla formuły nr {{ example }}:</div>
      <div v-html="formattedExample" class="text-primary"></div>
    </div>
  </q-page>
</template>

<script>
import Bibles from 'src/components/Bibles'
import { mapAll } from 'src/store'

export default mapAll('settings', {
  components: { Bibles },
  data() {
    return {
      layouts: [
        { label: 'Sformatowany', value: 'formatted' },
        { label: 'Nawigacja', value: 'split' },
      ],
    }
  },
  methods: {
    toggleSeparator() {
      const newValue = this.separator === ':' ? ',' : ':'
      this.separator = newValue
    },
  },
})
</script>

<style lang="sass">
#format
  border-top: 1px solid var(--q-color-primary)

.label
  width: 12em

.threshold
  width: 3em

.format
  width: 40em
  margin-left: 8px

.q-page > .row
  margin-top: 8px
</style>
