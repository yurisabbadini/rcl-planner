<template>
  <q-card class="rcl-card q-mb-md">
    <q-card-section>
        <div class="text-h6">{{ t('planSettingsTitle') }}</div>
        <div class="row">
            <div class="col" style="max-width: 85px">
                <q-input type="number" v-model.number="data.sizeV" outlined dense input-class="text-center"/>
            </div>
            <div class="col text-center" style="max-width: 25px;line-height: 40px;">
                x
            </div>
            <div class="col" style="max-width: 85px">
                <q-input type="number" v-model.number="data.sizeH" outlined dense input-class="text-center"/>
            </div>
            <div class="col q-ml-xs" style="max-width: 45px;line-height: 40px;">
                ml
            </div>
            <div class="col" style="max-width: 45px;line-height: 40px;">
               <q-btn round color="primary" icon="check" size="sm" @click="save"/>
            </div>
            <div class="col text-right">
                <div class="row">
                    <div class="col"><q-btn flat color="warning" :label="t('clearDraw')" size="sm" @click="clearDraw"/></div>
                </div>
                <div class="row">
                    <div class="col"><q-btn flat color="negative" :label="t('reset')" size="sm" @click="reset"/></div>
                </div>
            </div>
        </div>
        <span class="text-caption">{{ t('instruction') }}</span><br />
        <span class="text-caption">{{ t('rows') }}: <strong>{{ data.rows }}</strong> - {{ t('columns') }}: <strong>{{ data.columns }}</strong></span>
        <span class="text-caption"></span>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PlanSettings',
  emits: ["dataChanged", "clearDraw"],
  data () {
      return {
          data: {
            sizeH: 15,
            sizeV: 15,
            rows: 30,
            columns: 30,
        }
      }
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    });

    return { 
        t
    };
  },
  watch: {
    data: {
      handler: function (newVal) {
        this.data.columns = newVal.sizeH * 2; 
        this.data.rows = newVal.sizeV * 2; 
      },
      deep: true
    }
  },
  methods: {
      save() {
        this.$emit("dataChanged", this.data);
      },
      clearDraw() {
        this.$emit("clearDraw", this.data);
      },
      reset() {
        location.reload(); 
      }
  }
})
</script>

<i18n>
{
  "it": {
    "planSettingsTitle": "Dimensioni piano",
    "instruction": "Modifica la dimensione del piano di lavoro in base alle dimensioni della fioriera",
    "rows": "Righe",
    "columns": "Colonne",
    "clearDraw": "Cancella disegno",
    "reset": "Reset",
  }
}
</i18n>