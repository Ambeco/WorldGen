﻿import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForBuildingHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { NoStub } from "./NoStub.js";
import { BuildingStub } from "../G_street/BuildingStub.js";
import { BasePerson } from "../../Universal/Person/BasePerson.js";
import { LayerStub } from "../LayerStub.js";

export class Building extends LayerBase<NoStub> {
    get layerName() { return "Street"; }

    constructor(stub: BuildingStub, rng: Random) {
        super(stub, 0, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): NoStub {
        return new NoStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateHero<StubType extends LayerStub>(locationDistribution: NumberRange[], subLayers: StubType[], rng: Random): BasePerson {
        const location: number = rng.nextNumber(this.location.min, this.location.max);
        const race = rng.nextWeightedKey(this.raceCounts);
        const fame = this.generateFameForHero(rng);
        return new BasePerson(location, race, fame, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForBuildingHero(this.population, rng);
    }
}