import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForContinentHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { CountryStub } from "./CountryStub.js";

export class Continent extends LayerBase<CountryStub> {
    get layerName() { return "Continent"; }

    constructor(setting: Setting, location: NumberRange, raceCounts: Map<Race, number>, rng: Random) {
        super(setting, location, raceCounts, setting.approxCountryCount, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): CountryStub {
        return new CountryStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForContinentHero(this.population, rng);
    }
}