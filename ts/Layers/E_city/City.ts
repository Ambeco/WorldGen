import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForCityHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { NeighborhoodStub } from "./NeighborhoodStub.js";
import { CityStub } from "../D_region/CityStub.js";
import { LayerEnum } from "../LayerStub.js";

export class City extends LayerBase<NeighborhoodStub> {
    get layer() { return LayerEnum.City; }

    constructor(stub: CityStub, rng: Random) {
        super(stub, stub.setting.approxNeighborhoodPopulation, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): NeighborhoodStub {
        return new NeighborhoodStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForCityHero(this.population, rng);
    }
}