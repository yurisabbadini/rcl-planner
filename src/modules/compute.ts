import { CellSectionCoordinates, ComputeResult, Point, SelectedCellSections } from "../appTypes";

function initBlock(key: string, selectedCellSections: SelectedCellSections): void {
    if (selectedCellSections[key]) {
        selectedCellSections[key].ignored = false;
        selectedCellSections[key].hBlock = false;
        selectedCellSections[key].vBlock = false;
        selectedCellSections[key].isSquare = false;
    }
}

function parseCellSectionId(id: string): CellSectionCoordinates {
    const idParts = id.split("_");
    return {
        row: Number(idParts[0]),
        column: Number(idParts[1]),
        section: Number(idParts[2]),
    }
}

export function getCellSectionId(row: number, column: number, section: number): string {
    return `${row}_${column}_${section}`;
}

export function cellSectionParsed(key: string, selectedCellSections: SelectedCellSections): boolean {
    if (selectedCellSections[key]) {
        if (selectedCellSections[key].isSquare || selectedCellSections[key].hBlock || selectedCellSections[key].vBlock || selectedCellSections[key].ignored) {
            return true;
        }
    }
    return false;
}

export function checkIfSquare(key: string, selectedCellSections: SelectedCellSections): SelectedCellSections {
    const cellSectionCoordinates = parseCellSectionId(key);
    const section1Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 1);
    const section2Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 2);
    const section3Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 3);
    const section4Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 4);
    if (selectedCellSections[section1Id] && selectedCellSections[section2Id] && selectedCellSections[section3Id] && selectedCellSections[section4Id]) {
        const referenceHeight = selectedCellSections[section1Id].height;
        if (selectedCellSections[section1Id].height == referenceHeight && selectedCellSections[section2Id].height == referenceHeight && selectedCellSections[section3Id].height == referenceHeight && selectedCellSections[section4Id].height == referenceHeight) {
            initBlock(section1Id, selectedCellSections);
            selectedCellSections[section1Id].isSquare = true;
            selectedCellSections[section1Id].ignoredPoints = ["top-right", "bottom-right", "bottom-left"];
            initBlock(section2Id, selectedCellSections);
            selectedCellSections[section2Id].ignored = true;
            selectedCellSections[section2Id].ignoredPoints = ["top-left", "bottom-left", "bottom-right"];
            initBlock(section3Id, selectedCellSections);
            selectedCellSections[section3Id].ignored = true;
            selectedCellSections[section3Id].ignoredPoints = ["top-right", "bottom-right", "top-left"];
            initBlock(section4Id, selectedCellSections);
            selectedCellSections[section4Id].ignored = true;
            selectedCellSections[section4Id].ignoredPoints = ["top-right", "bottom-left", "top-left"];
            return selectedCellSections;
        }
    }
    if (selectedCellSections[section1Id]) {
        if (!cellSectionParsed(section1Id, selectedCellSections)) {
            initBlock(section1Id, selectedCellSections);
        }
    }
    if (selectedCellSections[section2Id]) {
        if (!cellSectionParsed(section2Id, selectedCellSections)) {
            initBlock(section2Id, selectedCellSections);
        }
    }
    if (selectedCellSections[section3Id]) {
        if (!cellSectionParsed(section3Id, selectedCellSections)) {
            initBlock(section3Id, selectedCellSections);
        }
    }
    if (selectedCellSections[section4Id]) {
        if (!cellSectionParsed(section4Id, selectedCellSections)) {
            initBlock(section4Id, selectedCellSections);
        }
    }
    return selectedCellSections;
}

export function checkIfHBlock(key: string, selectedCellSections: SelectedCellSections): SelectedCellSections {
    const cellSectionCoordinates = parseCellSectionId(key);
    const section1Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 1);
    const section2Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 2);
    const section3Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 3);
    const section4Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 4);
    if (cellSectionCoordinates.section == 1 && selectedCellSections[section2Id]) {
        if (selectedCellSections[section1Id].height == selectedCellSections[section2Id].height && !cellSectionParsed(section2Id, selectedCellSections)) {
            initBlock(section1Id, selectedCellSections);
            selectedCellSections[section1Id].hBlock = true;
            selectedCellSections[section1Id].ignoredPoints = ["bottom-right", "top-right"];
            initBlock(section2Id, selectedCellSections);
            selectedCellSections[section2Id].ignored = true;
            selectedCellSections[section2Id].ignoredPoints = ["bottom-left", "top-left"];
            return selectedCellSections;
        }
    } else if (cellSectionCoordinates.section == 3 && selectedCellSections[section4Id]) {
        if (selectedCellSections[section3Id].height == selectedCellSections[section4Id].height && !cellSectionParsed(section4Id, selectedCellSections)) {
            initBlock(section3Id, selectedCellSections);
            selectedCellSections[section3Id].hBlock = true;
            selectedCellSections[section3Id].ignoredPoints = ["bottom-right", "top-right"];
            initBlock(section4Id, selectedCellSections);
            selectedCellSections[section4Id].ignored = true;
            selectedCellSections[section4Id].ignoredPoints = ["bottom-left", "top-left"];
            return selectedCellSections;
        }
    } else {
        if (cellSectionCoordinates.section == 1) {
            initBlock(section1Id, selectedCellSections);
            initBlock(section2Id, selectedCellSections);
            if (!cellSectionParsed(section2Id, selectedCellSections)) {
                initBlock(section2Id, selectedCellSections);
            }
        }
        if (cellSectionCoordinates.section == 3) {
            initBlock(section3Id, selectedCellSections);
            if (!cellSectionParsed(section4Id, selectedCellSections)) {
                initBlock(section4Id, selectedCellSections);
            }
        }
    }
    return selectedCellSections;
}

