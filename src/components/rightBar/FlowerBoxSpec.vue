<template>
  <q-card class="rcl-card q-mb-md">
    <q-card-section>
        <div class="text-h6">{{ t('flowerBoxSpecTitle') }}</div>
        <q-select filled v-model="data.line" :options="lines" :label="t('flowerBoxLine')" stack-label dense options-dense emit-value map-options>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>• {{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FlowerBoxSpec',
  emits: ["dataChanged"],
  data () {
      return {
          data: {
            line: "",
        }
      }
  },
  props: ["lines"],
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
        this.$emit("dataChanged", newVal);
      },
      deep: true
    }
  }
})
</script>

<i18n>
{
  "it": {
    "flowerBoxSpecTitle": "Specifiche fioriera",
    "flowerBoxLine": "Linea"
  }
}
</i18n>
