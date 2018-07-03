import { LayerStub } from "./LayerStub.js";
import { Random } from "../Util/Random.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { Race } from "../Universal/Setting/Race.js";
import { getBiggestValue, getByCDF, sumValues } from "../Util/Distribution.js";
import { NumberRange } from "../Util/NumberRange.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { DEFAULT_PEOPLE_PER_TIER, LAYER_RACE_RERANDOM_STDDEV_RATIO, LAYER_SIZE_RERANDOM_STDDEV_RATIO } from "../Universal/Configuration.js";

export interface Layer {
    readonly setting: Setting;
    readonly name: string;
    readonly location: NumberRange;
    readonly population: number;
    readonly raceCounts: Map<Race, number>;
    readonly subLayerLocations: NumberRange[];
    readonly people: BasePerson[];
    readonly genericSubLayers: LayerStub[];

}