import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForRegionHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { CityStub } from "./CityStub.js";
import { RegionStub } from "../C_country/RegionStub.js";

export class Region extends LayerBase<CityStub> {
    get layerName() { return "Region"; }

    constructor(stub: RegionStub, rng: Random) {
        super(stub, stub.setting.approxCityPopulation, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): CityStub {
        return new CityStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForRegionHero(this.population, rng);
    }
}