import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { LayerBase } from "../LayerBase.js";
import { StreetStub } from "./StreetStub.js";
import { NeighborhoodStub } from "../E_city/NeighborhoodStub.js";
import { LayerEnum } from "../LayerStub.js";

export class Neighborhood extends LayerBase<StreetStub> {
    get layer() { return LayerEnum.Neighborhood; }

    constructor(stub: NeighborhoodStub, rng: Random) {
        super(stub, stub.setting.approxStreetPopulation, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): StreetStub {
        return new StreetStub(this.setting, locationDistribution, raceDistributions, rng);
    }
}