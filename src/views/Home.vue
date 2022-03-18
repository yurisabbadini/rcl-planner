<template>
  <div style="display:grid;grid-template-columns: 60% 40%;">
    <div>
      <table class="plan" cellspacing="0">
        <tr v-for="r of drawPlan.rows" :key="r">
          <td class="cell-wrapper" v-for="c of drawPlan.columns" :key="c">
            <Cell :row="r" :column="c" :cellId="`${r}_${c}`" :selectedCellSections="selectedCellSections" @toggle="toggle"/>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <input type="radio" id="25x25_50" name="draw-selection" value="25x25_50" v-model="drawSelection" checked>
      <label for="25x25_50">25x25 H50</label>
      <input type="radio" id="25x25_75" name="draw-selection" value="25x25_75" v-model="drawSelection">
      <label for="25x25_50">25x25 H75</label>
      <input type="radio" id="25x25_100" name="draw-selection" value="25x25_100" v-model="drawSelection">
      <label for="25x25_100">25x25 H100</label>
      <br/>
      <input type="radio" id="25x50_50" name="draw-selection" value="25x50_50" v-model="drawSelection">
      <label for="25x50_50">25x50 H50</label>
      <input type="radio" id="25x50_75" name="draw-selection" value="25x50_75" v-model="drawSelection">
      <label for="25x50_50">25x50 H75</label>
      <input type="radio" id="25x50_100" name="draw-selection" value="25x50_100" v-model="drawSelection">
      <label for="25x50_100">25x50 H100</label>
      <br/>
      <input type="radio" id="50x25_50" name="draw-selection" value="50x25_50" v-model="drawSelection">
      <label for="50x25_50">50x25 H50</label>
      <input type="radio" id="50x25_75" name="draw-selection" value="50x25_75" v-model="drawSelection">
      <label for="50x25_50">50x25 H75</label>
      <input type="radio" id="50x25_100" name="draw-selection" value="50x25_100" v-model="drawSelection">
      <label for="50x25_100">50x25 H100</label>
      <br/>
      <input type="radio" id="50x50_50" name="draw-selection" value="50x50_50" v-model="drawSelection">
      <label for="50x50_50">50x50 H50</label>
      <input type="radio" id="50x50_75" name="draw-selection" value="50x50_75" v-model="drawSelection">
      <label for="50x50_50">50x50 H75</label>
      <input type="radio" id="50x50_100" name="draw-selection" value="50x50_100" v-model="drawSelection">
      <label for="50x50_100">50x50 H100</label>
    </div>
    <div>
      <table style="font-size:11px;margin-top: 15px;">
        <thead>
          <tr>
            <th style="padding: 0 15px;">Bas 25x25</th>
            <th style="padding: 0 15px;">Bas 25x50</th>
            <th style="padding: 0 15px;">Bas 50x25</th>
            <th style="padding: 0 15px;">Bas 50x50</th>
            <th style="padding: 0 15px;">Lastre 25x50</th>
            <th style="padding: 0 15px;">Lastre 50x50</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ getBasamenti("25x25") }}</td>
            <td>{{ getBasamenti("25x50") }}</td>
            <td>{{ getBasamenti("50x25") }}</td>
            <td>{{ getBasamenti("50x50") }}</td>
            <td>{{ getLastre().L25x50 }}</td>
            <td>{{ getLastre().L50x50 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cell from "../components/Cell.vue";
import { DrawPlan, SelectedCellSections, ToggleParams, CellSectionCoordinates, LastreCalcolate } from "../appTypes";

export default defineComponent({
  name: "Home",
  components: {
    Cell,
  },
  data () {
    return {
      drawPlan: { 
        rows: 10,
        columns: 10
      } as DrawPlan,
      drawSelection: "25x25_50" as string,
      selectedCellSections: {} as SelectedCellSections
    }
  },
  computed: {
    blockSize(): string {
      return this.drawSelection.split("_")[0];
    },
    blockHeight(): number {
      return Number(this.drawSelection.split("_")[1]);
    }
  },
  methods: {
    //Blocks finder functions
    initBlock(key: string) {
      if(this.selectedCellSections[key]) {
        this.selectedCellSections[key].ignored = false;
        this.selectedCellSections[key].hBlock = false;
        this.selectedCellSections[key].vBlock = false;
        this.selectedCellSections[key].isSquare = false;
      }
    },
    checkIfSquare(key: string): void {
      const cellSectionCoordinates = this.parseCellSectionId(key);
      const section1Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 1); 
      const section2Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 2); 
      const section3Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 3); 
      const section4Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 4); 
      if(this.selectedCellSections[section1Id] && this.selectedCellSections[section2Id] && this.selectedCellSections[section3Id] && this.selectedCellSections[section4Id]) {
        const referenceHeight = this.selectedCellSections[section1Id].height;
        if(this.selectedCellSections[section1Id].height == referenceHeight && this.selectedCellSections[section2Id].height == referenceHeight && this.selectedCellSections[section3Id].height == referenceHeight && this.selectedCellSections[section4Id].height == referenceHeight) {
          this.initBlock(section1Id);
          this.selectedCellSections[section1Id].isSquare = true;
          this.initBlock(section2Id);
          this.selectedCellSections[section2Id].ignored = true;
          this.initBlock(section3Id);
          this.selectedCellSections[section3Id].ignored = true;
          this.initBlock(section4Id);
          this.selectedCellSections[section4Id].ignored = true;
          return;
        }
      }
      if(this.selectedCellSections[section1Id]) {
        if(!this.cellSectionParsed(section1Id)) {
          this.initBlock(section1Id);
        }
      }
      if(this.selectedCellSections[section2Id]) {
        if(!this.cellSectionParsed(section2Id)) {
          this.initBlock(section2Id);
        }
      }
      if(this.selectedCellSections[section3Id]) {
        if(!this.cellSectionParsed(section3Id)) {
          this.initBlock(section3Id);
        }
      }
      if(this.selectedCellSections[section4Id]) {
        if(!this.cellSectionParsed(section4Id)) {
          this.initBlock(section4Id);
        }
      }
    },
    checkIfHBlock(key: string): void {
      const cellSectionCoordinates = this.parseCellSectionId(key);
      const section1Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 1); 
      const section2Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 2); 
      const section3Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 3); 
      const section4Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 4); 
      if(cellSectionCoordinates.section == 1 && this.selectedCellSections[section2Id]) {
        if(this.selectedCellSections[section1Id].height == this.selectedCellSections[section2Id].height && !this.cellSectionParsed(section2Id)) {
          this.initBlock(section1Id);
          this.selectedCellSections[section1Id].hBlock = true;
          this.initBlock(section2Id);
          this.selectedCellSections[section2Id].ignored = true;
          return;
        }
      } else if(cellSectionCoordinates.section == 3 && this.selectedCellSections[section4Id]) {
        if(this.selectedCellSections[section3Id].height == this.selectedCellSections[section4Id].height && !this.cellSectionParsed(section4Id)) {
          this.initBlock(section3Id);
          this.selectedCellSections[section3Id].hBlock = true;
          this.initBlock(section4Id);
          this.selectedCellSections[section4Id].ignored = true;
          return;
        }
      } else {
        if(cellSectionCoordinates.section == 1) {
          this.initBlock(section1Id);
          this.initBlock(section2Id);
          if(!this.cellSectionParsed(section2Id)) {
            this.initBlock(section2Id);
          }
        }
        if(cellSectionCoordinates.section == 3) {
          this.initBlock(section3Id);
          if(!this.cellSectionParsed(section4Id)) {
            this.initBlock(section4Id);
          }
        }
      }
    },
    checkIfVBlock(key: string): void {
      const cellSectionCoordinates = this.parseCellSectionId(key);
      const section1Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 1); 
      const section2Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 2); 
      const section3Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 3); 
      const section4Id = this.getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 4); 
      if(cellSectionCoordinates.section == 1 && this.selectedCellSections[section3Id] && !this.cellSectionParsed(section3Id)) {
        if(this.selectedCellSections[section1Id].height == this.selectedCellSections[section3Id].height) {
          this.initBlock(section1Id);
          this.selectedCellSections[section1Id].vBlock = true;
          this.initBlock(section3Id);
          this.selectedCellSections[section3Id].ignored = true;
          return;
        }
      } else if(cellSectionCoordinates.section == 2 && this.selectedCellSections[section4Id] && !this.cellSectionParsed(section4Id)) {
        if(this.selectedCellSections[section2Id].height == this.selectedCellSections[section4Id].height) {
          this.initBlock(section2Id);
          this.selectedCellSections[section2Id].vBlock = true;
          this.initBlock(section4Id);
          this.selectedCellSections[section4Id].ignored = true;
          return;
        }
      } else {
        if(cellSectionCoordinates.section == 1) {
          if(!this.cellSectionParsed(section1Id)) {
            this.initBlock(section1Id);
          }
          if(!this.cellSectionParsed(section3Id)) {
            this.initBlock(section3Id);
          }
        }
        if(cellSectionCoordinates.section == 2) {
          if(!this.cellSectionParsed(section2Id)) {
            this.initBlock(section2Id);
          }
          if(!this.cellSectionParsed(section4Id)) {
            this.initBlock(section4Id);
          }
        }
      }
    },

    //points functions
    getLineari(): void {
      return;
    },

    getAngoliInterni(): void {
      return;
    },

    getAngoliEsterni(): void {
      return;
    },

    getAngoliCentrali(): void {
      return;
    },

    //lastre
    getLastreSingle(res: LastreCalcolate): LastreCalcolate {
      const data = Object.values(this.selectedCellSections);
      const singles = data.filter((x) => !x.isSquare && !x.hBlock && !x.vBlock && !x.ignored);

      const lastre25x50singles = singles.filter((x) => x.height == 50);
      lastre25x50singles.forEach((x) => {
        res.L25x50 += 4;
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        let topCellSectionId = "";
        let rightCellSectionId = "";
        let bottomCellSectionId = "";
        let leftCellSectionId = "";
        if(currentCellCoordinates.section == 1) {
          topCellSectionId = this.getCellSectionId(currentCellCoordinates.row - 1, currentCellCoordinates.column, 3);
          rightCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column, 2);
          bottomCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column, 3);
          leftCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column - 1, 2);
        } else if(currentCellCoordinates.section == 2) {
          topCellSectionId = this.getCellSectionId(currentCellCoordinates.row - 1, currentCellCoordinates.column, 4);
          rightCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column + 1, 1);
          bottomCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column, 4);
          leftCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column , 1);
        } else if(currentCellCoordinates.section == 3) {
          topCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column, 1);
          rightCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column, 4);
          bottomCellSectionId = this.getCellSectionId(currentCellCoordinates.row + 1, currentCellCoordinates.column, 1);
          leftCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column - 1 , 4);
        } else if(currentCellCoordinates.section == 4) {
          topCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column, 2);
          rightCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column + 1, 3);
          bottomCellSectionId = this.getCellSectionId(currentCellCoordinates.row + 1, currentCellCoordinates.column, 2);
          leftCellSectionId = this.getCellSectionId(currentCellCoordinates.row, currentCellCoordinates.column , 3);
        }

        if(this.selectedCellSections[topCellSectionId]) {
          res.L25x50--;
        }
        if(this.selectedCellSections[rightCellSectionId]) {
          res.L25x50--;
        }
        if(this.selectedCellSections[bottomCellSectionId]) {
          res.L25x50--;
        }
        if(this.selectedCellSections[leftCellSectionId]) {
          res.L25x50--;
        }
      });
      
      return res;
    },

    getLastreVBlock(res: LastreCalcolate): LastreCalcolate {
      return res;
    },

    getLastreHBlock(res: LastreCalcolate): LastreCalcolate {
      return res;
    },

    getLastreSquare(res: LastreCalcolate): LastreCalcolate {
      return res;
    },

    getLastre(): LastreCalcolate {
      /*const data = Object.values(this.selectedCellSections);
      const hBlocks = data.filter((x) => x.hBlock);
      const vBlocks = data.filter((x) => x.vBlock);
      const squares = data.filter((x) => x.isSquare);
      const singles = data.filter((x) => !x.isSquare && !x.hBlock && !x.vBlock && !x.ignored);*/

      let res: LastreCalcolate = {
        L25x25: 0,
        L25x50: 0,
        L25x75: 0,
        L25x100: 0,
        L50x25: 0,
        L50x50: 0,
        L50x75: 0,
        L50x100: 0
      };

      //single -> 25x50 * 4
      res = this.getLastreSingle(res);
      //vblock -> 25x50 * 2 + 50x50 * 2
      res = this.getLastreVBlock(res);
      //hblock -> 25x50 * 2 + 50x50 * 2
      res = this.getLastreHBlock(res);
      //square -> 50x50 * 4
      res = this.getLastreSquare(res);
      
      return res;
    },

    //basamenti
    getBasamenti(size: "25x25" | "25x50" | "50x25" | "50x50"): number {
      const data = Object.values(this.selectedCellSections);
      if(size == "25x50") {
        return data.filter((x) => x.hBlock).length;
      } else if(size == "50x25") {
        return data.filter((x) => x.vBlock).length;
      } else if(size == "50x50") {
        return data.filter((x) => x.isSquare).length;
      } else if(size == "25x25") {
        return data.filter((x) => !x.isSquare && !x.hBlock && !x.vBlock && !x.ignored).length;
      }
      return 0;
    },

    //common functions
    getCellSectionId(row: number, column: number, section: number): string {
      return `${row}_${column}_${section}`;
    },
    parseCellSectionId(id: string): CellSectionCoordinates {
      const idParts = id.split("_");
      return {
        row: Number(idParts[0]),
        column: Number(idParts[1]),
        section: Number(idParts[2]),
      }
    },
    cellSectionParsed(key: string): boolean {
      if(this.selectedCellSections[key]) { 
        if(this.selectedCellSections[key].isSquare || this.selectedCellSections[key].hBlock || this.selectedCellSections[key].vBlock || this.selectedCellSections[key].ignored) {
          return true;
        }
      }
      return false;
    },

    //Toggle functions
    removeSelectedCellSection(id: string) {
      if(this.selectedCellSections[id]) {
        delete this.selectedCellSections[id];
      }
    },

    toggleCellSection(id: string) {
      if(this.selectedCellSections[id]) {
        this.removeSelectedCellSection(id);
      } else {
        this.selectedCellSections[id] = {
          cellSectionId: id,
          height: this.blockHeight,
          ignored: false,
          isSquare: false,
          hBlock: false,
          vBlock: false
        };
      }
    },
    toggle(params: ToggleParams) {
      if(this.blockSize == "25x25") {
        if(this.selectedCellSections[params.cellSectionId]?.isSquare) {
          let cellSectionId = this.getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        } else if(this.selectedCellSections[params.cellSectionId]?.hBlock) {
          if(params.section === 1) {
            let cellSectionId = this.getCellSectionId(params.row, params.column, 1);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = this.getCellSectionId(params.row, params.column, 2);
            this.removeSelectedCellSection(cellSectionId);
          } else if(params.section === 3) {
            let cellSectionId = this.getCellSectionId(params.row, params.column, 3);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = this.getCellSectionId(params.row, params.column, 4);
            this.removeSelectedCellSection(cellSectionId);
          }
        } else if(this.selectedCellSections[params.cellSectionId]?.vBlock) {
          if(params.section === 1) {
            let cellSectionId = this.getCellSectionId(params.row, params.column, 1);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = this.getCellSectionId(params.row, params.column, 3);
            this.removeSelectedCellSection(cellSectionId);
          } else if(params.section === 2) {
            let cellSectionId = this.getCellSectionId(params.row, params.column, 2);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = this.getCellSectionId(params.row, params.column, 4);
            this.removeSelectedCellSection(cellSectionId);
          }
        } else {
          this.toggleCellSection(params.cellSectionId);
        }
      } else if(this.blockSize == "25x50") {
        if(this.selectedCellSections[params.cellSectionId]?.isSquare) {
          let cellSectionId = this.getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        } else {
          if(params.section === 2) {
            params.section = 1;
          }
          if(params.section === 4) {
            params.section = 3;
          }
          const section1Id = this.getCellSectionId(params.row, params.column, 1); 
          const section2Id = this.getCellSectionId(params.row, params.column, 2); 
          const section3Id = this.getCellSectionId(params.row, params.column, 3); 
          const section4Id = this.getCellSectionId(params.row, params.column, 4); 
          if(params.section === 1) {
            if(this.selectedCellSections[section1Id]?.vBlock) {
              this.removeSelectedCellSection(section1Id);
              this.removeSelectedCellSection(section3Id);
            } else if(this.selectedCellSections[section1Id] && !this.selectedCellSections[section1Id]?.vBlock) {
              this.removeSelectedCellSection(section1Id);
            } else if(this.selectedCellSections[section2Id]?.vBlock) {
              this.removeSelectedCellSection(section2Id);
              this.removeSelectedCellSection(section4Id);
            } else if(this.selectedCellSections[section2Id] && !this.selectedCellSections[section2Id]?.vBlock) {
              this.removeSelectedCellSection(section2Id);
            } else {
              this.toggleCellSection(section1Id);
              this.toggleCellSection(section2Id);
            }
          } else if(params.section === 3) {
            if(this.selectedCellSections[section1Id]?.vBlock) {
              this.removeSelectedCellSection(section1Id);
              this.removeSelectedCellSection(section3Id);
            } else if(this.selectedCellSections[section3Id] && !this.selectedCellSections[section3Id]?.vBlock) {
              this.removeSelectedCellSection(section3Id);
            } else if(this.selectedCellSections[section4Id] && !this.selectedCellSections[section4Id]?.vBlock) {
              this.removeSelectedCellSection(section4Id);
            } else if(this.selectedCellSections[section2Id]?.vBlock) {
              this.removeSelectedCellSection(section2Id);
              this.removeSelectedCellSection(section4Id);
            }  else {
              this.toggleCellSection(section3Id);
              this.toggleCellSection(section4Id);
            }
          }
        }
      } else if(this.blockSize == "50x25") {
        if(this.selectedCellSections[params.cellSectionId]?.isSquare) {
          let cellSectionId = this.getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        } else {
          if(params.section === 3) {
            params.section = 1;
          }
          if(params.section === 4) {
            params.section = 2;
          }
          const section1Id = this.getCellSectionId(params.row, params.column, 1); 
          const section2Id = this.getCellSectionId(params.row, params.column, 2); 
          const section3Id = this.getCellSectionId(params.row, params.column, 3); 
          const section4Id = this.getCellSectionId(params.row, params.column, 4); 
          if(params.section === 1) {
            if(this.selectedCellSections[section1Id]?.hBlock) {
              this.removeSelectedCellSection(section1Id);
              this.removeSelectedCellSection(section2Id);
            } else if(this.selectedCellSections[section1Id] && !this.selectedCellSections[section1Id]?.hBlock) {
              this.removeSelectedCellSection(section1Id);
            } else if(this.selectedCellSections[section3Id] && !this.selectedCellSections[section3Id]?.hBlock) {
              this.removeSelectedCellSection(section3Id);
            } else if(this.selectedCellSections[section3Id]?.hBlock) {
              this.removeSelectedCellSection(section3Id);
              this.removeSelectedCellSection(section4Id);
            } else {
              this.toggleCellSection(section1Id);
              this.toggleCellSection(section3Id);
            }
          } else if(params.section === 2) {
            if(this.selectedCellSections[section1Id]?.hBlock) {
              this.removeSelectedCellSection(section1Id);
              this.removeSelectedCellSection(section3Id);
            } else if(this.selectedCellSections[section2Id] && !this.selectedCellSections[section2Id]?.hBlock) {
              this.removeSelectedCellSection(section2Id);
            } else if(this.selectedCellSections[section4Id] && !this.selectedCellSections[section4Id]?.hBlock) {
              this.removeSelectedCellSection(section4Id);
            } else if(this.selectedCellSections[section3Id]?.hBlock) {
              this.removeSelectedCellSection(section3Id);
              this.removeSelectedCellSection(section4Id);
            }  else {
              this.toggleCellSection(section2Id);
              this.toggleCellSection(section4Id);
            }
          }
        }
      } else if(this.blockSize == "50x50") {
        if(!this.selectedCellSections[params.cellSectionId]?.isSquare) {
          let cellSectionId = this.getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = this.getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        }
        let cellSectionId = this.getCellSectionId(params.row, params.column, 1);
        this.toggleCellSection(cellSectionId);
        cellSectionId = this.getCellSectionId(params.row, params.column, 2);
        this.toggleCellSection(cellSectionId);
        cellSectionId = this.getCellSectionId(params.row, params.column, 3);
        this.toggleCellSection(cellSectionId);
        cellSectionId = this.getCellSectionId(params.row, params.column, 4);
        this.toggleCellSection(cellSectionId);
      }
      var keys = Object.keys(this.selectedCellSections);
      keys.sort();
      for (let key of keys) {
        if(!this.cellSectionParsed(key)) {
          this.checkIfSquare(key);
        }
        if(!this.cellSectionParsed(key)) {
          this.checkIfHBlock(key);
        }
        if(!this.cellSectionParsed(key)) {
          this.checkIfVBlock(key);
        }
      }
    }
  }
});
</script>

<style scoped>
.plan {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
}
.cell-wrapper {
  padding: 0;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0;
  border: 1px solid black;
}
</style>
