<template>
  <q-card class="rcl-card q-mb-md">
    <q-card-section>
        <div class="text-h6">{{ t('flowerBoxSpecTitle') }}</div>
        <q-select filled v-model="line" :options="lines" :label="t('flowerBoxLine')" stack-label dense options-dense emit-value map-options option-value="id" option-label="name">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="q-gutter-sm">
          <div class="q-gutter-sm">
            <q-radio dense v-model="type" val="standard" label="Altezza Standard 50" />
            <q-radio dense v-model="type" val="skyline" label="Skyline 50, 75, 100" />
          </div>
        </div>
        <div class="q-mt-sm">
          <q-select v-if="type=='standard'" filled v-model="selectedBlock" :options="standardBlocks" :label="t('blocks')" stack-label options-dense map-options>
            <template v-slot:selected>
              <BlockTemplate :label="selectedBlock.label" :value="selectedBlock.value" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <BlockTemplate :label="scope.opt.label" :value="scope.opt.value" />
              </q-item>
            </template>
          </q-select>
          <q-select v-if="type=='skyline'" filled v-model="selectedBlock" :options="skylineBlocks" :label="t('blocks')" stack-label options-dense map-options>
            <template v-slot:selected>
              <BlockTemplate :label="selectedBlock.label" :value="selectedBlock.value" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <BlockTemplate :label="scope.opt.label" :value="scope.opt.value" />
              </q-item>
            </template>
          </q-select>
          <q-select class="q-mt-md" filled v-model="finish" :options="finishings" :label="t('flowerBoxFinishing')" stack-label dense options-dense emit-value map-options option-value="id" option-label="description">
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { FlowerBoxFinishing } from '../../appTypes';
import BlockTemplate from "./BlockTemplate.vue";
import { getFinishing } from "../../modules/repository";

export default defineComponent({
  name: 'FlowerBoxSpec',
  emits: ["selectedBlockChanged", "lineChanged", "finishChanged"],
  components: {
    BlockTemplate
  },
  data () {
      return {
        line: "",
        finish: "",
        finishings: [] as FlowerBoxFinishing[],
        type: "standard" as "standard" | "skyline",
        selectedBlock: {}as { label: string, value: string },
        standardBlocks: [
          {
            value: "50x50_50",
            label: "50x50 H50",
            sizeH: 50,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x50_50",
            label: "25x50 H50",
            sizeH: 50,
            sizeV: 25,
            height: 50
          },
          {
            value: "50x25_50",
            label: "50x25 H50",
            sizeH: 25,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x25_50",
            label: "25x25 H50",
            sizeH: 25,
            sizeV: 25,
            height: 50
          }
        ],
        skylineBlocks: [
          {
            value: "50x50_50",
            label: "50x50 H50",
            sizeH: 50,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x50_50",
            label: "25x50 H50",
            sizeH: 50,
            sizeV: 25,
            height: 50
          },
          {
            value: "50x25_50",
            label: "50x25 H50",
            sizeH: 25,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x25_50",
            label: "25x25 H50",
            sizeH: 25,
            sizeV: 25,
            height: 50
          },
          {
            value: "50x50_75",
            label: "50x50 H75",
            sizeH: 50,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x50_75",
            label: "25x50 H75",
            sizeH: 50,
            sizeV: 25,
            height: 50
          },
          {
            value: "50x25_75",
            label: "50x25 H75",
            sizeH: 25,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x25_75",
            label: "25x25 H75",
            sizeH: 25,
            sizeV: 25,
            height: 50
          },
          {
            value: "50x50_100",
            label: "50x50 H100",
            sizeH: 50,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x50_100",
            label: "25x50 H100",
            sizeH: 50,
            sizeV: 25,
            height: 50
          },
          {
            value: "50x25_100",
            label: "50x25 H100",
            sizeH: 25,
            sizeV: 50,
            height: 50
          },
          {
            value: "25x25_100",
            label: "25x25 H100",
            sizeH: 25,
            sizeV: 25,
            height: 50
          }
        ]
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
    selectedBlock: {
      handler: function (newVal) {
        this.$emit("selectedBlockChanged", newVal.value);
      },
      deep: true
    },
    line: {
      handler: function (newVal) {
        this.finish = "";
        this.finishings = getFinishing(newVal, "50x50");
        this.finish = this.finishings[0]?.id || "";
        this.$emit("lineChanged", newVal);
        this.$emit("finishChanged", this.finish);
      },
      deep: true
    },
  }
})
</script>

<i18n>
{
  "it": {
    "flowerBoxSpecTitle": "Specifiche fioriera",
    "flowerBoxLine": "Linea",
    "flowerBoxFinishing": "Finitura",
    "blocks": "Blocco",
  }
}
</i18n>
