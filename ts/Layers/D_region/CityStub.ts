import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { City } from "../E_city/City.js";
import { Random } from "../../Util/Random.js";

export class CityStub extends LayerStubBase {
    get layerName() { return "City"; }

    generateFullData(): Layer {
        return new City(this, new Random(this.randomState));
    }
}