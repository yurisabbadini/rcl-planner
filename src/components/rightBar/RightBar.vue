<template>
  <Instructions />
  <PlanSettings @dataChanged="planDataChanged($event)" @clearDraw="clearDraw"/>
  <FlowerBoxSpec :lines="lines" @selectedBlockChanged="selectedBlockChanged($event)" @lineChanged="lineChanged($event)" @finishChanged="finishChanged($event)"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Instructions from "./Instructions.vue";
import PlanSettings from "./PlanSettings.vue";
import FlowerBoxSpec from "./FlowerBoxSpec.vue";

export default defineComponent({
  name: 'RightBar',
  emits: ["planDataChanged", "clearDraw", "selectedBlockChanged", "lineChanged", "finishChanged"],
  components: {
    Instructions,
    PlanSettings,
    FlowerBoxSpec
  },
  props: ["lines"],
  methods: {
    planDataChanged(data: { rows: number; columns: number; }) {
      this.$emit("planDataChanged", data);
    },
    clearDraw() {
      this.$emit("clearDraw");
    },
    selectedBlockChanged(data: string) {
      this.$emit("selectedBlockChanged", data);
    },
    lineChanged(data: string) {
      this.$emit("lineChanged", data);
    },
    finishChanged(data: string) {
      this.$emit("finishChanged", data);
    }
  }
})
</script>
