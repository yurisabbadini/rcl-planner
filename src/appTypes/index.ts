export type DrawPlan = {
  rows: number;
  columns: number;
};

export type CellSectionPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type ToggleParams = {
  cellId: string;
  cellSectionId: string;
  row: number;
  column: number;
  section: number;
}

export type CellSectionCoordinates = {
  row: number;
  column: number;
  section: number;
}

export interface SelectedCellSections {
  [id: string]: {
    height: number;
    cellSectionId: string;
    ignored: boolean;
    isSquare: boolean;
    hBlock: boolean;
    vBlock: boolean;
  }
}

export type Point = {
  cellSectionId: string;
}

export type ComputeResult = {
  B25x25: number;
  B25x50: number;
  B50x50: number;
  L25x25: number;
  L25x50: number;
  L25x75: number;
  L25x100: number;
  L50x50: number;
  L50x75: number;
  L50x100: number;
  linearPoints: Point[];
  internalPoints: Point[];
  externalPoints: Point[];
  centralPoints: Point[];
}
