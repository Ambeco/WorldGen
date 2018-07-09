import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { Region } from "../D_region/Region.js";
import { Random } from "../../Util/Random.js";
import { LayerEnum } from "../LayerStub.js";

export class RegionStub extends LayerStubBase {
    get layer() { return LayerEnum.Region; }

    generateFullData(): Layer {
        return new Region(this, new Random(this.randomState));
    }
}