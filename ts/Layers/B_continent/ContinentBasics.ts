import { RandomState, Random } from "../../Util/Random.js";2222222222222
import { Setting, Meters } from "../../Universal/Setting/Setting.js";
import { ContinentHeader, getContinentHeight } from "./ContinentHeaders.js";
import { WorldCache } from "../WorldCache.js";
import { TerrainEnum } from "../C_geography/GeographyTile.js";
import { GeoPolygon, generateGeoPolygon } from "../../Util/GeoPolygon.js";
import { EighthDirection, EighthDirectionMap, earthDirectionOffsetMap, transformEighthDirectionMap, clockwise16th, SixteenthPrecision, toSixteenthDirection, counterClockwise16th, clockwise8th, counterClockwise8th, SixteenthDirection, toEighthDirection, opposeite8th, EighthPrecision, is8thDirection } from "../../Util/Direction";
import { Coordinate } from "../../Universal/Coordinate";
import { nonNull } from "../../Util/nonNull";


export interface ContinentBasics {
    readonly headers: ContinentHeader;
    readonly coordinate: Coordinate;
    readonly name: string;
    readonly bounds: GeoPolygon;
    readonly randomState: RandomState;
    readonly geography: ContinentGeography;
}

export function generateContinentBasics(header: ContinentHeader, cache: WorldCache): ContinentBasics {
    const rng: Random = new Random(header.randomState);
    const avgContinentWidth = this.setting.avgContinentWidth;
    const adjacent = transformEighthDirectionMap(earthDirectionOffsetMap, function (key: EighthDirection, offset: Coordinate): ContinentHeader {
        return cache.getContinentHeaders(new Coordinate(header.coordinate.x + offset.x * avgContinentWidth, header.coordinate.y + offset.y * avgContinentWidth));
    });
    const bounds = generateGeoPolygon(header, adjacent);
    const geography = generateContinentGeography(header, rng, adjacent, bounds);
    return {
        headers: header,
        coordinate: header.coordinate,
        name: header.name,
        bounds: bounds,
        geography: geography,
        randomState: rng.getState(),
    };
}

export interface ContinentGeography {
    readonly edges: EighthDirectionMap<GeographyRange>;
    readonly internalRegions: EighthDirectionMap<GeographyRange>;
    readonly middleRegion: GeographyRange;
}

export interface GeographyRange extends EdgeTerrain {
    readonly name: string;
    readonly terrain: TerrainEnum;
}

function generateContinentGeography(header: ContinentHeader, rng: Random, adjacent: EighthDirectionMap<ContinentHeader>, bounds: GeoPolygon): ContinentGeography {
    const setting = header.setting;
    const edgeTerrainMap = generateEdgeTerrainMap(header, rng, adjacent, bounds);
    const avgTemp = Math.sin(header.coordinate.y / setting.equatorToPoleDistance) / 2 + 0.5;
    const precipitationMap = generateInternalRegionPrecipitation(header, rng, adjacent, edgeTerrainMap, bounds);
}

//TODO: Use to calculate humidity, rivers, and lakes
//const maxTilt = (setting.maxContinentElevation - setting.minContinentElevation) / (setting.avgContinentWidth * setting.avgContinentAreaRatio);
function HumidityTiltPenalty(header: ContinentHeader, dir: EighthDirection, maxTilt: number): number {
    const tiltOffset = earthDirectionOffsetMap.get(dir);
    const tilt = tiltOffset.x * -header.eastHeightMultiplier * tiltOffset.y * -header.northHeightMultiplier;
    const tiltRatio = 1 - tilt / maxTilt;
    return tiltRatio > 1 ? 1.0 : tiltRatio;
}

//https://www.seas.harvard.edu/climate/eli/research/equable/images/Hadley%20Cell.png
function getWindSourceDirection(header: ContinentHeader): [EighthDirection, EighthDirection] {
    const setting = header.setting;
    const hadleyCell4TypeOffset: Meters = Meters(header.coordinate.y % (setting.hadleyCellDistance * 4));
    const hadleyCellType = Math.floor(hadleyCell4TypeOffset / (setting.hadleyCellDistance * 2)); //0=One of the two westerly cells, 1=one of the two easterly cells
    const hadleyCellPercent = hadleyCell4TypeOffset / (setting.hadleyCellDistance * 2) - hadleyCellType;

    //assume hadleyCellType==1, which is N/E/S, and we'll flip it later if need be
    const primaryAndPercent = hadleyCellPercent * 6; //from 0 to 6
    const primary: EighthDirection = Math.round(primaryAndPercent);
    const roundPercent = primaryAndPercent - primary; //from -0.5 to 0.5
    const dirOffset = Math.round(roundPercent * 2); //from -1 to 1
    const secondary: EighthDirection = (primary + dirOffset) % 8;

    if (hadleyCellType == 1) { //hadleyCellPercent is percent from N->E->S
        return [primary, secondary];
    } else { //hadleyCellPercent is percent from N->W->S
        return [(8 - primary) % 8, (8 - secondary) % 8];
    }
}

