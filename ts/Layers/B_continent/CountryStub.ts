import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";

export class CountryStub extends LayerStubBase {
    get layerName() { return "Country"; }

    generateFullData(): Layer {
        throw Error("TODO not implemented");
    }
}