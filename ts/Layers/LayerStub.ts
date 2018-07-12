import { Random, RandomState } from "../Util/Random.js";
import { Race } from "../Universal/Setting/Race.js";
import { getBiggestValue, sumValues } from "../Util/Distribution.js";
import { NumberRange } from "../Util/NumberRange.js";
import { PersonStub } from "../Universal/Person/PersonStub.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { Layer } from "./Layer.js";

export enum LayerEnum {
    World,
    Continent,
    Country,
    Region,
    City,
    Neighborhood,
    Street,
    Building,
};

export interface LayerStub {
    readonly layer: LayerEnum;

    readonly name: string;
    readonly randomState: RandomState;
    readonly setting: Setting;
    readonly location: NumberRange;
    readonly population: number;
    readonly raceCounts: Map<Race, number>;
    readonly people: PersonStub[];

    generateFullData(): Layer;
}