export function checkIfVBlock(key: string, selectedCellSections: SelectedCellSections): SelectedCellSections {
    const cellSectionCoordinates = parseCellSectionId(key);
    const section1Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 1);
    const section2Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 2);
    const section3Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 3);
    const section4Id = getCellSectionId(cellSectionCoordinates.row, cellSectionCoordinates.column, 4);
    if (cellSectionCoordinates.section == 1 && selectedCellSections[section3Id] && !cellSectionParsed(section3Id, selectedCellSections)) {
        if (selectedCellSections[section1Id].height == selectedCellSections[section3Id].height) {
            initBlock(section1Id, selectedCellSections);
            selectedCellSections[section1Id].vBlock = true;
            selectedCellSections[section1Id].ignoredPoints = ["bottom-left", "bottom-right"];
            initBlock(section3Id, selectedCellSections);
            selectedCellSections[section3Id].ignored = true;
            selectedCellSections[section3Id].ignoredPoints = ["top-left", "top-right"];
            return selectedCellSections;
        }
    } else if (cellSectionCoordinates.section == 2 && selectedCellSections[section4Id] && !cellSectionParsed(section4Id, selectedCellSections)) {
        if (selectedCellSections[section2Id].height == selectedCellSections[section4Id].height) {
            initBlock(section2Id, selectedCellSections);
            selectedCellSections[section2Id].vBlock = true;
            selectedCellSections[section2Id].ignoredPoints = ["bottom-left", "bottom-right"];
            initBlock(section4Id, selectedCellSections);
            selectedCellSections[section4Id].ignored = true;
            selectedCellSections[section4Id].ignoredPoints = ["top-left", "top-right"];
            return selectedCellSections;
        }
    } else {
        if (cellSectionCoordinates.section == 1) {
            if (!cellSectionParsed(section1Id, selectedCellSections)) {
                initBlock(section1Id, selectedCellSections);
            }
            if (!cellSectionParsed(section3Id, selectedCellSections)) {
                initBlock(section3Id, selectedCellSections);
            }
        }
        if (cellSectionCoordinates.section == 2) {
            if (!cellSectionParsed(section2Id, selectedCellSections)) {
                initBlock(section2Id, selectedCellSections);
            }
            if (!cellSectionParsed(section4Id, selectedCellSections)) {
                initBlock(section4Id, selectedCellSections);
            }
        }
    }
    return selectedCellSections;
}

