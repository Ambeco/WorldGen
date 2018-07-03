import { Random, RandomState } from "../Util/Random.js";
import { Race } from "../Universal/Setting/Race.js";
import { getBiggestValue, sumValues } from "../Util/Distribution.js";
import { NumberRange } from "../Util/NumberRange.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { Layer } from "./Layer.js";

export interface LayerStub {
    readonly name: string;
    readonly randomState: RandomState;
    readonly setting: Setting;
    readonly location: NumberRange;
    readonly population: number;
    readonly raceCounts: Map<Race, number>;
    readonly people: BasePerson[];

    generateFullData(): Layer;
}