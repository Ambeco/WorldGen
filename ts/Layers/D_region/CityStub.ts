import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { City } from "../E_city/City.js";
import { Random } from "../../Util/Random.js";
import { LayerEnum } from "../LayerStub.js";

export class CityStub extends LayerStubBase {
    get layer() { return LayerEnum.City; }

    generateFullData(): Layer {
        return new City(this, new Random(this.randomState));
    }
}