function getOverlappingPoints(row: number, column: number, section: number, position: "top-left" | "top-right" | "bottom-left" | "bottom-right"): Point[] {
    const res: Point[] = [];
    const nearCells = getCellSectionNearCells(row, column, section);

    if (position == "top-right") {
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
    } else if (position == "top-left") {
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
    } else if (position == "bottom-left") {
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
    } else if (position == "bottom-right") {
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
}

function getSingleBlockNearCells(row: number, column: number, section: number): {
    topCellSectionId: string;
    rightCellSectionId: string;
    bottomCellSectionId: string;
    leftCellSectionId: string;
} {
    let topCellSectionId = "";
    let rightCellSectionId = "";
    let bottomCellSectionId = "";
    let leftCellSectionId = "";
    if (section == 1) {
        topCellSectionId = getCellSectionId(row - 1, column, 3);
        rightCellSectionId = getCellSectionId(row, column, 2);
        bottomCellSectionId = getCellSectionId(row, column, 3);
        leftCellSectionId = getCellSectionId(row, column - 1, 2);
    } else if (section == 2) {
        topCellSectionId = getCellSectionId(row - 1, column, 4);
        rightCellSectionId = getCellSectionId(row, column + 1, 1);
        bottomCellSectionId = getCellSectionId(row, column, 4);
        leftCellSectionId = getCellSectionId(row, column, 1);
    } else if (section == 3) {
        topCellSectionId = getCellSectionId(row, column, 1);
        rightCellSectionId = getCellSectionId(row, column, 4);
        bottomCellSectionId = getCellSectionId(row + 1, column, 1);
        leftCellSectionId = getCellSectionId(row, column - 1, 4);
    } else if (section == 4) {
        topCellSectionId = getCellSectionId(row, column, 2);
        rightCellSectionId = getCellSectionId(row, column + 1, 3);
        bottomCellSectionId = getCellSectionId(row + 1, column, 2);
        leftCellSectionId = getCellSectionId(row, column, 3);
    }
    return {
        topCellSectionId,
        rightCellSectionId,
        bottomCellSectionId,
        leftCellSectionId
    };
}

function getVBlockNearCells(row: number, column: number, section: number): {
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

    if (section == 1) {
        topCellSectionId = getCellSectionId(row - 1, column, 3);
        rightTopCellSectionId = getCellSectionId(row, column, 2);
        rightBottomCellSectionId = getCellSectionId(row, column, 4);
        bottomCellSectionId = getCellSectionId(row + 1, column, 1);
        leftTopCellSectionId = getCellSectionId(row, column - 1, 2);
        leftBottomCellSectionId = getCellSectionId(row, column - 1, 4);
    } else if (section == 2) {
        topCellSectionId = getCellSectionId(row - 1, column, 4);
        rightTopCellSectionId = getCellSectionId(row, column + 1, 1);
        rightBottomCellSectionId = getCellSectionId(row, column + 1, 3);
        bottomCellSectionId = getCellSectionId(row + 1, column, 2);
        leftTopCellSectionId = getCellSectionId(row, column, 1);
        leftBottomCellSectionId = getCellSectionId(row, column, 3);
    }

    return {
        topCellSectionId,
        rightTopCellSectionId,
        rightBottomCellSectionId,
        bottomCellSectionId,
        leftTopCellSectionId,
        leftBottomCellSectionId
    };
}

function getHBlockNearCells(row: number, column: number, section: number): {
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

    if (section == 1) {
        topLeftCellSectionId = getCellSectionId(row - 1, column, 3);
        topRightCellSectionId = getCellSectionId(row - 1, column, 4);
        rightCellSectionId = getCellSectionId(row, column + 1, 1);
        bottomLeftCellSectionId = getCellSectionId(row, column, 3);
        bottomRightCellSectionId = getCellSectionId(row, column, 4);
        leftCellSectionId = getCellSectionId(row, column - 1, 2);
    } else if (section == 3) {
        topLeftCellSectionId = getCellSectionId(row, column, 1);
        topRightCellSectionId = getCellSectionId(row, column, 2);
        rightCellSectionId = getCellSectionId(row, column + 1, 3);
        bottomLeftCellSectionId = getCellSectionId(row + 1, column, 1);
        bottomRightCellSectionId = getCellSectionId(row + 1, column, 2);
        leftCellSectionId = getCellSectionId(row, column - 1, 4);
    }

    return {
        topLeftCellSectionId,
        topRightCellSectionId,
        rightCellSectionId,
        bottomLeftCellSectionId,
        bottomRightCellSectionId,
        leftCellSectionId
    };
}

function getSquareBlockNearCells(row: number, column: number): {
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

    topLeftCellSectionId = getCellSectionId(row - 1, column, 3);
    topRightCellSectionId = getCellSectionId(row - 1, column, 4);
    rightTopCellSectionId = getCellSectionId(row, column + 1, 1);
    rightBottomCellSectionId = getCellSectionId(row, column + 1, 3);
    bottomLeftCellSectionId = getCellSectionId(row + 1, column, 1);
    bottomRightCellSectionId = getCellSectionId(row + 1, column, 2);
    leftTopCellSectionId = getCellSectionId(row, column - 1, 2);
    leftBottomCellSectionId = getCellSectionId(row, column - 1, 4);

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
}

function getCellSectionNearCells(row: number, column: number, section: number): {
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

    if (section == 1) {
        topCellSectionId = getCellSectionId(row - 1, column, 3);
        topLeftCellSectionId = getCellSectionId(row - 1, column - 1, 4);
        topRightCellSectionId = getCellSectionId(row - 1, column, 4);
        rightCellSectionId = getCellSectionId(row, column, 2);
        leftCellSectionId = getCellSectionId(row, column - 1, 2);
        bottomCellSectionId = getCellSectionId(row, column, 3);
        bottomLeftCellSectionId = getCellSectionId(row, column - 1, 4);
        bottomRightCellSectionId = getCellSectionId(row, column, 4);
    } else if (section == 2) {
        topCellSectionId = getCellSectionId(row - 1, column, 4);
        topLeftCellSectionId = getCellSectionId(row - 1, column, 3);
        topRightCellSectionId = getCellSectionId(row - 1, column + 1, 3);
        rightCellSectionId = getCellSectionId(row, column + 1, 1);
        leftCellSectionId = getCellSectionId(row, column, 1);
        bottomCellSectionId = getCellSectionId(row, column, 4);
        bottomLeftCellSectionId = getCellSectionId(row, column, 3);
        bottomRightCellSectionId = getCellSectionId(row, column + 1, 3);
    } else if (section == 3) {
        topCellSectionId = getCellSectionId(row, column, 1);
        topLeftCellSectionId = getCellSectionId(row, column - 1, 2);
        topRightCellSectionId = getCellSectionId(row, column, 2);
        rightCellSectionId = getCellSectionId(row, column, 4);
        leftCellSectionId = getCellSectionId(row, column - 1, 4);
        bottomCellSectionId = getCellSectionId(row + 1, column, 1);
        bottomLeftCellSectionId = getCellSectionId(row + 1, column - 1, 2);
        bottomRightCellSectionId = getCellSectionId(row + 1, column, 2);
    } else if (section == 4) {
        topCellSectionId = getCellSectionId(row, column, 2);
        topLeftCellSectionId = getCellSectionId(row, column, 1);
        topRightCellSectionId = getCellSectionId(row, column + 1, 1);
        rightCellSectionId = getCellSectionId(row, column + 1, 3);
        leftCellSectionId = getCellSectionId(row, column, 3);
        bottomCellSectionId = getCellSectionId(row + 1, column, 2);
        bottomLeftCellSectionId = getCellSectionId(row + 1, column, 1);
        bottomRightCellSectionId = getCellSectionId(row + 1, column + 1, 1);
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
}

function getLastreSingle(singleSlabs: boolean, selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    const singles = data.filter((x) => !x.isSquare && !x.hBlock && !x.vBlock && !x.ignored);

    const blocks25x50singles = singles.filter((x) => x.height == 50);
    const blocks25x75singles = singles.filter((x) => x.height == 75);
    const blocks25x100singles = singles.filter((x) => x.height == 100);

    blocks25x50singles.forEach((x) => {
        computeResult.L25x50 += 4;
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getSingleBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.rightCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.bottomCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.leftCellSectionId]) {
            computeResult.L25x50--;
        }
    });

    blocks25x75singles.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L25x50 += 4;
            computeResult.L25x25 += 4;
        } else {
            computeResult.L25x75 += 4;
        }
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getSingleBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                if (selectedCellSections[nearCells.topCellSectionId].height != 50) {
                    computeResult.L25x25--;
                }
            } else {
                computeResult.L25x75--;
                if (selectedCellSections[nearCells.topCellSectionId].height == 50) {
                    computeResult.L25x25++;
                }
            }
        }
        if (selectedCellSections[nearCells.rightCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                if (selectedCellSections[nearCells.rightCellSectionId].height != 50) {
                    computeResult.L25x25--;
                }
            } else {
                computeResult.L25x75--;
                if (selectedCellSections[nearCells.rightCellSectionId].height == 50) {
                    computeResult.L25x25++;
                }
            }
        }
        if (selectedCellSections[nearCells.bottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                if (selectedCellSections[nearCells.bottomCellSectionId].height != 50) {
                    computeResult.L25x25--;
                }
            } else {
                computeResult.L25x75--;
                if (selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
                    computeResult.L25x25++;
                }
            }
        }
        if (selectedCellSections[nearCells.leftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                if (selectedCellSections[nearCells.leftCellSectionId].height != 50) {
                    computeResult.L25x25--;
                }
            } else {
                computeResult.L25x75--;
                if (selectedCellSections[nearCells.leftCellSectionId].height == 50) {
                    computeResult.L25x25++;
                }
            }
        }
    });

    blocks25x100singles.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L25x50 += 8;
        } else {
            computeResult.L25x100 += 4;
        }
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getSingleBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.topCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.topCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.rightCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.rightCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.rightCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.bottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.bottomCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.leftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.leftCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.leftCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
    });

    return computeResult;
}

