import { RandomState, Random } from "../../Util/Random.js";
import { Setting, ContinentHeightPercent } from "../../Universal/Setting/Setting.js";
import { Coordinate } from "../../Universal/Coordinate.js";
import { Race } from "../../Universal/Setting/Race.js";


export interface ContinentHeader {
    readonly setting: Setting;
    readonly coordinate: Coordinate;
    readonly primaryRace: Race;
    readonly name: string;

    readonly sizeMultiplier: number;
    readonly coordinateHeight: ContinentHeightPercent;
    readonly northHeightMultiplier: number;  //for each unit north of coordinate, add this to height
    readonly eastHeightMultiplier: number;  //for each unit east of coordinate, add this to height
    readonly velocity: Coordinate; // within unit circle

    readonly randomState: RandomState;
}

export function getContinentHeight(continent: ContinentHeader, coordinate: Coordinate): ContinentHeightPercent {
    return ContinentHeightPercent(continent.coordinateHeight
        + (coordinate.x - continent.coordinate.x) * continent.eastHeightMultiplier
        + (coordinate.y - continent.coordinate.y) * continent.northHeightMultiplier);
}

export function generateContinentHeader(setting: Setting, truncatedCordinate: Coordinate, rng: Random): ContinentHeader {
    const avgContinentWidth = this.setting.avgContinentWidth;
    const gridOffset = 0.5 * avgContinentWidth; //offset keeps integer coordinates vaguely near center of continents
    const isOrigin = truncatedCordinate.x == 0 && truncatedCordinate.y == 0;
    const coordinateXOffset = (isOrigin ? gridOffset : rng.nextPercent()) * avgContinentWidth;
    const coordinateYOffset = (isOrigin ? gridOffset : rng.nextPercent()) * avgContinentWidth;
    const coordinateX = truncatedCordinate.x + coordinateXOffset - gridOffset;
    const coordinateY = truncatedCordinate.y + coordinateYOffset - gridOffset;
    const minCorner = Math.max(0, 1 - setting.oceanLevelPercent * 2);
    const southWestHeight = rng.nextNumberFromRange({ min: minCorner, max: 1 });
    const southEastHeight = rng.nextNumberFromRange({ min: minCorner, max: 1 });
    const minNorthWest = isOrigin ? 2 * setting.oceanLevelPercent - southEastHeight : 0;
    const northWestHeight = rng.nextNumberFromRange({ min: minNorthWest, max: 1 });
    const northHeightMultiplier = (northWestHeight - southWestHeight) / avgContinentWidth;
    const eastHeightMultiplier = (southEastHeight - southWestHeight) / avgContinentWidth;
    const coordinateHeight = ContinentHeightPercent(southWestHeight + eastHeightMultiplier * coordinateXOffset + northHeightMultiplier * coordinateYOffset);
    const midHeight = southWestHeight + eastHeightMultiplier * gridOffset + northHeightMultiplier * gridOffset;
    const speedDir = rng.nextNumberFromRange({ min: 0, max: 2 * Math.PI });
    const speed = rng.nextPercent();
    const velocity = new Coordinate(Math.cos(speedDir) * speed, Math.sin(speedDir) * speed);
    const primaryRace = rng.nextWeightedKey(setting.raceCounts);
    const sizeOffset = setting.avgContinentAreaRatio / 2 - 1;
    return {
        setting: setting,
        coordinate: new Coordinate(coordinateX, coordinateY),
        primaryRace: primaryRace,
        name: primaryRace.generateName(rng),
        sizeMultiplier: rng.nextPercent() + sizeOffset,
        coordinateHeight: coordinateHeight,
        northHeightMultiplier: northHeightMultiplier,
        eastHeightMultiplier: eastHeightMultiplier,
        velocity: velocity,
        randomState: rng.getState()
    };
}