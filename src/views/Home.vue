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
          :lines="lines"
          @planDataChanged="planDataChanged($event)"
          @clearDraw="clearDraw"
          @selectedBlockChanged="selectedBlockChanged($event)"
          @lineChanged="lineChanged($event)"
          @finishChanged="finishChanged($event)"
        />
        <br/>
        <input type="checkbox" name="singleSlabs" v-model="singleSlabs">
        <label for="singleSlabs">Lastre altezza unica</label>
        <br/>
        <q-btn color="accent" :label="t('computeLabel')" @click="getResults" />
        <h3>{{price.toFixed(2)}} &euro;</h3>
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
import { DrawPlan, SelectedCellSections, ToggleParams, ComputeResult, FlowerBoxLine } from "../appTypes";
import { useI18n } from "vue-i18n";
import { cellSectionParsed, checkIfSquare, checkIfHBlock, checkIfVBlock, getCellSectionId, getBasamenti, getLastre, getPoints, getAccessori } from "../modules/compute";
import { getLines, getFinishing, getAccessories, getBottoms } from "../modules/repository";

/*
SEGNARE COME ROSSE CASELLE DEL DISEGNO E IMPEDIRE IL CALCOLA SE CI SONO ERRORI
GLI ERRORI CI SONO SE SIAMO NEL CASO DI UNA 'COMPOSIZIONE BASE' (QUELLE DELL'EXCEL) CHE SI DISPONE OLTRE I BORDI DI UNA CELLA
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
      lines: [] as FlowerBoxLine[],
      line: "",
      finish: "",
      drawPlan: { 
        rows: 30,
        columns: 30
      } as DrawPlan,
      drawSelection: "" as string,
      sectionSize: 0 as number,
      selectedCellSections: {} as SelectedCellSections,
      singleSlabs: true,
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
        points: [],
      } as ComputeResult,
      price: 0 as number
    }
  },
  mounted () {
    this.getCellSize();
		this.$nextTick(() => {
			window.addEventListener("resize", this.getCellSize);
		});
    this.lines = getLines();
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

    lineChanged(data: string) {
      this.line = data;
    },

    finishChanged(data: string) {
      this.finish = data;
    },

    getCellSize() {
      try {
        const wrapperSize = (this.$refs.planWrapper as HTMLDivElement).offsetWidth;
        this.sectionSize = wrapperSize / (this.drawPlan.columns * 2);
      } catch {
        //
      }
    },

    clearDraw() {
      const data = Object.values(this.selectedCellSections);
      data.forEach((x) => {
        this.removeSelectedCellSection(x.cellSectionId);
      });
    },

    selectedBlockChanged(data: string) {
      this.drawSelection = data;
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
      getBasamenti(this.selectedCellSections, this.computeResult);
      getLastre(this.singleSlabs, this.selectedCellSections, this.computeResult);
      getPoints(this.selectedCellSections, this.computeResult);
      getAccessori(this.singleSlabs, this.selectedCellSections, this.computeResult);

      const bottom25x25 = Number(getBottoms(this.line, "25x25")[0]?.price || 0);
      const bottom25x50 = Number(getBottoms(this.line, "25x50")[0]?.price || 0);
      const bottom50x50 = Number(getBottoms(this.line, "50x50")[0]?.price || 0);

      const finishings25x25 = Number(getFinishing(this.line, "25x25")[0]?.price || 0);
      const finishings25x50 = Number(getFinishing(this.line, "25x50")[0]?.price || 0);
      const finishings25x75 = Number(getFinishing(this.line, "25x75")[0]?.price || 0);
      const finishings25x100 = Number(getFinishing(this.line, "25x100")[0]?.price || 0);
      const finishings50x50 = Number(getFinishing(this.line, "50x50")[0]?.price || 0);
      const finishings50x75 = Number(getFinishing(this.line, "50x75")[0]?.price || 0);
      const finishings50x100 = Number(getFinishing(this.line, "50x100")[0]?.price || 0);

      const accessories = getAccessories(this.line); 

      this.price = 0;
      this.price += this.computeResult.B25x25 * bottom25x25;
      this.price += this.computeResult.B25x50 * bottom25x50;
      this.price += this.computeResult.B50x50 * bottom50x50;
      this.price += this.computeResult.L25x25 * finishings25x25;
      this.price += this.computeResult.L25x50 * finishings25x50;
      this.price += this.computeResult.L25x75 * finishings25x75;
      this.price += this.computeResult.L25x100 * finishings25x100;
      this.price += this.computeResult.L50x50 * finishings50x50;
      this.price += this.computeResult.L50x75 * finishings50x75;
      this.price += this.computeResult.L50x100 * finishings50x100;

      const line = this.lines.find((x) => x.id == this.line);
      this.price += this.computeResult.allinL * Number(accessories.find((x) => x.id == "allinL")?.price || 0);
      this.price += this.computeResult.allinZ * Number(accessories.find((x) => x.id == "allinZ")?.price || 0);
      this.price += this.computeResult.angolare * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "angolare_gres" : "angolare"))?.price || 0);
      this.price += this.computeResult.elementoCrocera * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "crocera_gres" : "crocera"))?.price || 0);
      this.price += this.computeResult.giuntoAlto * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "giuntoAlto_gres" : "giuntoAlto"))?.price || 0);
      this.price += this.computeResult.giuntoBasso * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "giuntoBasso_gres" : "giuntoBasso"))?.price || 0);
      this.price += this.computeResult.piantana * Number(accessories.find((x) => x.id == "piantana")?.price || 0);
      this.price += this.computeResult.piastraAngolare * Number(accessories.find((x) => x.id == "piastraAngolare")?.price || 0);
      this.price += this.computeResult.piastraL * Number(accessories.find((x) => x.id == "piastraL")?.price || 0);
      this.price += this.computeResult.piastraLineare * Number(accessories.find((x) => x.id == "piastraLineare")?.price || 0);
      this.price += this.computeResult.spinottoCorto * Number(accessories.find((x) => x.id == "spinottoCorto")?.price || 0);
      this.price += this.computeResult.squadrettaAncoraggio * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "squadrettaAncoraggio_gres" : "squadrettaAncoraggio"))?.price || 0);
      this.price += this.computeResult.tiranteObliquoH100 * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "tiranteObliquo100_gres45" : "tiranteObliquo100"))?.price || 0);
      this.price += this.computeResult.tiranteObliquoH50 * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "tiranteObliquo50_gres45" : "tiranteObliquo50"))?.price || 0);
      this.price += this.computeResult.tiranteObliquoH75 * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "tiranteObliquo75_gres45" : "tiranteObliquo75"))?.price || 0);
      this.price += this.computeResult.tiranteOrizzontale * Number(accessories.find((x) => x.id == (line?.name.toLowerCase().includes("gres") ? "tiranteOrizzontale_gres45" : "tiranteOrizzontale"))?.price || 0);
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
          let cellSectionId = getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        } else if(this.selectedCellSections[params.cellSectionId]?.hBlock) {
          if(params.section === 1) {
            let cellSectionId = getCellSectionId(params.row, params.column, 1);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = getCellSectionId(params.row, params.column, 2);
            this.removeSelectedCellSection(cellSectionId);
          } else if(params.section === 3) {
            let cellSectionId = getCellSectionId(params.row, params.column, 3);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = getCellSectionId(params.row, params.column, 4);
            this.removeSelectedCellSection(cellSectionId);
          }
        } else if(this.selectedCellSections[params.cellSectionId]?.vBlock) {
          if(params.section === 1) {
            let cellSectionId = getCellSectionId(params.row, params.column, 1);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = getCellSectionId(params.row, params.column, 3);
            this.removeSelectedCellSection(cellSectionId);
          } else if(params.section === 2) {
            let cellSectionId = getCellSectionId(params.row, params.column, 2);
            this.removeSelectedCellSection(cellSectionId);
            cellSectionId = getCellSectionId(params.row, params.column, 4);
            this.removeSelectedCellSection(cellSectionId);
          }
        } else {
          this.toggleCellSection(params.cellSectionId);
        }
      } else if(this.blockSize == "25x50") {
        if(this.selectedCellSections[params.cellSectionId]?.isSquare) {
          let cellSectionId = getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        } else {
          if(params.section === 2) {
            params.section = 1;
          }
          if(params.section === 4) {
            params.section = 3;
          }
          const section1Id = getCellSectionId(params.row, params.column, 1); 
          const section2Id = getCellSectionId(params.row, params.column, 2); 
          const section3Id = getCellSectionId(params.row, params.column, 3); 
          const section4Id = getCellSectionId(params.row, params.column, 4); 
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
          let cellSectionId = getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        } else {
          if(params.section === 3) {
            params.section = 1;
          }
          if(params.section === 4) {
            params.section = 2;
          }
          const section1Id = getCellSectionId(params.row, params.column, 1); 
          const section2Id = getCellSectionId(params.row, params.column, 2); 
          const section3Id = getCellSectionId(params.row, params.column, 3); 
          const section4Id = getCellSectionId(params.row, params.column, 4); 
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
          let cellSectionId = getCellSectionId(params.row, params.column, 1);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 2);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 3);
          this.removeSelectedCellSection(cellSectionId);
          cellSectionId = getCellSectionId(params.row, params.column, 4);
          this.removeSelectedCellSection(cellSectionId);
        }
        let cellSectionId = getCellSectionId(params.row, params.column, 1);
        this.toggleCellSection(cellSectionId);
        cellSectionId = getCellSectionId(params.row, params.column, 2);
        this.toggleCellSection(cellSectionId);
        cellSectionId = getCellSectionId(params.row, params.column, 3);
        this.toggleCellSection(cellSectionId);
        cellSectionId = getCellSectionId(params.row, params.column, 4);
        this.toggleCellSection(cellSectionId);
      }
      var keys = Object.keys(this.selectedCellSections);
      keys.sort();
      for (let key of keys) {
        if(!cellSectionParsed(key, this.selectedCellSections)) {
          this.selectedCellSections = checkIfSquare(key, this.selectedCellSections);
        }
        if(!cellSectionParsed(key, this.selectedCellSections)) {
          this.selectedCellSections = checkIfHBlock(key, this.selectedCellSections);
        }
        if(!cellSectionParsed(key, this.selectedCellSections)) {
          this.selectedCellSections = checkIfVBlock(key, this.selectedCellSections);
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

<i18n>
{
  "it": {
    "computeLabel": "Calcola"
  }
}
</i18n>