function getLastreVBlock(singleSlabs: boolean, selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    const vBlocks = data.filter((x) => x.vBlock);

    const blocksH50vBlocks = vBlocks.filter((x) => x.height == 50);
    const blocksH75vBlocks = vBlocks.filter((x) => x.height == 75);
    const blocksH100vBlocks = vBlocks.filter((x) => x.height == 100);

    blocksH50vBlocks.forEach((x) => {
        computeResult.L25x50 += 2;
        computeResult.L50x50 += 2;

        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getVBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] || selectedCellSections[nearCells.rightBottomCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] && selectedCellSections[nearCells.rightBottomCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] || selectedCellSections[nearCells.leftBottomCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] && selectedCellSections[nearCells.leftBottomCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.bottomCellSectionId]) {
            computeResult.L25x50--;
        }
    });

    blocksH75vBlocks.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L25x25 += 2;
            computeResult.L25x50 += 2;
            computeResult.L50x50 += 2;
            computeResult.L25x50 += 2;
        } else {
            computeResult.L50x75 += 2;
            computeResult.L25x75 += 2;
        }

        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getVBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.topCellSectionId].height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] || selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] && selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] || selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] && selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.bottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
                computeResult.L25x25++;
            }
        }
    });

    blocksH100vBlocks.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L25x50 += 4;
            computeResult.L50x50 += 4;
        } else {
            computeResult.L50x100 += 2;
            computeResult.L25x100 += 2;
        }

        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getVBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.topCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.topCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] || selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] && selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75 && selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] || selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] && selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75 && selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.bottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.bottomCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.bottomCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
    });

    return computeResult;
}

