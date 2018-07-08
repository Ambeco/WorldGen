﻿import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForNeighborhoodHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { StreetStub } from "./StreetStub.js";
import { NeighborhoodStub } from "../E_city/NeighborhoodStub.js";

export class Neighborhood extends LayerBase<StreetStub> {
    get layerName() { return "Neighborhood"; }

    constructor(stub: NeighborhoodStub, rng: Random) {
        super(stub, stub.setting.approxStreetCount, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): StreetStub {
        return new StreetStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForNeighborhoodHero(this.population, rng);
    }
}