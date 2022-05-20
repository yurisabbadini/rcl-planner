<template>
<div>
  <div class="q-pa-md">
    <div  class="row">
      <div class="col-md-8" ref="planWrapper">
        <table class="plan" cellspacing="0">
          <tr v-for="r of drawPlan.rows" :key="r">
            <td class="cell-wrapper" v-for="c of drawPlan.columns" :key="c">
              <Cell :row="r" :column="c" :cellId="`${r}_${c}`" :selectedCellSections="selectedCellSections" :sectionSize="sectionSize" @toggle="toggle"/>
            </td>
          </tr>
        </table>
      </div>
      <div class="col-md-4 q-pl-md">
        <RightBar 
          @planDataChanged="planDataChanged($event)"
        />
          
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
        <br/>
        <br/>
        <input type="checkbox" name="singleSlabs" v-model="singleSlabs">
        <label for="singleSlabs">Lastre altezza unica</label>
        <br/>
        <br/>
        <button @click="getResults">CALCOLA</button>
      </div>
    </div>
    <div  class="row">
      <div class="col">
        <table style="font-size:11px;">
          <thead>
            <tr>
              <th style="padding: 0 15px;">Bas 25x25</th>
              <th style="padding: 0 15px;">Bas 25x50</th>
              <th style="padding: 0 15px;">Bas 50x50</th>
              <th style="padding: 0 15px;">Lastre 25x25</th>
              <th style="padding: 0 15px;">Lastre 25x50</th>
              <th style="padding: 0 15px;">Lastre 25x75</th>
              <th style="padding: 0 15px;">Lastre 25x100</th>
              <th style="padding: 0 15px;">Lastre 50x50</th>
              <th style="padding: 0 15px;">Lastre 50x75</th>
              <th style="padding: 0 15px;">Lastre 50x100</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ computeResult.B25x25 }}</td>
              <td>{{ computeResult.B25x50 }}</td>
              <td>{{ computeResult.B50x50 }}</td>
              <td>{{ computeResult.L25x25 }}</td>
              <td>{{ computeResult.L25x50 }}</td>
              <td>{{ computeResult.L25x75 }}</td>
              <td>{{ computeResult.L25x100 }}</td>
              <td>{{ computeResult.L50x50 }}</td>
              <td>{{ computeResult.L50x75 }}</td>
              <td>{{ computeResult.L50x100 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div  class="row">
      <div class="col">
        <table style="font-size:11px;">
          <thead>
            <tr>
              <th style="padding: 0 15px;">Lineari</th>
              <th style="padding: 0 15px;">Interni</th>
              <th style="padding: 0 15px;">Esterni</th>
              <th style="padding: 0 15px;">Centrali</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ computeResult.points.filter((x) => x.type == "linear").length }}</td>
              <td>{{ computeResult.points.filter((x) => x.type == "internal").length }}</td>
              <td>{{ computeResult.points.filter((x) => x.type == "external").length }}</td>
              <td>{{ computeResult.points.filter((x) => x.type == "central").length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div  class="row">
      <div class="col">
        <table style="font-size:11px;">
          <thead>
            <tr>
              <th style="padding: 0 15px;">Giunto Alto</th>
              <th style="padding: 0 15px;">Giunto Basso</th>
              <th style="padding: 0 15px;">Tirante Orizz.</th>
              <th style="padding: 0 15px;">Tirante Obliquo</th>
              <th style="padding: 0 15px;">Tirante Obliquo H50</th>
              <th style="padding: 0 15px;">Tirante Obliquo H75</th>
              <th style="padding: 0 15px;">Tirante Obliquo H100</th>
              <th style="padding: 0 15px;">Piantana</th>
              <th style="padding: 0 15px;">Angolare</th>
              <th style="padding: 0 15px;">Squadr. Anc.</th>
              <th style="padding: 0 15px;">Elemento Crocera</th>
              <th style="padding: 0 15px;">Spinotto Corto</th>
              <th style="padding: 0 15px;">Piastra Lineare</th>
              <th style="padding: 0 15px;">Piastra Angolare</th>
              <th style="padding: 0 15px;">Piastra L</th>
              <th style="padding: 0 15px;">Allin Z</th>
              <th style="padding: 0 15px;">Allin L</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ computeResult.giuntoAlto }}</td>
              <td>{{ computeResult.giuntoBasso }}</td>
              <td>{{ computeResult.tiranteOrizzontale }}</td>
              <td>{{ computeResult.tiranteObliquo }}</td>
              <td>{{ computeResult.tiranteObliquoH50 }}</td>
              <td>{{ computeResult.tiranteObliquoH75 }}</td>
              <td>{{ computeResult.tiranteObliquoH100 }}</td>
              <td>{{ computeResult.piantana }}</td>
              <td>{{ computeResult.angolare }}</td>
              <td>{{ computeResult.squadrettaAncoraggio }}</td>
              <td>{{ computeResult.elementoCrocera }}</td>
              <td>{{ computeResult.spinottoCorto }}</td>
              <td>{{ computeResult.piastraLineare }}</td>
              <td>{{ computeResult.piastraAngolare }}</td>
              <td>{{ computeResult.piastraL }}</td>
              <td>{{ computeResult.allinZ }}</td>
              <td>{{ computeResult.allinL }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cell from "../components/Cell.vue";
import RightBar from "../components/rightBar/RightBar.vue";
import { DrawPlan, SelectedCellSections, ToggleParams, CellSectionCoordinates, ComputeResult, Point } from "../appTypes";
import { useI18n } from "vue-i18n";

/*
SEGNARE COME ROSSE CASELLE DEL DISEGNO E IMPEDIRE IL CALCOLA SE CI SONO ERRORI
GLI ERRORI CI SONO SE SIAMO NEL CASO DI UNA 'COMPOSIZIONE BASE' (QUELLE DELL'EXCEL) CHE SI DISPONE OLTRE I BORDI DI UNA CELLA
TRASFORMARE TUTTE LE LASTRE 25x100 in 2 LASTRE 25x50
TRASFORMARE TUTTE LE LASTRE 25x75 in 1 LASTRE 25x50 + 1 LASTRA 25x25
*/

export default defineComponent({
  name: "Home",
  components: {
    Cell,
    RightBar
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return { t }
  },
  data () {
    return {
      drawPlan: { 
        rows: 30,
        columns: 30
      } as DrawPlan,
      drawSelection: "25x25_50" as string,
      sectionSize: 0 as number,
      selectedCellSections: {} as SelectedCellSections,
      singleSlabs: false,
      computeResult: {
        B25x25: 0,
        B25x50: 0,
        B50x50: 0,
        L25x25: 0,
        L25x50: 0,
        L25x75: 0,
        L25x100: 0,
        L50x50: 0,
        L50x75: 0,
        L50x100: 0,
        allinL: 0,
        allinZ: 0,
        angolare: 0,
        elementoCrocera: 0,
        giuntoAlto: 0,
        giuntoBasso: 0,
        piantana: 0,
        piastraAngolare: 0,
        piastraL: 0,
        piastraLineare: 0,
        spinottoCorto: 0,
        squadrettaAncoraggio: 0,
        tiranteObliquo: 0,
        tiranteObliquoH100: 0,
        tiranteObliquoH50: 0,
        tiranteObliquoH75: 0,
        tiranteOrizzontale: 0,
        points: []
      } as ComputeResult
    }
  },
  mounted () {
    this.getCellSize();
		this.$nextTick(() => {
			window.addEventListener("resize", this.getCellSize);
		});
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
    planDataChanged(data: { rows: number; columns: number; }) {
      this.drawPlan.rows = data.rows;
      this.drawPlan.columns = data.columns;
      this.getCellSize();
    },

    getCellSize() {
      try {
        const wrapperSize = (this.$refs.planWrapper as HTMLDivElement).offsetWidth;
        this.sectionSize = wrapperSize / (this.drawPlan.columns * 2);
      } catch {
        //
      }
    },

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
          this.selectedCellSections[section1Id].ignoredPoints = ["top-right", "bottom-right", "bottom-left"];
          this.initBlock(section2Id);
          this.selectedCellSections[section2Id].ignored = true;
          this.selectedCellSections[section2Id].ignoredPoints = ["top-left", "bottom-left", "bottom-right"];
          this.initBlock(section3Id);
          this.selectedCellSections[section3Id].ignored = true;
          this.selectedCellSections[section3Id].ignoredPoints = ["top-right", "bottom-right", "top-left"];
          this.initBlock(section4Id);
          this.selectedCellSections[section4Id].ignored = true;
          this.selectedCellSections[section4Id].ignoredPoints = ["top-right", "bottom-left", "top-left"];
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
          this.selectedCellSections[section1Id].ignoredPoints = ["bottom-right", "top-right"];
          this.initBlock(section2Id);
          this.selectedCellSections[section2Id].ignored = true;
          this.selectedCellSections[section2Id].ignoredPoints = ["bottom-left", "top-left"];
          return;
        }
      } else if(cellSectionCoordinates.section == 3 && this.selectedCellSections[section4Id]) {
        if(this.selectedCellSections[section3Id].height == this.selectedCellSections[section4Id].height && !this.cellSectionParsed(section4Id)) {
          this.initBlock(section3Id);
          this.selectedCellSections[section3Id].hBlock = true;
          this.selectedCellSections[section3Id].ignoredPoints = ["bottom-right", "top-right"];
          this.initBlock(section4Id);
          this.selectedCellSections[section4Id].ignored = true;
          this.selectedCellSections[section4Id].ignoredPoints = ["bottom-left", "top-left"];
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
          this.selectedCellSections[section1Id].ignoredPoints = ["bottom-left", "bottom-right"];
          this.initBlock(section3Id);
          this.selectedCellSections[section3Id].ignored = true;
          this.selectedCellSections[section3Id].ignoredPoints = ["top-left", "top-right"];
          return;
        }
      } else if(cellSectionCoordinates.section == 2 && this.selectedCellSections[section4Id] && !this.cellSectionParsed(section4Id)) {
        if(this.selectedCellSections[section2Id].height == this.selectedCellSections[section4Id].height) {
          this.initBlock(section2Id);
          this.selectedCellSections[section2Id].vBlock = true;
          this.selectedCellSections[section2Id].ignoredPoints = ["bottom-left", "bottom-right"];
          this.initBlock(section4Id);
          this.selectedCellSections[section4Id].ignored = true;
          this.selectedCellSections[section4Id].ignoredPoints = ["top-left", "top-right"];
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

    getSingleBlockNearCells(row: number, column: number, section: number): {
      topCellSectionId: string;
      rightCellSectionId: string;
      bottomCellSectionId: string;
      leftCellSectionId: string;
    } {
      let topCellSectionId = "";
      let rightCellSectionId = "";
      let bottomCellSectionId = "";
      let leftCellSectionId = "";
      if(section == 1) {
          topCellSectionId = this.getCellSectionId(row - 1, column, 3);
          rightCellSectionId = this.getCellSectionId(row, column, 2);
          bottomCellSectionId = this.getCellSectionId(row, column, 3);
          leftCellSectionId = this.getCellSectionId(row, column - 1, 2);
        } else if(section == 2) {
          topCellSectionId = this.getCellSectionId(row - 1, column, 4);
          rightCellSectionId = this.getCellSectionId(row, column + 1, 1);
          bottomCellSectionId = this.getCellSectionId(row, column, 4);
          leftCellSectionId = this.getCellSectionId(row, column , 1);
        } else if(section == 3) {
          topCellSectionId = this.getCellSectionId(row, column, 1);
          rightCellSectionId = this.getCellSectionId(row, column, 4);
          bottomCellSectionId = this.getCellSectionId(row + 1, column, 1);
          leftCellSectionId = this.getCellSectionId(row, column - 1 , 4);
        } else if(section == 4) {
          topCellSectionId = this.getCellSectionId(row, column, 2);
          rightCellSectionId = this.getCellSectionId(row, column + 1, 3);
          bottomCellSectionId = this.getCellSectionId(row + 1, column, 2);
          leftCellSectionId = this.getCellSectionId(row, column , 3);
        }
        return {
          topCellSectionId,
          rightCellSectionId,
          bottomCellSectionId,
          leftCellSectionId
        };
    },

    getVBlockNearCells(row: number, column: number, section: number): {
      topCellSectionId: string;
      rightTopCellSectionId: string;
      rightBottomCellSectionId: string;
      bottomCellSectionId: string;
      leftTopCellSectionId: string;
      leftBottomCellSectionId: string;
    } {
      let topCellSectionId = "";
      let rightTopCellSectionId = "";
      let rightBottomCellSectionId = "";
      let bottomCellSectionId = "";
      let leftTopCellSectionId = "";
      let leftBottomCellSectionId = "";

      if(section == 1) {
        topCellSectionId = this.getCellSectionId(row - 1, column, 3);
        rightTopCellSectionId = this.getCellSectionId(row, column, 2);
        rightBottomCellSectionId = this.getCellSectionId(row, column, 4);
        bottomCellSectionId = this.getCellSectionId(row + 1, column, 1);
        leftTopCellSectionId = this.getCellSectionId(row, column - 1, 2);
        leftBottomCellSectionId = this.getCellSectionId(row, column - 1, 4);
      } else if(section == 2) {
        topCellSectionId = this.getCellSectionId(row - 1, column, 4);
        rightTopCellSectionId = this.getCellSectionId(row, column + 1, 1);
        rightBottomCellSectionId = this.getCellSectionId(row, column + 1, 3);
        bottomCellSectionId = this.getCellSectionId(row + 1, column, 2);
        leftTopCellSectionId = this.getCellSectionId(row, column, 1);
        leftBottomCellSectionId = this.getCellSectionId(row, column, 3);
      }

      return {
        topCellSectionId,
        rightTopCellSectionId,
        rightBottomCellSectionId,
        bottomCellSectionId,
        leftTopCellSectionId,
        leftBottomCellSectionId
      };
    },

    getSquareBlockNearCells(row: number, column: number): {
      topLeftCellSectionId: string;
      topRightCellSectionId: string;
      rightTopCellSectionId: string;
      rightBottomCellSectionId: string;
      bottomLeftCellSectionId: string;
      bottomRightCellSectionId: string;
      leftTopCellSectionId: string;
      leftBottomCellSectionId: string;
    } {
      let topLeftCellSectionId = "";
      let topRightCellSectionId = "";
      let rightTopCellSectionId = "";
      let rightBottomCellSectionId = "";
      let bottomLeftCellSectionId = "";
      let bottomRightCellSectionId = "";
      let leftTopCellSectionId = "";
      let leftBottomCellSectionId = "";

      topLeftCellSectionId = this.getCellSectionId(row - 1, column, 3);
      topRightCellSectionId = this.getCellSectionId(row - 1, column, 4);
      rightTopCellSectionId = this.getCellSectionId(row, column + 1, 1);
      rightBottomCellSectionId = this.getCellSectionId(row, column + 1, 3);
      bottomLeftCellSectionId = this.getCellSectionId(row + 1, column, 1);
      bottomRightCellSectionId = this.getCellSectionId(row + 1, column, 2);
      leftTopCellSectionId = this.getCellSectionId(row, column - 1, 2);
      leftBottomCellSectionId = this.getCellSectionId(row, column - 1, 4);

      return {
        topLeftCellSectionId,
        topRightCellSectionId,
        rightTopCellSectionId,
        rightBottomCellSectionId,
        bottomLeftCellSectionId,
        bottomRightCellSectionId,
        leftTopCellSectionId,
        leftBottomCellSectionId
      };
    },

    getHBlockNearCells(row: number, column: number, section: number): {
      topLeftCellSectionId: string;
      topRightCellSectionId: string;
      rightCellSectionId: string;
      bottomLeftCellSectionId: string;
      bottomRightCellSectionId: string;
      leftCellSectionId: string;
    } {
      let topLeftCellSectionId = "";
      let topRightCellSectionId = "";
      let rightCellSectionId = "";
      let bottomLeftCellSectionId = "";
      let bottomRightCellSectionId = "";
      let leftCellSectionId = "";

      if(section == 1) {
        topLeftCellSectionId = this.getCellSectionId(row - 1, column, 3);
        topRightCellSectionId = this.getCellSectionId(row - 1, column, 4);
        rightCellSectionId = this.getCellSectionId(row, column + 1, 1);
        bottomLeftCellSectionId = this.getCellSectionId(row, column, 3);
        bottomRightCellSectionId = this.getCellSectionId(row, column, 4);
        leftCellSectionId = this.getCellSectionId(row, column - 1, 2);
      } else if(section == 3) {
        topLeftCellSectionId = this.getCellSectionId(row, column, 1);
        topRightCellSectionId = this.getCellSectionId(row, column, 2);
        rightCellSectionId = this.getCellSectionId(row, column + 1, 3);
        bottomLeftCellSectionId = this.getCellSectionId(row + 1, column, 1);
        bottomRightCellSectionId = this.getCellSectionId(row + 1, column, 2);
        leftCellSectionId = this.getCellSectionId(row, column - 1, 4);
      }

      return {
        topLeftCellSectionId,
        topRightCellSectionId,
        rightCellSectionId,
        bottomLeftCellSectionId,
        bottomRightCellSectionId,
        leftCellSectionId
      };
    },

    getCellSectionNearCells(row: number, column: number, section: number): {
      topCellSectionId: string;
      topLeftCellSectionId: string;
      topRightCellSectionId: string;
      rightCellSectionId: string;
      leftCellSectionId: string;
      bottomCellSectionId: string;
      bottomLeftCellSectionId: string;
      bottomRightCellSectionId: string;
    } {
      let topCellSectionId = "";
      let topLeftCellSectionId = "";
      let topRightCellSectionId = "";
      let rightCellSectionId = "";
      let leftCellSectionId = "";
      let bottomCellSectionId = "";
      let bottomLeftCellSectionId = "";
      let bottomRightCellSectionId = "";

      if(section == 1) {
        topCellSectionId = this.getCellSectionId(row - 1, column, 3);
        topLeftCellSectionId = this.getCellSectionId(row - 1, column - 1, 4);
        topRightCellSectionId = this.getCellSectionId(row - 1, column, 4);
        rightCellSectionId = this.getCellSectionId(row, column, 2);
        leftCellSectionId = this.getCellSectionId(row, column - 1, 2);
        bottomCellSectionId = this.getCellSectionId(row, column, 3);
        bottomLeftCellSectionId = this.getCellSectionId(row, column - 1, 4);
        bottomRightCellSectionId = this.getCellSectionId(row, column, 4);
      } else if(section == 2) {
        topCellSectionId = this.getCellSectionId(row - 1, column, 4);
        topLeftCellSectionId = this.getCellSectionId(row - 1, column, 3);
        topRightCellSectionId = this.getCellSectionId(row - 1, column + 1, 3);
        rightCellSectionId = this.getCellSectionId(row, column + 1, 1);
        leftCellSectionId = this.getCellSectionId(row, column, 1);
        bottomCellSectionId = this.getCellSectionId(row, column, 4);
        bottomLeftCellSectionId = this.getCellSectionId(row, column, 3);
        bottomRightCellSectionId = this.getCellSectionId(row, column + 1, 3);
      } else if(section == 3) {
        topCellSectionId = this.getCellSectionId(row, column, 1);
        topLeftCellSectionId = this.getCellSectionId(row, column - 1, 2);
        topRightCellSectionId = this.getCellSectionId(row, column, 2);
        rightCellSectionId = this.getCellSectionId(row, column, 4);
        leftCellSectionId = this.getCellSectionId(row, column - 1, 4);
        bottomCellSectionId = this.getCellSectionId(row + 1, column, 1);
        bottomLeftCellSectionId = this.getCellSectionId(row + 1, column - 1, 2);
        bottomRightCellSectionId = this.getCellSectionId(row + 1, column, 2);
      } else if(section == 4) {
        topCellSectionId = this.getCellSectionId(row, column, 2);
        topLeftCellSectionId = this.getCellSectionId(row, column, 1);
        topRightCellSectionId = this.getCellSectionId(row, column + 1, 1);
        rightCellSectionId = this.getCellSectionId(row, column + 1, 3);
        leftCellSectionId = this.getCellSectionId(row, column, 3);
        bottomCellSectionId = this.getCellSectionId(row + 1, column, 2);
        bottomLeftCellSectionId = this.getCellSectionId(row + 1, column, 1);
        bottomRightCellSectionId = this.getCellSectionId(row + 1, column + 1, 1);
      }

      return {
        topCellSectionId,
        topLeftCellSectionId,
        topRightCellSectionId,
        rightCellSectionId,
        leftCellSectionId,
        bottomCellSectionId,
        bottomLeftCellSectionId,
        bottomRightCellSectionId
      }
    },

    getLastreSingle() {
      const data = Object.values(this.selectedCellSections);
      const singles = data.filter((x) => !x.isSquare && !x.hBlock && !x.vBlock && !x.ignored);

      const blocks25x50singles = singles.filter((x) => x.height == 50);
      const blocks25x75singles = singles.filter((x) => x.height == 75);
      const blocks25x100singles = singles.filter((x) => x.height == 100);
    
      blocks25x50singles.forEach((x) => {
        this.computeResult.L25x50 += 4;
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getSingleBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(this.selectedCellSections[nearCells.topCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.rightCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.bottomCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.leftCellSectionId]) {
          this.computeResult.L25x50--;
        }
      });
      
      blocks25x75singles.forEach((x) => {
        if(!this.singleSlabs) {
          this.computeResult.L25x50 += 4;
          this.computeResult.L25x25 += 4;
        } else {
          this.computeResult.L25x75 += 4;
        }
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getSingleBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(this.selectedCellSections[nearCells.topCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            if(this.selectedCellSections[nearCells.topCellSectionId].height != 50) {
              this.computeResult.L25x25--;
            }
          } else {
            this.computeResult.L25x75--;
            if(this.selectedCellSections[nearCells.topCellSectionId].height == 50) {
              this.computeResult.L25x25++;
            }
          }
        }
        if(this.selectedCellSections[nearCells.rightCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            if(this.selectedCellSections[nearCells.rightCellSectionId].height != 50) {
              this.computeResult.L25x25--;
            }
          } else {
            this.computeResult.L25x75--;
            if(this.selectedCellSections[nearCells.rightCellSectionId].height == 50) {
              this.computeResult.L25x25++;
            }
          }
        }
        if(this.selectedCellSections[nearCells.bottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            if(this.selectedCellSections[nearCells.bottomCellSectionId].height != 50) {
              this.computeResult.L25x25--;
            }
          } else {
            this.computeResult.L25x75--;
            if(this.selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
              this.computeResult.L25x25++;
            }
          }
        }
        if(this.selectedCellSections[nearCells.leftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            if(this.selectedCellSections[nearCells.leftCellSectionId].height != 50) {
              this.computeResult.L25x25--;
            }
          } else {
            this.computeResult.L25x75--;
            if(this.selectedCellSections[nearCells.leftCellSectionId].height == 50) {
              this.computeResult.L25x25++;
            }
          }
        }
      });
     
      blocks25x100singles.forEach((x) => {
        if(!this.singleSlabs) {
          this.computeResult.L25x50 += 8;
        } else {
          this.computeResult.L25x100 += 4;
        }
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getSingleBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(this.selectedCellSections[nearCells.topCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.topCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.topCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.rightCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.rightCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.rightCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.bottomCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.leftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.leftCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.leftCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
      });
    },

    getLastreVBlock() {
      const data = Object.values(this.selectedCellSections);
      const vBlocks = data.filter((x) => x.vBlock);

      const blocksH50vBlocks = vBlocks.filter((x) => x.height == 50);
      const blocksH75vBlocks = vBlocks.filter((x) => x.height == 75);
      const blocksH100vBlocks = vBlocks.filter((x) => x.height == 100);

      blocksH50vBlocks.forEach((x) => {
        this.computeResult.L25x50 += 2;
        this.computeResult.L50x50 += 2;

        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getVBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(this.selectedCellSections[nearCells.topCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] || this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] && this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] || this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] && this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.bottomCellSectionId]) {
          this.computeResult.L25x50--;
        }
      });

      blocksH75vBlocks.forEach((x) => {
        if(!this.singleSlabs) {
          this.computeResult.L25x25 += 2;
          this.computeResult.L25x50 += 2;
          this.computeResult.L50x50 += 2;
          this.computeResult.L25x50 += 2;
        } else {
          this.computeResult.L50x75 += 2;
          this.computeResult.L25x75 += 2;
        }

        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getVBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        
        if(this.selectedCellSections[nearCells.topCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.topCellSectionId].height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] || this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] && this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] || this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] && this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
            this.computeResult.L25x25++;
          }
        }
      });

      blocksH100vBlocks.forEach((x) => {
        if(!this.singleSlabs) {
          this.computeResult.L25x50 += 4;
          this.computeResult.L50x50 += 4;
        } else {
          this.computeResult.L50x100 += 2;
          this.computeResult.L25x100 += 2;
        }

        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getVBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        
        if(this.selectedCellSections[nearCells.topCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.topCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.topCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] || this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] && this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] || this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] && this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.bottomCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
      });
    },

    getLastreHBlock() {
      const data = Object.values(this.selectedCellSections);
      const hBlocks = data.filter((x) => x.hBlock);

      const blocksH50hBlocks = hBlocks.filter((x) => x.height == 50);
      const blocksH75hBlocks = hBlocks.filter((x) => x.height == 75);
      const blocksH100hBlocks = hBlocks.filter((x) => x.height == 100);

      blocksH50hBlocks.forEach((x) => {
        this.computeResult.L25x50 += 2;
        this.computeResult.L50x50 += 2;

        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getHBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(this.selectedCellSections[nearCells.topRightCellSectionId] || this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.topRightCellSectionId] && this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.rightCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.rightCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.bottomLeftCellSectionId] || this.selectedCellSections[nearCells.bottomRightCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.bottomLeftCellSectionId] && this.selectedCellSections[nearCells.bottomRightCellSectionId]) {
          this.computeResult.L25x50--;
        }
      });

      blocksH75hBlocks.forEach((x) => {
        if(!this.singleSlabs) {
          this.computeResult.L25x25 += 2;
          this.computeResult.L25x50 += 2;
          this.computeResult.L50x50 += 2;
          this.computeResult.L25x50 += 2;
        } else {
          this.computeResult.L50x75 += 2;
          this.computeResult.L25x75 += 2;
        }

        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getHBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        
        if(this.selectedCellSections[nearCells.topRightCellSectionId] || this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.topRightCellSectionId] && this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.rightCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.rightCellSectionId].height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.leftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.leftCellSectionId].height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] || this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] && this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
      });

      blocksH100hBlocks.forEach((x) => {
        if(!this.singleSlabs) {
          this.computeResult.L25x50 += 4;
          this.computeResult.L50x50 += 4;
        } else {
          this.computeResult.L50x100 += 2;
          this.computeResult.L25x100 += 2;
        }

        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getHBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        
        if(this.selectedCellSections[nearCells.topRightCellSectionId] || this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.topRightCellSectionId] && this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.rightCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.rightCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.rightCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.leftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.leftCellSectionId].height == 50) {
            this.computeResult.L25x50++;
          } else if(this.selectedCellSections[nearCells.leftCellSectionId].height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] || this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] && this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }
      });
    },

    getLastreSquare() {
      const data = Object.values(this.selectedCellSections);
      const squareBlocks = data.filter((x) => x.isSquare);

      const blocksH50squares = squareBlocks.filter((x) => x.height == 50);
      const blocksH75squares = squareBlocks.filter((x) => x.height == 75);
      const blocksH100squares = squareBlocks.filter((x) => x.height == 100);

      blocksH50squares.forEach((x) => {
        this.computeResult.L50x50 += 4;
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getSquareBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column);

        if(this.selectedCellSections[nearCells.topRightCellSectionId] || this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.topRightCellSectionId] && this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] || this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] && this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] || this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] && this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          this.computeResult.L25x50--;
        }
        if(this.selectedCellSections[nearCells.bottomLeftCellSectionId] || this.selectedCellSections[nearCells.bottomRightCellSectionId]) {
          this.computeResult.L50x50--;
          this.computeResult.L25x50++;
        }
        if(this.selectedCellSections[nearCells.bottomLeftCellSectionId] && this.selectedCellSections[nearCells.bottomRightCellSectionId]) {
          this.computeResult.L25x50--;
        }
      });

      blocksH75squares.forEach((x) => {
        if(!this.singleSlabs) {
          this.computeResult.L50x50 += 4;
          this.computeResult.L25x50 += 4;
        } else {
          this.computeResult.L50x75 += 4;
        }

        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getSquareBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column);

        if(this.selectedCellSections[nearCells.topRightCellSectionId] || this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.topRightCellSectionId] && this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] || this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] && this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] || this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] && this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] || this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50--;
            this.computeResult.L25x50--;
            this.computeResult.L25x50++;
            this.computeResult.L25x25++;
          } else {
            this.computeResult.L50x75--;
            this.computeResult.L25x75++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] && this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50--;
            this.computeResult.L25x25--;
          } else {
            this.computeResult.L25x75--;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x25 -=2;
            this.computeResult.L25x50++;
          }
        }
      });

      blocksH100squares.forEach((x) => {
        if(!this.singleSlabs) {
        this.computeResult.L50x50 += 8;
        } else {
        this.computeResult.L50x100 += 4;
        }
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCells = this.getSquareBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column);

        if(this.selectedCellSections[nearCells.topRightCellSectionId] || this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.topRightCellSectionId] && this.selectedCellSections[nearCells.topLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.topRightCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }

        if(this.selectedCellSections[nearCells.rightTopCellSectionId] || this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.rightTopCellSectionId] && this.selectedCellSections[nearCells.rightBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }

        if(this.selectedCellSections[nearCells.leftTopCellSectionId] || this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.leftTopCellSectionId] && this.selectedCellSections[nearCells.leftBottomCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }

        
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] || this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L50x50 -= 2;
            this.computeResult.L25x50 += 2;
          } else {
            this.computeResult.L50x100--;
            this.computeResult.L25x100++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
          if(this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25++;
          }
        }
        if(this.selectedCellSections[nearCells.bottomRightCellSectionId] && this.selectedCellSections[nearCells.bottomLeftCellSectionId]) {
          if(!this.singleSlabs) {
            this.computeResult.L25x50 -= 2;
          } else {
            this.computeResult.L25x100--;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
            this.computeResult.L25x50 -= 2;
            this.computeResult.L50x50++;
          }
          if(this.selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75 && this.selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
            this.computeResult.L25x25 -= 2;
            this.computeResult.L25x50++;
          }
        }
      });
    },

    getLastre() {
      this.getLastreSingle();
      this.getLastreVBlock();
      this.getLastreHBlock();
      this.getLastreSquare();
    },

    getBasamenti() {
      const data = Object.values(this.selectedCellSections);
      this.computeResult.B25x50 = data.filter((x) => x.hBlock).length + data.filter((x) => x.vBlock).length;
      this.computeResult.B50x50 = data.filter((x) => x.isSquare).length;
      this.computeResult.B25x25 = data.filter((x) => !x.isSquare && !x.hBlock && !x.vBlock && !x.ignored).length;
    },

    getOverlappingPoints(row: number, column: number, section: number, position: "top-left" | "top-right" | "bottom-left" | "bottom-right"): Point[] {
      const res: Point[] = [];
      const nearCells = this.getCellSectionNearCells(row, column, section);

      if(position == "top-right") {
        res.push({
          cellSectionId: nearCells.topCellSectionId,
          position: "bottom-right",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.rightCellSectionId,
          position: "top-left",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.topRightCellSectionId,
          position: "bottom-left",
          type: "ignore"
        });
      } else if(position == "top-left") {
        res.push({
          cellSectionId: nearCells.topCellSectionId,
          position: "bottom-left",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.topLeftCellSectionId,
          position: "bottom-right",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.leftCellSectionId,
          position: "top-right",
          type: "ignore"
        });
      } else if(position == "bottom-left") {
        res.push({
          cellSectionId: nearCells.leftCellSectionId,
          position: "bottom-right",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.bottomCellSectionId,
          position: "top-right",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.bottomCellSectionId,
          position: "top-left",
          type: "ignore"
        });
      } else if(position == "bottom-right") {
        res.push({
          cellSectionId: nearCells.bottomCellSectionId,
          position: "top-right",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.bottomRightCellSectionId,
          position: "top-left",
          type: "ignore"
        });
        res.push({
          cellSectionId: nearCells.rightCellSectionId,
          position: "bottom-left",
          type: "ignore"
        });
      }
      return res;
    },

    getLinearPoints() {
      const data = Object.values(this.selectedCellSections);
      data.forEach((x) => {
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = this.getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        if(this.selectedCellSections[nearCellCoordinates.topCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-left",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        if(this.selectedCellSections[nearCellCoordinates.topCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-right",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        if(this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-left",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        if(this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-left",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        if(this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-right",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        if(this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-right",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        if(this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-left",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        if(this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-right",
              type: "linear"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
      });
    },

    getInternalPoints() {
      const data = Object.values(this.selectedCellSections);
      data.forEach((x) => {
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = this.getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(!this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-left",
              type: "internal"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }

        if(!this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-right",
              type: "internal"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }

        if(!this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-left",
              type: "internal"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }

        if(!this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          !this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-right",
              type: "internal"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
      });
    },

    getExternalPoints() {
      const data = Object.values(this.selectedCellSections);
      data.forEach((x) => {
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = this.getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId)) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-left",
              type: "external"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        
        if(this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId)) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-right",
              type: "external"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }

        if(this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId)) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-left",
              type: "external"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }

        if(this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          !this.selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId)) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-right",
              type: "external"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
      });
    },

    getCentralPoints() {
      const data = Object.values(this.selectedCellSections);
      data.forEach((x) => {
        const currentCellCoordinates = this.parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = this.getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if(this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          this.selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-left",
              type: "central"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
        
        if(this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.topCellSectionId] &&
          this.selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "top-right",
              type: "central"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }

        if(this.selectedCellSections[nearCellCoordinates.leftCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          this.selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-left",
              type: "central"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }

        if(this.selectedCellSections[nearCellCoordinates.rightCellSectionId] && 
          this.selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
          this.selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
          if(!this.computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
            this.computeResult.points.push({
              cellSectionId: x.cellSectionId,
              position: "bottom-right",
              type: "central"
            });
            const ignoredPoints = this.getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
            ignoredPoints.forEach((p) => {
              this.computeResult.points.push(p);
            });
          }
        }
      });
    },

    getPoints() {
      this.getLinearPoints();
      this.getInternalPoints();
      this.getExternalPoints();
      this.getCentralPoints();
    },

    getAccessori() {
      this.computeResult.points.forEach((p) => {
        const cell = this.selectedCellSections[p.cellSectionId];
        const currentCellCoordinates = this.parseCellSectionId(p.cellSectionId);
        const nearCellSections = this.getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        const topCell = this.selectedCellSections[nearCellSections.topCellSectionId];
        const leftCell = this.selectedCellSections[nearCellSections.leftCellSectionId];
        const rightCell = this.selectedCellSections[nearCellSections.rightCellSectionId];
        const bottomCell = this.selectedCellSections[nearCellSections.bottomCellSectionId];
        const topLeftCell = this.selectedCellSections[nearCellSections.topLeftCellSectionId];
        const topRightCell = this.selectedCellSections[nearCellSections.topRightCellSectionId];
        const bottomRightCell = this.selectedCellSections[nearCellSections.bottomRightCellSectionId];
        const bottomLeftCell = this.selectedCellSections[nearCellSections.bottomLeftCellSectionId];
        if(cell) {
          if(p.type == "linear") {
            const heights: (number | null)[] = [cell.height];
            if(p.position == "top-left") {
              heights.push(leftCell?.height || null);
            } else if(p.position == "top-right") {
              heights.push(rightCell?.height || null);
            } else if(p.position == "bottom-left") {
              heights.push(leftCell?.height || null);
            } if(p.position == "bottom-right") {
              heights.push(rightCell?.height || null);
            }
            if(heights.filter((h) => h == 50).length == 2) {
              this.computeResult.giuntoAlto += 1;
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 1;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 1) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 1;
              this.computeResult.angolare += 2;
              this.computeResult.piastraL += 1;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 1;
              this.computeResult.angolare += 2;
              this.computeResult.piastraL += 1;
            } else if(heights.filter((h) => h == 75).length == 2) {
              this.computeResult.giuntoAlto += 1;
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.piastraLineare += 1;
            } else if(heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.angolare += 2;
              this.computeResult.piastraLineare += 1;
              this.computeResult.allinZ += 1;
              this.computeResult.allinL += 1;
            } else if(heights.filter((h) => h == 100).length == 2) {
              this.computeResult.giuntoAlto += 1;
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.piastraLineare += 1;
            }
          } else if(p.type == "internal") {
            if(cell.height == 50) {
              this.computeResult.angolare += 2;
              this.computeResult.squadrettaAncoraggio += 1;
            } else if(cell.height == 75) {
              this.computeResult.angolare += 2;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraAngolare += 1;
            } else if(cell.height == 100) {
              this.computeResult.angolare += 2;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraAngolare += 1;
            }
          } else if(p.type == "external") {
            const heights: (number | null)[] = [cell.height];
            if(p.position == "top-left") {
              heights.push(topCell?.height || null);
              heights.push(leftCell?.height || null);
            } else if(p.position == "top-right") {
              heights.push(topCell?.height || null);
              heights.push(rightCell?.height || null);
            } else if(p.position == "bottom-left") {
              heights.push(bottomCell?.height || null);
              heights.push(leftCell?.height || null);
            } if(p.position == "bottom-right") {
              heights.push(bottomCell?.height || null);
              heights.push(rightCell?.height || null);
            }
            if(heights.filter((h) => h == 50).length == 3) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.angolare += 2;
              this.computeResult.squadrettaAncoraggio += 1;
            } else if(heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 75).length == 1) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.angolare += 4;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraL += 1;
            } else if(heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.angolare += 4;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraL += 1;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 2) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.angolare += 6;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraL += 2;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.angolare += 6;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraL += 2;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 100).length == 2) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.angolare += 6;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraL += 2;
            } else if(heights.filter((h) => h == 75).length == 2 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.angolare += 4;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraAngolare += 1;
              this.computeResult.allinZ += 1;
              this.computeResult.allinL += 1;
            } else if(heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 2) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.angolare += 6;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraAngolare += 1;
              this.computeResult.allinZ += 2;
            } else if(heights.filter((h) => h == 75).length == 3) {
              this.computeResult.giuntoBasso += 1;
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.angolare += 2;
              this.computeResult.squadrettaAncoraggio += 1;
              this.computeResult.piastraAngolare += 1;
            }
          } else if(p.type == "central") {
            const heights: (number | null)[] = [cell.height];
            if(p.position == "top-left") {
              heights.push(topCell?.height || null);
              heights.push(leftCell?.height || null);
              heights.push(topLeftCell?.height || null);
            } else if(p.position == "top-right") {
              heights.push(topCell?.height || null);
              heights.push(rightCell?.height || null);
              heights.push(topRightCell?.height || null);
            } else if(p.position == "bottom-left") {
              heights.push(bottomCell?.height || null);
              heights.push(leftCell?.height || null);
              heights.push(bottomLeftCell?.height || null);
            } if(p.position == "bottom-right") {
              heights.push(bottomCell?.height || null);
              heights.push(rightCell?.height || null);
              heights.push(bottomRightCell?.height || null);
            }
            if(heights.filter((h) => h == 50).length == 4) {
              this.computeResult.elementoCrocera += 2;
            } else if(heights.filter((h) => h == 75).length == 4) {
              this.computeResult.elementoCrocera += 2;
            } else if(heights.filter((h) => h == 100).length == 4) {
              this.computeResult.elementoCrocera += 2;
            } else if(heights.filter((h) => h == 50).length == 3 && heights.filter((h) => h == 75).length == 1) {
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH75 += 2;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 2;
              this.computeResult.elementoCrocera += 2;
            } else if(heights.filter((h) => h == 50).length == 3 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH100 += 2;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 2;
              this.computeResult.elementoCrocera += 2;
            } else if(heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.giuntoAlto += 1;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH75 += 1;
              this.computeResult.tiranteObliquoH100 += 2;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 2;
              this.computeResult.allinL += 1;
              this.computeResult.allinZ += 1;
            } else if(heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 75).length == 2) {
              this.computeResult.giuntoAlto += 2;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.piantana += 1;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 3) {
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH75 += 2;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 2;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 2 && heights.filter((h) => h == 100).length == 1) {
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH75 += 2;
              this.computeResult.tiranteObliquoH100 += 2;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 4;
              this.computeResult.piastraL += 4;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 2) {
              this.computeResult.giuntoAlto += 1;
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH75 += 1;
              this.computeResult.tiranteObliquoH100 += 1;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 2;
              this.computeResult.allinL += 2;
            } else if(heights.filter((h) => h == 75).length == 2 && heights.filter((h) => h == 100).length == 2) {
              this.computeResult.giuntoAlto += 2;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH75 += 1;
              this.computeResult.tiranteObliquoH100 += 1;
              this.computeResult.piantana += 1;
            } else if(heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 100).length == 2) {
              this.computeResult.giuntoAlto += 2;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH100 += 1;
              this.computeResult.piantana += 1;
            } else if(heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 100).length == 2) {
              this.computeResult.giuntoAlto += 2;
              this.computeResult.tiranteOrizzontale += 2;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH100 += 1;
              this.computeResult.piantana += 1;
            } else if(heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 100).length == 3) {
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH100 += 2;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 2;
            } else if(heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 3) {
              this.computeResult.tiranteOrizzontale += 4;
              this.computeResult.tiranteObliquoH50 += 4;
              this.computeResult.tiranteObliquoH75 += 1;
              this.computeResult.tiranteObliquoH100 += 3;
              this.computeResult.piantana += 1;
              this.computeResult.angolare += 2;
            }    
          }
        }
      });
    },

    getResults() {
      this.computeResult = {
        B25x25: 0,
        B25x50: 0,
        B50x50: 0,
        L25x25: 0,
        L25x50: 0,
        L25x75: 0,
        L25x100: 0,
        L50x50: 0,
        L50x75: 0,
        L50x100: 0,
        allinL: 0,
        allinZ: 0,
        angolare: 0,
        elementoCrocera: 0,
        giuntoAlto: 0,
        giuntoBasso: 0,
        piantana: 0,
        piastraAngolare: 0,
        piastraL: 0,
        piastraLineare: 0,
        spinottoCorto: 0,
        squadrettaAncoraggio: 0,
        tiranteObliquo: 0,
        tiranteObliquoH100: 0,
        tiranteObliquoH50: 0,
        tiranteObliquoH75: 0,
        tiranteOrizzontale: 0,
        points: []
      };
      this.getBasamenti();
      this.getLastre();
      this.getPoints();
      this.getAccessori();
    },
    
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
          vBlock: false,
          ignoredPoints: []
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