function getLastreHBlock(singleSlabs: boolean, selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    const hBlocks = data.filter((x) => x.hBlock);

    const blocksH50hBlocks = hBlocks.filter((x) => x.height == 50);
    const blocksH75hBlocks = hBlocks.filter((x) => x.height == 75);
    const blocksH100hBlocks = hBlocks.filter((x) => x.height == 100);

    blocksH50hBlocks.forEach((x) => {
        computeResult.L25x50 += 2;
        computeResult.L50x50 += 2;

        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getHBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topRightCellSectionId] || selectedCellSections[nearCells.topLeftCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.topRightCellSectionId] && selectedCellSections[nearCells.topLeftCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.rightCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.rightCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.bottomLeftCellSectionId] || selectedCellSections[nearCells.bottomRightCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.bottomLeftCellSectionId] && selectedCellSections[nearCells.bottomRightCellSectionId]) {
            computeResult.L25x50--;
        }
    });

    blocksH75hBlocks.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L25x25 += 2;
            computeResult.L25x50 += 2;
            computeResult.L50x50 += 2;
            computeResult.L25x50 += 2;
        } else {
            computeResult.L50x75 += 2;
            computeResult.L25x75 += 2;
        }

        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getHBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topRightCellSectionId] || selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.topRightCellSectionId] && selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.rightCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.rightCellSectionId].height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.leftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.leftCellSectionId].height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.bottomRightCellSectionId] || selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.bottomRightCellSectionId] && selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
    });

    blocksH100hBlocks.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L25x50 += 4;
            computeResult.L50x50 += 4;
        } else {
            computeResult.L50x100 += 2;
            computeResult.L25x100 += 2;
        }

        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getHBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCells.topRightCellSectionId] || selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.topRightCellSectionId] && selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 75 && selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.rightCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.rightCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.rightCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.leftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.leftCellSectionId].height == 50) {
                computeResult.L25x50++;
            } else if (selectedCellSections[nearCells.leftCellSectionId].height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.bottomRightCellSectionId] || selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.bottomRightCellSectionId] && selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75 && selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
    });

    return computeResult;
}

