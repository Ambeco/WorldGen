import { LayerStubBase } from "../LayerStubBase.js";
import { Continent } from "../B_continent/Continent.js";
import { Layer } from "../Layer.js";
import { Random } from "../../Util/Random.js";

export class ContinentStub extends LayerStubBase {
    generateFullData(): Layer {
        return new Continent(this.setting, this.location, this.raceCounts, new Random(this.randomState));
    }
}