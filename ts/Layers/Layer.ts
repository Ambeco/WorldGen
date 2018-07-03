import { LayerStub } from "./LayerStub.js";
import { NumberRange } from "../Util/NumberRange.js";

export interface Layer extends LayerStub {
    readonly subLayerLocations: NumberRange[];
    readonly genericSubLayers: LayerStub[];
}