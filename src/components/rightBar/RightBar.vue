<template>
  <Instructions />
  <PlanSettings @dataChanged="planDataChanged($event)" @clearDraw="clearDraw"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Instructions from "./Instructions.vue";
import PlanSettings from "./PlanSettings.vue";

export default defineComponent({
  name: 'RightBar',
  emits: ["planDataChanged", "clearDraw"],
  components: {
    Instructions,
    PlanSettings
  },
  methods: {
    planDataChanged(data: { rows: number; columns: number; }) {
      this.$emit("planDataChanged", data);
    },
    clearDraw() {
      this.$emit("clearDraw");
    }
  }
})
</script>