function getLastreSquare(singleSlabs: boolean, selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    const squareBlocks = data.filter((x) => x.isSquare);

    const blocksH50squares = squareBlocks.filter((x) => x.height == 50);
    const blocksH75squares = squareBlocks.filter((x) => x.height == 75);
    const blocksH100squares = squareBlocks.filter((x) => x.height == 100);

    blocksH50squares.forEach((x) => {
        computeResult.L50x50 += 4;
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getSquareBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column);

        if (selectedCellSections[nearCells.topRightCellSectionId] || selectedCellSections[nearCells.topLeftCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.topRightCellSectionId] && selectedCellSections[nearCells.topLeftCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] || selectedCellSections[nearCells.rightBottomCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] && selectedCellSections[nearCells.rightBottomCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] || selectedCellSections[nearCells.leftBottomCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] && selectedCellSections[nearCells.leftBottomCellSectionId]) {
            computeResult.L25x50--;
        }
        if (selectedCellSections[nearCells.bottomLeftCellSectionId] || selectedCellSections[nearCells.bottomRightCellSectionId]) {
            computeResult.L50x50--;
            computeResult.L25x50++;
        }
        if (selectedCellSections[nearCells.bottomLeftCellSectionId] && selectedCellSections[nearCells.bottomRightCellSectionId]) {
            computeResult.L25x50--;
        }
    });

    blocksH75squares.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L50x50 += 4;
            computeResult.L25x50 += 4;
        } else {
            computeResult.L50x75 += 4;
        }

        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getSquareBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column);

        if (selectedCellSections[nearCells.topRightCellSectionId] || selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.topRightCellSectionId] && selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] || selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] && selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] || selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] && selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
        if (selectedCellSections[nearCells.bottomRightCellSectionId] || selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50--;
                computeResult.L25x50--;
                computeResult.L25x50++;
                computeResult.L25x25++;
            } else {
                computeResult.L50x75--;
                computeResult.L25x75++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.bottomRightCellSectionId] && selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50--;
                computeResult.L25x25--;
            } else {
                computeResult.L25x75--;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
    });

    blocksH100squares.forEach((x) => {
        if (!singleSlabs) {
            computeResult.L50x50 += 8;
        } else {
            computeResult.L50x100 += 4;
        }
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCells = getSquareBlockNearCells(currentCellCoordinates.row, currentCellCoordinates.column);

        if (selectedCellSections[nearCells.topRightCellSectionId] || selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.topRightCellSectionId] && selectedCellSections[nearCells.topLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.topLeftCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.topRightCellSectionId]?.height == 75 && selectedCellSections[nearCells.topLeftCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }

        if (selectedCellSections[nearCells.rightTopCellSectionId] || selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.rightTopCellSectionId] && selectedCellSections[nearCells.rightBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.rightTopCellSectionId]?.height == 75 && selectedCellSections[nearCells.rightBottomCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }

        if (selectedCellSections[nearCells.leftTopCellSectionId] || selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.leftTopCellSectionId] && selectedCellSections[nearCells.leftBottomCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 50 && selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.leftTopCellSectionId]?.height == 75 && selectedCellSections[nearCells.leftBottomCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }


        if (selectedCellSections[nearCells.bottomRightCellSectionId] || selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L50x50 -= 2;
                computeResult.L25x50 += 2;
            } else {
                computeResult.L50x100--;
                computeResult.L25x100++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x50++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
            if (selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
                computeResult.L25x25++;
            }
        }
        if (selectedCellSections[nearCells.bottomRightCellSectionId] && selectedCellSections[nearCells.bottomLeftCellSectionId]) {
            if (!singleSlabs) {
                computeResult.L25x50 -= 2;
            } else {
                computeResult.L25x100--;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 50 && selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 50) {
                computeResult.L25x50 -= 2;
                computeResult.L50x50++;
            }
            if (selectedCellSections[nearCells.bottomRightCellSectionId]?.height == 75 && selectedCellSections[nearCells.bottomLeftCellSectionId]?.height == 75) {
                computeResult.L25x25 -= 2;
                computeResult.L25x50++;
            }
        }
    });

    return computeResult;
}

export function getLastre(singleSlabs: boolean, selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    computeResult = getLastreSingle(singleSlabs, selectedCellSections, computeResult);
    computeResult = getLastreVBlock(singleSlabs, selectedCellSections, computeResult);
    computeResult = getLastreHBlock(singleSlabs, selectedCellSections, computeResult);
    computeResult = getLastreSquare(singleSlabs, selectedCellSections, computeResult);

    computeResult.L25x50 += computeResult.L25x100 * 2;
    computeResult.L25x100 = 0;
    computeResult.L25x50 += computeResult.L25x75;
    computeResult.L25x25 += computeResult.L25x75;
    computeResult.L25x75 = 0;
    
    return computeResult;
}

export function getBasamenti(selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    computeResult.B25x50 = data.filter((x) => x.hBlock).length + data.filter((x) => x.vBlock).length;
    computeResult.B50x50 = data.filter((x) => x.isSquare).length;
    computeResult.B25x25 = data.filter((x) => !x.isSquare && !x.hBlock && !x.vBlock && !x.ignored).length;
    return computeResult;
}