function generateInternalRegionPrecipitation(header: ContinentHeader,
            rng: Random,
            adjacent: EighthDirectionMap<ContinentHeader>,
            edgeTerrainMap: EighthDirectionMap<EdgeTerrain>,
            bounds: GeoPolygon): EighthDirectionMap<number> {
    const setting = header.setting;
    const wind: [EighthDirection, EighthDirection] = getWindSourceDirection(header);
    const oppositeWind = opposeite8th(wind[0]);
    const clockwiseWind = clockwise8th(opposeite8th(wind[0]));
    const counterClockwiseWind = counterClockwise8th(opposeite8th(wind[0]));
    const dirOrder = generateInternalRegionPrecipitationOrder(wind);
    const oppositeSecondary = opposeite8th(wind[1]);
    const preResult = {
        get(dir: EighthDirection): number | undefined { return this[dir.toString()]; },
        set(dir: EighthDirection, value: number): void { this[dir.toString()] = value; },
    };
    for (const dir of dirOrder) {
        const precip = calculatePrecipitation(header, EighthDirection.SE, bounds,
            preResult.get(oppositeWind) || edgeTerrainMap.get(oppositeWind),
            preResult.get(clockwiseWind) || edgeTerrainMap.get(clockwiseWind),
            preResult.get(counterClockwiseWind) || edgeTerrainMap.get(counterClockwiseWind),
            preResult.get(oppositeSecondary) || edgeTerrainMap.get(oppositeSecondary));
        preResult.set(dir, precip);
    }
    return {
        N: nonNull(preResult.get(EighthDirection.N), "precip not calculated"),
        NE: nonNull(preResult.get(EighthDirection.NE), "precip not calculated"),
        E: nonNull(preResult.get(EighthDirection.E), "precip not calculated"),
        SE: nonNull(preResult.get(EighthDirection.SE), "precip not calculated"),
        S: nonNull(preResult.get(EighthDirection.S), "precip not calculated"),
        SW: nonNull(preResult.get(EighthDirection.SW), "precip not calculated"),
        W: nonNull(preResult.get(EighthDirection.W), "precip not calculated"),
        NW: nonNull(preResult.get(EighthDirection.NW), "precip not calculated"),
        get(dir: EighthDirection): number { return this[dir.toString()]; },
    }
}

function generateInternalRegionPrecipitationOrder(wind: [EighthDirection, EighthDirection]): EighthDirection[] {
    if (wind[0] == EighthDirection.NW || is8thDirection(wind[1], EighthDirection.NW, EighthPrecision.adjacent)) {
        return [EighthDirection.SE, EighthDirection.E, EighthDirection.NE, EighthDirection.S, EighthDirection.N, EighthDirection.SW, EighthDirection.W, EighthDirection.NW];
    } else if (wind[1] == EighthDirection.SW || is8thDirection(wind[1], EighthDirection.SW, EighthPrecision.adjacent)) {
        return [EighthDirection.NE, EighthDirection.E, EighthDirection.SE, EighthDirection.N, EighthDirection.S, EighthDirection.NW, EighthDirection.W, EighthDirection.SW];
    } else if (wind[1] == EighthDirection.NE || is8thDirection(wind[1], EighthDirection.NE, EighthPrecision.adjacent)) {
        return [EighthDirection.SW, EighthDirection.W, EighthDirection.NW, EighthDirection.S, EighthDirection.N, EighthDirection.SE, EighthDirection.E, EighthDirection.NE];
    } else {
        return [EighthDirection.NW, EighthDirection.W, EighthDirection.SW, EighthDirection.N, EighthDirection.S, EighthDirection.NE, EighthDirection.E, EighthDirection.SE];
    }
}

function getPrecipitation(source: EdgeTerrain | number, hadleyQuadPrecipitation: number): number {
    return typeof source === "number" ? source : (source.oceanAdjacent ? 1.0 : hadleyQuadPrecipitation);
}

