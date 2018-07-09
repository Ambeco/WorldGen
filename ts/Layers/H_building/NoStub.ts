import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { LayerEnum } from "../LayerStub.js";

export class NoStub extends LayerStubBase {
    get layer(): LayerEnum { throw Error("not implemented"); }

    generateFullData(): Layer {
        throw Error("not implemented");
    }
}