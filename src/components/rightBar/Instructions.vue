<template>
  <q-card class="rcl-card q-mb-md">
    <q-card-section>
      <div class="text-h6">{{ t('instructionsTitle') }}</div>
      <ol>
        <li>{{ t('instruction1') }}</li>
        <li>{{ t('instruction2') }}</li>
        <li>{{ t('instruction3') }}</li>
        <li>{{ t('instruction4') }}</li>
        <li>{{ t('instruction5') }}</li>
        <li>{{ t('instruction6') }}</li>
      </ol>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Instructions',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    // Something todo ..

    return { t }
  }
})
</script>

<i18n>
{
  "it": {
    "instructionsTitle": "Istruzioni",
    "instruction1": "Verifica la dimensione del piano (default 15x15 ml)",
    "instruction2": "Seleziona la linea, l'altezza, e la finitura/colore",
    "instruction3": "Disegna la tua fioriera",
    "instruction4": "Per le finiture Plastica+Metallo, Plastica+Pietra Ricostruita (Newlight) seleziona il tasto che compare e indica le lastre a vista",
    "instruction5": "Calcola il preventivo",
    "instruction6": "Terminato il disegno, clicca \"inserisci le misure finali esterne\"",
  }
}
</i18n>