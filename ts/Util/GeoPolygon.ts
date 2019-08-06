import { Coordinate } from "../Universal/Coordinate";
import { Random } from "./Random";
import { generateAgeFn } from "../Universal/Setting/Race";
import { nonNull } from "./nonNull";
import { SixteenthDirection, EighthDirection, roundTowardDiagonal, SixteenthDirectionMap, EighthDirectionMap, counterClockwise16th, SixteenthPrecision, transformSixteenthDirectionMap } from "./Direction.js";


    
export class PointAndSize extends Coordinate {
    constructor(
        x: number,
        y: number, 
        readonly sizeFromLeft: number
    ) { super(x, y)}
}

/** At least one point in each diagonal direction is always set (aka: at least one of NNE, NE, ENE is always non-null) **/
export class GeoPolygon {
    constructor(
        readonly center: Coordinate,
        private points: SixteenthDirectionMap<PointAndSize | undefined>,
        readonly area: number,
    ) { }

    public getRaw(dir: SixteenthDirection): PointAndSize | undefined {
        return this.points.get(dir);
    }
    public getDiagonal(dir: SixteenthDirection): PointAndSize {
        let i = this.points.get(dir);
        if (i instanceof PointAndSize) {
            return i;
        }
        i = this.points.get(roundTowardDiagonal(dir));
        if (i instanceof PointAndSize) {
            return i;
        } else {
            throw new Error("missing required diagonal coordinate");
        }
    }
}

export interface PointSource {
    readonly coordinate: Coordinate;
    readonly sizeMultiplier: number;
}

export function generateGeoPolygon(center: PointSource, sources: EighthDirectionMap<PointSource>): GeoPolygon {
    const twoInNE = hasTwoPointsInCorner(center, sources.N, sources.NE, sources.E);
    const twoInSE = hasTwoPointsInCorner(center, sources.E, sources.SE, sources.S);
    const twoInSW = hasTwoPointsInCorner(center, sources.S, sources.SW, sources.W);
    const twoInNW = hasTwoPointsInCorner(center, sources.W, sources.NW, sources.N);
    const coordinates: SixteenthDirectionMap<Coordinate | undefined> = {
        N: undefined,
        NNE: twoInNE ? centerOfTriangle(center, sources.N, sources.NE) : undefined,
        NE: twoInNE ? undefined : centerOfTriangle(center, sources.N, sources.E),
        ENE: twoInNE ? centerOfTriangle(center, sources.NE, sources.E) : undefined,
        E: undefined,
        ESE: twoInSE ? centerOfTriangle(center, sources.E, sources.SE) : undefined,
        SE: twoInSE ? undefined : centerOfTriangle(center, sources.E, sources.S),
        SSE: twoInSE ? centerOfTriangle(center, sources.SE, sources.S) : undefined,
        S: undefined,
        SSW: twoInSW ? centerOfTriangle(center, sources.S, sources.SW) : undefined,
        SW: twoInSW ? undefined : centerOfTriangle(center, sources.S, sources.W),
        WSW: twoInSW ? centerOfTriangle(center, sources.SW, sources.W) : undefined,
        W: undefined,
        WNW: twoInNW ? centerOfTriangle(center, sources.W, sources.NW) : undefined,
        NW: twoInNW ? undefined : centerOfTriangle(center, sources.W, sources.N),
        NNW: twoInNW ? centerOfTriangle(center, sources.NW, sources.N) : undefined,
        get(dir: SixteenthDirection): Coordinate | undefined { return this[dir.toString()] },
    };

    const areaBuilder: AreaBuilder = new AreaBuilder();
    function toPointSize(dir: SixteenthDirection, coord: Coordinate | undefined): PointAndSize | undefined {
        if (coord == undefined) {
            return undefined;
        }
        const counterClock = coordinates.get(counterClockwise16th(dir, SixteenthPrecision.adjacent))
            || coordinates.get(counterClockwise16th(dir, SixteenthPrecision.quarter))
            || coordinates.get(counterClockwise16th(dir, SixteenthPrecision.wide));
        if (counterClock == undefined) {
            throw new Error("missing counterclockwise coordinate");
        }
        return new PointAndSize(coord.x, coord.y, areaBuilder.calculateTriangleArea(center.coordinate, coord, counterClock));
    }
    const points: SixteenthDirectionMap<PointAndSize | undefined> = transformSixteenthDirectionMap(coordinates, toPointSize);
    return new GeoPolygon(center.coordinate, points, areaBuilder.total);
}

function hasTwoPointsInCorner(center: PointSource, side: PointSource, corner: PointSource, otherside: PointSource): boolean {
    const cornerDistWeighted = center.coordinate.distanceSqTo(corner.coordinate) * center.sizeMultiplier * corner.sizeMultiplier;
    const sideDistWeighted = center.coordinate.distanceSqTo(otherside.coordinate) * side.sizeMultiplier * otherside.sizeMultiplier;
    return cornerDistWeighted < sideDistWeighted;
}

function centerOfTriangle(first: PointSource, second: PointSource, third: PointSource): Coordinate {
    const weight = first.sizeMultiplier + second.sizeMultiplier + third.sizeMultiplier;
    const x = first.coordinate.x * first.sizeMultiplier + second.coordinate.x * second.sizeMultiplier + third.coordinate.x * third.sizeMultiplier;
    const y = first.coordinate.y * first.sizeMultiplier + second.coordinate.y * second.sizeMultiplier + third.coordinate.y * third.sizeMultiplier;
    return new Coordinate(x / weight, y / weight);
}

class AreaBuilder {
    total: number;

    calculateTriangleArea(A: Coordinate, B: Coordinate, C: Coordinate): number {
        const result = (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2;
        this.total = this.total + result;
        return result;
    }
}

function randomPointInGeoPolygon(polygon: GeoPolygon, rng: Random): Coordinate {
    const idx = this.getRandomTriangleIdx(rng);
    const first = this.points[idx];
    const second = idx < this.points.length - 1 ? this.points[idx + 1] : this.points[0];
    const v1 = new Coordinate(first.x - this.center.x, first.y - this.center.y);
    const v2 = new Coordinate(second.x - this.center.x, second.y - this.center.y);
    let v1Ratio = rng.nextPercent();
    let v2Ratio = rng.nextPercent();
    if (v1Ratio + v2Ratio > .5) {
        v1Ratio = 1 - v1Ratio;
        v2Ratio = 1 - v2Ratio;
    }
    const resultX = this.center.x + v1.x * v1Ratio + v2.x + v2Ratio;
    const resultY = this.center.y + v1.y * v1Ratio + v2.y + v2Ratio;
    return new Coordinate(resultX, resultY);
}

function getRandomTriangleIdx(rng: Random): number {
    let remains = rng.nextNumber(0, this.area);
    for (let i = 0; i < this.areaBreakdown.length - 1; i++) {
        remains -= this.areaBreakdown[i];
        if (remains < 0) return i;
    }
    return this.areaBreakdown.length - 1;
}