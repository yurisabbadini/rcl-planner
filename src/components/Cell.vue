<template>
  <table class="cell-container" cellspacing="0">
    <tr>
      <CellSection :position="topLeft" :row="row" :column="column" :section="1" :cellId="cellId" :selectedCellSections="selectedCellSections" @toggle="toggle" :sectionSize="sectionSize" />
      <CellSection :position="topRight" :row="row" :column="column" :section="2" :cellId="cellId" :selectedCellSections="selectedCellSections" @toggle="toggle" :sectionSize="sectionSize" />
    </tr>
    <tr>
      <CellSection :position="bottomLeft" :row="row" :column="column" :section="3" :cellId="cellId" :selectedCellSections="selectedCellSections" @toggle="toggle" :sectionSize="sectionSize" />
      <CellSection :position="bottomRight" :row="row" :column="column" :section="4" :cellId="cellId" :selectedCellSections="selectedCellSections" @toggle="toggle" :sectionSize="sectionSize" />
    </tr>
  </table>
</template>

<script lang="ts">
import CellSection from "../components/CellSection.vue";
import { defineComponent } from "vue";
import { CellSectionPosition, ToggleParams } from "../appTypes";

export default defineComponent({
  name: "Cell",
  components: {
    CellSection
  },
  props: [
    "row",
    "column",
    "cellId",
    "selectedCellSections",
    "sectionSize"
  ],
  data () {
    return {
      topLeft: "top-left" as CellSectionPosition,
      topRight: "top-right" as CellSectionPosition,
      bottomLeft: "bottom-left" as CellSectionPosition,
      bottomRight: "bottom-right" as CellSectionPosition,
    }
  },
  methods: {
    toggle(params: ToggleParams) {
      this.$emit("toggle", params);
    }
  }
});
</script>

<style scoped>
.cell-container {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
}
</style>