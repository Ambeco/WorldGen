import { Random, RandomState, mergeStateWithCoordinate } from "../../Util/Random.js";
import { Coordinate } from "../../Universal/Coordinate.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { ContinentBasics } from "./ContinentBasics.js";
import { WorldCache } from "../WorldCache.js";

export class ContinentDetails {
    readonly basics: ContinentBasics;
    readonly coordinate: Coordinate;
    readonly randomState: RandomState;

    readonly name: string;

    constructor(basics: ContinentBasics, cache: WorldCache) {
        this.basics = basics;
        this.coordinate = basics.coordinate;
        this.randomState = basics.randomState;
    }
}