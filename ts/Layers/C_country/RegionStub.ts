import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { Region } from "../D_region/Region.js";
import { Random } from "../../Util/Random.js";

export class RegionStub extends LayerStubBase {
    get layerName() { return "Region"; }

    generateFullData(): Layer {
        return new Region(this, new Random(this.randomState));
    }
}