<template>
  <td v-if="!cellIgnored" :class="computedClass" @click="toggle" :rowspan="cellRowSpan" :colspan="cellColumnSpan">
    {{ cellIgnored ? "" : cellHeight > 0 ? cellHeight : "" }}
  </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ToggleParams } from "../appTypes";

export default defineComponent({
  name: "CellSection",
  props: [
    "position",
    "row",
    "column",
    "section",
    "cellId",
    "selectedCellSections"
  ],
  computed: {
    computedClass(): string {
      return `cell-section ${this.cellHeight > 0 ? "cell-section-selected" : ""} cell-section-${this.position} ${this.cellIgnored ? "cell-section-ignored" : ""} ${this.cellIsSquare ? "cell-section-square" : ""} ${this.cellIsHBlock ? "cell-section-hblock" : ""} ${this.cellIsVBlock ? "cell-section-vblock" : ""} `;
    },
    cellSectionId(): string {
      return `${this.cellId}_${this.section}`
    },
    cellHeight(): number {
      const height = this.selectedCellSections[this.cellSectionId]?.height;
      if(height) {
        return height;
      }
      return 0;
    },
    cellIgnored(): number {
      const ignored = this.selectedCellSections[this.cellSectionId]?.ignored;
      return ignored;
    },
    cellIsSquare(): boolean {
      const isSquare = this.selectedCellSections[this.cellSectionId]?.isSquare;
      return isSquare || false;
    },
    cellIsHBlock(): boolean {
      const isHBlock = this.selectedCellSections[this.cellSectionId]?.hBlock;
      return isHBlock || false;
    },
    cellIsVBlock(): boolean {
      const isVBlock = this.selectedCellSections[this.cellSectionId]?.vBlock;
      return isVBlock || false;
    },
    cellRowSpan(): number {
      if(this.cellIsSquare || this.cellIsVBlock) {
        return 2;
      }
      return 1;
    },
    cellColumnSpan(): number {
      if(this.cellIsSquare || this.cellIsHBlock) {
        return 2;
      }
      return 1;
    }
  },
  methods: {
    toggle() {
      const row = Number(this.cellId.split("_")[0]);
      const column = Number(this.cellId.split("_")[1]);
      const section = Number(this.cellSectionId.split("_")[2]);
      const toggleParams: ToggleParams = {
        cellId: this.cellId,
        cellSectionId: this.cellSectionId,
        row: row, 
        column: column, 
        section: section
      }
      this.$emit("toggle", toggleParams);
    },
  }
});
</script>

<style scoped>
.cell-section {
  width: 25px;
  height: 25px;
  font-size: 10px;
  text-align: center;
}
.cell-section-square {
  width: 52px;
  height: 52px;
}
.cell-section-hblock {
  width: 52px;
}
.cell-section-vblock {
  height: 52px;
}
.cell-section-top-left {
  border-right: 1px dotted darkgray;
  border-bottom: 1px dotted darkgray;
}
.cell-section-top-right {
  border-left: 1px dotted darkgray;
  border-bottom: 1px dotted darkgray;
}
.cell-section-bottom-left {
  border-right: 1px dotted darkgray;
  border-top: 1px dotted darkgray;
}
.cell-section-bottom-right {
  border-left: 1px dotted darkgray;
  border-top: 1px dotted darkgray;
}
.cell-section-selected {
  background-color: burlywood;
}
</style>