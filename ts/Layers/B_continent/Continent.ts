import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForContinentHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { CountryStub } from "./CountryStub.js";
import { ContinentStub } from "../A_world/ContinentStub.js";
import { LayerEnum } from "../LayerStub.js";

export class Continent extends LayerBase<CountryStub> {
    get layer() { return LayerEnum.Continent; }

    constructor(stub: ContinentStub, rng: Random) {
        super(stub, stub.setting.approxCountryPopulation, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): CountryStub {
        return new CountryStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForContinentHero(this.population, rng);
    }
}