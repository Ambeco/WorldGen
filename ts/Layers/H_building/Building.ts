import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { generateFameForBuildingHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { NoStub } from "./NoStub.js";
import { BuildingStub } from "../G_street/BuildingStub.js";
import { PersonStub } from "../../Universal/Person/PersonStub.js";
import { LayerStub, LayerEnum } from "../LayerStub.js";

export class Building extends LayerBase<NoStub> {
    get layer() { return LayerEnum.Building; }

    constructor(stub: BuildingStub, rng: Random) {
        super(stub, stub.setting.approxWorldPopulation, rng);
    }

    protected generateSubLayers(stub: LayerStub, approxSubLayerPopulation: number, rng: Random): NumberRange[] {
        return [];
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): NoStub {
        return new NoStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected addPerson(races: Map<Race, number>, rng: Random): PersonStub {
        const location: number = rng.nextNumber(this.location.min, this.location.max);
        const race = rng.nextWeightedKey(races);
        const fame = this.generateFameForHero(rng);
        const person = new PersonStub(location, race, fame, rng);
        this.people.push(person);
        return person;
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForBuildingHero(this.population, rng);
    }
}