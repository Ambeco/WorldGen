import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { Country } from "../C_country/Country.js";
import { Random } from "../../Util/Random.js";
import { LayerEnum } from "../LayerStub.js";

export class CountryStub extends LayerStubBase {
    get layer() { return LayerEnum.Country; }

    generateFullData(): Layer {
        return new Country(this, new Random(this.randomState));
    }
}