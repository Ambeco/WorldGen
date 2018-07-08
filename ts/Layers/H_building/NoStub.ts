import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";

export class NoStub extends LayerStubBase {
    get layerName() { return "NoStub"; }

    generateFullData(): Layer {
        throw Error("not implemented");
    }
}