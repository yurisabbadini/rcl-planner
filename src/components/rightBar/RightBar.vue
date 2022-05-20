<template>
  <Instructions />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Instructions from "./Instructions.vue";

export default defineComponent({
  name: 'RightBar',
  components: {
    Instructions
  }
})
</script>
