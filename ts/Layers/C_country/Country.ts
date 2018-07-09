import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForCountryHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { RegionStub } from "./RegionStub.js";
import { CountryStub } from "../B_continent/CountryStub.js";

export class Country extends LayerBase<RegionStub> {
    get layerName() { return "Country"; }

    constructor(stub: CountryStub, rng: Random) {
        super(stub, stub.setting.approxRegionPopulation, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): RegionStub {
        return new RegionStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForCountryHero(this.population, rng);
    }
}