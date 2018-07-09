import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForStreetHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { BuildingStub } from "./BuildingStub.js";
import { StreetStub } from "../F_neighborhood/StreetStub.js";

export class Street extends LayerBase<BuildingStub> {
    get layerName() { return "Street"; }

    constructor(stub: StreetStub, rng: Random) {
        super(stub, stub.setting.approxBuildingPopulation, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): BuildingStub {
        return new BuildingStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForStreetHero(this.population, rng);
    }
}