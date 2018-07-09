import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { Neighborhood } from "../F_neighborhood/Neighborhood.js";
import { Random } from "../../Util/Random.js";
import { LayerEnum } from "../LayerStub.js";

export class NeighborhoodStub extends LayerStubBase {
    get layer() { return LayerEnum.Neighborhood; }

    generateFullData(): Layer {
        return new Neighborhood(this, new Random(this.randomState));
    }
}