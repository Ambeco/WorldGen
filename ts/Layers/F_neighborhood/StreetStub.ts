import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { Street } from "../G_street/Street.js";
import { Random } from "../../Util/Random.js";

export class StreetStub extends LayerStubBase {
    get layerName() { return "Street"; }

    generateFullData(): Layer {
        return new Street(this, new Random(this.randomState));
    }
}