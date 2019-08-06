import { Random, RandomState, mergeStateWithCoordinate } from "../../Util/Random.js";
import { Coordinate } from "../../Universal/Coordinate.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { ContinentDetails } from "../B_continent/ContinentDetails.js";
import { ContinentHeader, generateContinentHeader } from "../B_continent/ContinentHeaders.js";

export class World {
    readonly name: string;
    readonly randomState: RandomState;
    readonly setting: Setting;

    constructor(setting: Setting, rng: Random) {
        this.setting = setting;
        this.name = setting.generateWorldName(rng);

        this.randomState = rng.getState();
    }

    public normalizeContinentCoordinate(approxCoordinate: Coordinate): Coordinate {
        const avgContinentWidth = this.setting.avgContinentWidth;
        const normX = Math.round(approxCoordinate.x / avgContinentWidth) * avgContinentWidth;
        const normY = Math.round(approxCoordinate.y / avgContinentWidth) * avgContinentWidth;
        return new Coordinate(normX, normY);
    }

    public generateContinentHeader(approxCoordinate: Coordinate): ContinentHeader {
        const normCoordinate: Coordinate = this.normalizeContinentCoordinate(approxCoordinate);
        const rng = new Random(mergeStateWithCoordinate(this.randomState, normCoordinate));
        return generateContinentHeader(this.setting, normCoordinate, rng);
    }
}