function calculatePrecipitation(header: ContinentHeader,
            dir: EighthDirection,
            bounds: GeoPolygon,
            windPrimarySource: EdgeTerrain | number,
            windClockwiseSource: EdgeTerrain | number,
            windCounterClockwiseSource: EdgeTerrain | number,
            windSecondarySource: EdgeTerrain | number): number {
    const clockwisePoint = bounds.getDiagonal(clockwise16th(toSixteenthDirection(dir), SixteenthPrecision.adjacent));
    const counterClockwisePoint = bounds.getDiagonal(counterClockwise16th(toSixteenthDirection(dir), SixteenthPrecision.adjacent));
    const clockwiseSelfIsOcean = getContinentHeight(header, clockwisePoint) < header.setting.oceanLevelPercent;
    const counterClockwiseSelfIsOcean = getContinentHeight(header, counterClockwisePoint) < header.setting.oceanLevelPercent;
    if (clockwiseSelfIsOcean || clockwiseSelfIsOcean) return 1.0;

    const dirCenter = clockwisePoint.midpointTo(counterClockwisePoint);
    const hadleyPrecipitation = Math.sin(dirCenter.y / header.setting.hadleyCellDistance) / 2 + 0.5;
    const hadleyQuadPrecipitation = Math.pow(hadleyPrecipitation, 1.0 / 4);

    let result = 1.0;
    result *= getPrecipitation(windPrimarySource, hadleyQuadPrecipitation * hadleyQuadPrecipitation);
    result *= getPrecipitation(windClockwiseSource, hadleyQuadPrecipitation);
    result *= getPrecipitation(windCounterClockwiseSource, hadleyQuadPrecipitation);
    if (typeof windPrimarySource !== "number" && windPrimarySource.isMountain) result = result * .5;
    if (typeof windSecondarySource !== "number" && windSecondarySource.isMountain) result = result * .8;
    return result;
}

interface EdgeTerrain {
    readonly baseHeight: Meters;
    readonly mountainHeight: Meters;
    readonly isMountain: boolean;
    readonly oceanAdjacent: boolean;
}

function generateEdgeTerrainMap(header: ContinentHeader, rng: Random, adjacentMap: EighthDirectionMap<ContinentHeader>, bounds: GeoPolygon): EighthDirectionMap<EdgeTerrain> {
    const setting = header.setting;
    const continentHeightSpan = setting.maxContinentElevation - setting.minContinentElevation;
    const oceanLevelPercent = continentHeightSpan * setting.oceanLevelPercent;
    return transformEighthDirectionMap(adjacentMap, function (dir: EighthDirection, adjacent: ContinentHeader): EdgeTerrain {
        const clockwisePoint = bounds.getDiagonal(clockwise16th(toSixteenthDirection(dir), SixteenthPrecision.adjacent));
        const counterClockwisePoint = bounds.getDiagonal(counterClockwise16th(toSixteenthDirection(dir), SixteenthPrecision.adjacent));
        const dirCenter = clockwisePoint.midpointTo(counterClockwisePoint);
        const baseHeightPercent = getContinentHeight(header, dirCenter);
        const baseHeight = baseHeightPercent * continentHeightSpan;
        const angleToContinent = Math.atan2(adjacent.coordinate.x - header.coordinate.x, adjacent.coordinate.y - header.coordinate.y);
        const relativeVelocity = new Coordinate((adjacent.velocity.x - header.velocity.x)/2, (adjacent.velocity.y - header.velocity.y)/2);
        const relativeXSpeed = relativeVelocity.x * Math.cos(angleToContinent);
        const relativeYSpeed = relativeVelocity.y * Math.sin(angleToContinent);
        const relativeSqSpeed = relativeXSpeed * relativeXSpeed + relativeYSpeed * relativeYSpeed;
        const mountainHeight = Meters(setting.maxMountainRangeHeight * relativeSqSpeed);
        const clockwiseSelfIsOcean = getContinentHeight(header, clockwisePoint) < setting.oceanLevelPercent;
        const counterClockwiseSelfIsOcean = getContinentHeight(header, counterClockwisePoint) < setting.oceanLevelPercent;
        const clockwiseAdjacentIsOcean = getContinentHeight(adjacent, clockwisePoint) < setting.oceanLevelPercent;
        const counterClockwiseAdjacentIsOcean = getContinentHeight(adjacent, counterClockwisePoint) < setting.oceanLevelPercent;
        const oceanAdjacent = clockwiseSelfIsOcean || counterClockwiseSelfIsOcean || clockwiseAdjacentIsOcean || counterClockwiseAdjacentIsOcean;
        return {
            baseHeight: Meters(baseHeightPercent * continentHeightSpan),
            mountainHeight: mountainHeight,
            isMountain: mountainHeight > setting.minMountainHeight,
            oceanAdjacent: oceanAdjacent,
        };
    });
}

