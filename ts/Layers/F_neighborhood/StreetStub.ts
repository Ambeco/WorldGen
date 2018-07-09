import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { Street } from "../G_street/Street.js";
import { Random } from "../../Util/Random.js";
import { LayerEnum } from "../LayerStub.js";

export class StreetStub extends LayerStubBase {
    get layer() { return LayerEnum.Street; }

    generateFullData(): Layer {
        return new Street(this, new Random(this.randomState));
    }
}