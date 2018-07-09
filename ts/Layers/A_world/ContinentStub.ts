import { LayerStubBase } from "../LayerStubBase.js";
import { Continent } from "../B_continent/Continent.js";
import { Layer } from "../Layer.js";
import { Random } from "../../Util/Random.js";
import { LayerEnum } from "../LayerStub.js";

export class ContinentStub extends LayerStubBase {
    get layer() { return LayerEnum.Continent; }

    generateFullData(): Layer {
        return new Continent(this, new Random(this.randomState));
    }
}