function getLinearPoints(selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    data.forEach((x) => {
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        if (selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-left",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
        if (selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-right",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
        if (selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-left",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
        if (selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-left",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
        if (selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-right",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
        if (selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-right",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
        if (selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-left",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
        if (selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-right",
                    type: "linear"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
    });

    return computeResult;
}

function getInternalPoints(selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    data.forEach((x) => {
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (!selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-left",
                    type: "internal"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (!selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-right",
                    type: "internal"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (!selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-left",
                    type: "internal"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (!selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-right",
                    type: "internal"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
    });

    return computeResult;
}

function getExternalPoints(selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    data.forEach((x) => {
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId)) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-left",
                    type: "external"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId)) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-right",
                    type: "external"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId)) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-left",
                    type: "external"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            !selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId)) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-right",
                    type: "external"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
    });
    return computeResult;
}

function getCentralPoints(selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    const data = Object.values(selectedCellSections);
    data.forEach((x) => {
        const currentCellCoordinates = parseCellSectionId(x.cellSectionId);
        const nearCellCoordinates = getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);

        if (selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            selectedCellSections[nearCellCoordinates.topLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-left",
                    type: "central"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            selectedCellSections[nearCellCoordinates.topCellSectionId] &&
            selectedCellSections[nearCellCoordinates.topRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "top-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("top-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "top-right",
                    type: "central"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "top-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (selectedCellSections[nearCellCoordinates.leftCellSectionId] &&
            selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            selectedCellSections[nearCellCoordinates.bottomLeftCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-left" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-left")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-left",
                    type: "central"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-left");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }

        if (selectedCellSections[nearCellCoordinates.rightCellSectionId] &&
            selectedCellSections[nearCellCoordinates.bottomCellSectionId] &&
            selectedCellSections[nearCellCoordinates.bottomRightCellSectionId]
        ) {
            if (!computeResult.points.find((p) => p.position == "bottom-right" && p.cellSectionId == x.cellSectionId) && !x.ignoredPoints.includes("bottom-right")) {
                computeResult.points.push({
                    cellSectionId: x.cellSectionId,
                    position: "bottom-right",
                    type: "central"
                });
                const ignoredPoints = getOverlappingPoints(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section, "bottom-right");
                ignoredPoints.forEach((p) => {
                    computeResult.points.push(p);
                });
            }
        }
    });

    return computeResult;
}

export function getPoints(selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    computeResult = getLinearPoints(selectedCellSections, computeResult);
    computeResult = getInternalPoints(selectedCellSections, computeResult);
    computeResult = getExternalPoints(selectedCellSections, computeResult);
    computeResult = getCentralPoints(selectedCellSections, computeResult);

    return computeResult;
}

export function getAccessori(selectedCellSections: SelectedCellSections, computeResult: ComputeResult): ComputeResult {
    computeResult.points.forEach((p) => {
        const cell = selectedCellSections[p.cellSectionId];
        const currentCellCoordinates = parseCellSectionId(p.cellSectionId);
        const nearCellSections = getCellSectionNearCells(currentCellCoordinates.row, currentCellCoordinates.column, currentCellCoordinates.section);
        const topCell = selectedCellSections[nearCellSections.topCellSectionId];
        const leftCell = selectedCellSections[nearCellSections.leftCellSectionId];
        const rightCell = selectedCellSections[nearCellSections.rightCellSectionId];
        const bottomCell = selectedCellSections[nearCellSections.bottomCellSectionId];
        const topLeftCell = selectedCellSections[nearCellSections.topLeftCellSectionId];
        const topRightCell = selectedCellSections[nearCellSections.topRightCellSectionId];
        const bottomRightCell = selectedCellSections[nearCellSections.bottomRightCellSectionId];
        const bottomLeftCell = selectedCellSections[nearCellSections.bottomLeftCellSectionId];
        if (cell) {
            if (p.type == "linear") {
                const heights: (number | null)[] = [cell.height];
                if (p.position == "top-left") {
                    heights.push(leftCell?.height || null);
                } else if (p.position == "top-right") {
                    heights.push(rightCell?.height || null);
                } else if (p.position == "bottom-left") {
                    heights.push(leftCell?.height || null);
                } if (p.position == "bottom-right") {
                    heights.push(rightCell?.height || null);
                }
                if (heights.filter((h) => h == 50).length == 2) {
                    computeResult.giuntoAlto += 1;
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 1;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 1) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 1;
                    computeResult.angolare += 2;
                    computeResult.piastraL += 1;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 1;
                    computeResult.angolare += 2;
                    computeResult.piastraL += 1;
                } else if (heights.filter((h) => h == 75).length == 2) {
                    computeResult.giuntoAlto += 1;
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.piastraLineare += 1;
                } else if (heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.angolare += 2;
                    computeResult.piastraLineare += 1;
                    computeResult.allinZ += 1;
                    computeResult.allinL += 1;
                } else if (heights.filter((h) => h == 100).length == 2) {
                    computeResult.giuntoAlto += 1;
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.piastraLineare += 1;
                }
            } else if (p.type == "internal") {
                if (cell.height == 50) {
                    computeResult.angolare += 2;
                    computeResult.squadrettaAncoraggio += 1;
                } else if (cell.height == 75) {
                    computeResult.angolare += 2;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraAngolare += 1;
                } else if (cell.height == 100) {
                    computeResult.angolare += 2;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraAngolare += 1;
                }
            } else if (p.type == "external") {
                const heights: (number | null)[] = [cell.height];
                if (p.position == "top-left") {
                    heights.push(topCell?.height || null);
                    heights.push(leftCell?.height || null);
                } else if (p.position == "top-right") {
                    heights.push(topCell?.height || null);
                    heights.push(rightCell?.height || null);
                } else if (p.position == "bottom-left") {
                    heights.push(bottomCell?.height || null);
                    heights.push(leftCell?.height || null);
                } if (p.position == "bottom-right") {
                    heights.push(bottomCell?.height || null);
                    heights.push(rightCell?.height || null);
                }
                if (heights.filter((h) => h == 50).length == 3) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.angolare += 2;
                    computeResult.squadrettaAncoraggio += 1;
                } else if (heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 75).length == 1) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.angolare += 4;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraL += 1;
                } else if (heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.angolare += 4;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraL += 1;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 2) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.angolare += 6;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraL += 2;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.angolare += 6;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraL += 2;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 100).length == 2) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.angolare += 6;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraL += 2;
                } else if (heights.filter((h) => h == 75).length == 2 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.angolare += 4;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraAngolare += 1;
                    computeResult.allinZ += 1;
                    computeResult.allinL += 1;
                } else if (heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 2) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.angolare += 6;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraAngolare += 1;
                    computeResult.allinZ += 2;
                } else if (heights.filter((h) => h == 75).length == 3) {
                    computeResult.giuntoBasso += 1;
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.angolare += 2;
                    computeResult.squadrettaAncoraggio += 1;
                    computeResult.piastraAngolare += 1;
                }
            } else if (p.type == "central") {
                const heights: (number | null)[] = [cell.height];
                if (p.position == "top-left") {
                    heights.push(topCell?.height || null);
                    heights.push(leftCell?.height || null);
                    heights.push(topLeftCell?.height || null);
                } else if (p.position == "top-right") {
                    heights.push(topCell?.height || null);
                    heights.push(rightCell?.height || null);
                    heights.push(topRightCell?.height || null);
                } else if (p.position == "bottom-left") {
                    heights.push(bottomCell?.height || null);
                    heights.push(leftCell?.height || null);
                    heights.push(bottomLeftCell?.height || null);
                } if (p.position == "bottom-right") {
                    heights.push(bottomCell?.height || null);
                    heights.push(rightCell?.height || null);
                    heights.push(bottomRightCell?.height || null);
                }
                if (heights.filter((h) => h == 50).length == 4) {
                    computeResult.elementoCrocera += 2;
                } else if (heights.filter((h) => h == 75).length == 4) {
                    computeResult.elementoCrocera += 2;
                } else if (heights.filter((h) => h == 100).length == 4) {
                    computeResult.elementoCrocera += 2;
                } else if (heights.filter((h) => h == 50).length == 3 && heights.filter((h) => h == 75).length == 1) {
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH75 += 2;
                    computeResult.piantana += 1;
                    computeResult.angolare += 2;
                    computeResult.elementoCrocera += 2;
                } else if (heights.filter((h) => h == 50).length == 3 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH100 += 2;
                    computeResult.piantana += 1;
                    computeResult.angolare += 2;
                    computeResult.elementoCrocera += 2;
                } else if (heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.giuntoAlto += 1;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH75 += 1;
                    computeResult.tiranteObliquoH100 += 2;
                    computeResult.piantana += 1;
                    computeResult.angolare += 2;
                    computeResult.allinL += 1;
                    computeResult.allinZ += 1;
                } else if (heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 75).length == 2) {
                    computeResult.giuntoAlto += 2;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.piantana += 1;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 3) {
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH75 += 2;
                    computeResult.piantana += 1;
                    computeResult.angolare += 2;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 2 && heights.filter((h) => h == 100).length == 1) {
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH75 += 2;
                    computeResult.tiranteObliquoH100 += 2;
                    computeResult.piantana += 1;
                    computeResult.angolare += 4;
                    computeResult.piastraL += 4;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 2) {
                    computeResult.giuntoAlto += 1;
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH75 += 1;
                    computeResult.tiranteObliquoH100 += 1;
                    computeResult.piantana += 1;
                    computeResult.angolare += 2;
                    computeResult.allinL += 2;
                } else if (heights.filter((h) => h == 75).length == 2 && heights.filter((h) => h == 100).length == 2) {
                    computeResult.giuntoAlto += 2;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH75 += 1;
                    computeResult.tiranteObliquoH100 += 1;
                    computeResult.piantana += 1;
                } else if (heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 100).length == 2) {
                    computeResult.giuntoAlto += 2;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH100 += 1;
                    computeResult.piantana += 1;
                } else if (heights.filter((h) => h == 50).length == 2 && heights.filter((h) => h == 100).length == 2) {
                    computeResult.giuntoAlto += 2;
                    computeResult.tiranteOrizzontale += 2;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH100 += 1;
                    computeResult.piantana += 1;
                } else if (heights.filter((h) => h == 50).length == 1 && heights.filter((h) => h == 100).length == 3) {
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH100 += 2;
                    computeResult.piantana += 1;
                    computeResult.angolare += 2;
                } else if (heights.filter((h) => h == 75).length == 1 && heights.filter((h) => h == 100).length == 3) {
                    computeResult.tiranteOrizzontale += 4;
                    computeResult.tiranteObliquoH50 += 4;
                    computeResult.tiranteObliquoH75 += 1;
                    computeResult.tiranteObliquoH100 += 3;
                    computeResult.piantana += 1;
                    computeResult.angolare += 2;
                }
            }
        }
    });

    return computeResult;
}