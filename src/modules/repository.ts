import { FlowerBoxAccessory, FlowerBoxBottom, FlowerBoxFinishing, FlowerBoxLine } from "../appTypes";
import { lines, finishings, accessories, bottoms } from "./listino";

export function getLines(): FlowerBoxLine[] {
    return lines;
}

export function getFinishing(lineId: string, size: string): FlowerBoxFinishing[] {
    return finishings.filter((x) => x.line.id == lineId && x.isVisible == true && x.size == size);
}

export function getAccessories(lineId: string): FlowerBoxAccessory[] {
    const res: FlowerBoxAccessory[] = [];
    accessories.forEach(a => {
        if(a.lines.some((x: FlowerBoxLine) => x.id == lineId)) {
            res.push(a);
        }
    });
    return accessories;
}

export function getBottoms(lineId: string, size: string): FlowerBoxBottom[] {
    return bottoms.filter((x) => x.line.id == lineId && x.size == size);
}