import { Random, RandomState } from "../Util/Random.js";
import { Race } from "../Universal/Setting/Race.js";
import { getBiggestValue, sumValues } from "../Util/Distribution.js";
import { NumberRange } from "../Util/NumberRange.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { LayerStub, LayerEnum } from "./LayerStub.js";
import { Layer } from "./Layer.js";

export abstract class LayerStubBase implements LayerStub {
    readonly layer: LayerEnum;

    readonly randomState: RandomState;
    readonly setting: Setting;
    readonly name: string;
    readonly location: NumberRange;
    readonly population: number;
    readonly raceCounts: Map<Race, number>;
    readonly people: BasePerson[];

    constructor(setting: Setting, location: NumberRange, raceCounts: Map<Race, number>, rng: Random) {
        const primaryRace: [Race, number] = getBiggestValue(raceCounts);
        this.setting = setting;
        this.name = primaryRace[0].generateName(rng);
        this.location = location;
        this.people = [];
        this.raceCounts = raceCounts;
        this.population = sumValues(raceCounts);
        this.randomState = rng.getState();
    }

    abstract generateFullData(): Layer;


    toString(): string { return LayerEnum[this.layer] + "Stub: " + this.name; }
}