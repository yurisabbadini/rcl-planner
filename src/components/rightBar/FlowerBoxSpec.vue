<template>
  <Instructions />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Instructions from "./Instructions.vue";

export default defineComponent({
  name: 'FlowerBoxSpec',
  emits: ["planDataChanged"],
  components: {
    Instructions
  },
  methods: {
    planDataChanged(data: { rows: number; columns: number; }) {
      this.$emit("planDataChanged", data);
    }
  }
})
</script>
