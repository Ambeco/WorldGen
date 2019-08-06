import { Coordinate } from "../Universal/Coordinate";
import { Random } from "./Random";
import { generateAgeFn } from "../Universal/Setting/Race";
import { nonNull } from "./nonNull";


    

export enum EighthDirection {
    N, NE, E, SE, S, SW, W, NW
}

export enum EighthPrecision {
    equal = 0, adjacent = 1, half = 2
}

export function toEighthDirection(dir: SixteenthDirection): EighthDirection {
    const r: EighthDirection = dir / 2;
    return r;
}

export interface EighthDirectionMap<T> {
    readonly N: T;
    readonly NE: T;
    readonly E: T;
    readonly SE: T;
    readonly S: T;
    readonly SW: T;
    readonly W: T;
    readonly NW: T;
    get(dir: EighthDirection): T;
}

export function transformEighthDirectionMap<T, U>(map: EighthDirectionMap<T>, fn: (key: EighthDirection, value: T)=> U): EighthDirectionMap<U> {
    return {
        N: fn(EighthDirection.N, map.N),
        NE: fn(EighthDirection.NE, map.NE),
        E: fn(EighthDirection.E, map.E),
        SE: fn(EighthDirection.SE, map.SE),
        S: fn(EighthDirection.S, map.S),
        SW: fn(EighthDirection.SW, map.SW),
        W: fn(EighthDirection.W, map.W),
        NW: fn(EighthDirection.NW, map.NW),
        get(dir: EighthDirection): U { return this[dir.toString()] },
    };
}

export const earthDirectionOffsetMap: EighthDirectionMap<Coordinate> = {
    N: new Coordinate(0, 1),
    NE: new Coordinate(1, 1),
    E: new Coordinate(1, 0),
    SE: new Coordinate(1, -1),
    S: new Coordinate(0, -1),
    SW: new Coordinate(-1, -1),
    W: new Coordinate(-1, 0),
    NW: new Coordinate(-1, 1),
    get(dir: EighthDirection): Coordinate { return this[dir.toString()] },
};

export function clockwise8th(input: EighthDirection): EighthDirection {
    return (input + 1) % 8;
}

export function counterClockwise8th(input: EighthDirection): EighthDirection {
    return (input + 1) % 8;
}

export function opposeite8th(input: EighthDirection): EighthDirection {
    return (input + 4) % 8;
}

export function is8thDirection(query: EighthDirection, desired: EighthDirection, precision: EighthPrecision): boolean {
    const maybeMin: number = desired - precision;
    const min = maybeMin >= 0 ? maybeMin : maybeMin + 16;
    const max = desired + precision;
    if (query < min) {
        return query + 16 < max;
    } else {
        return query < max;
    }
}






export enum SixteenthDirection {
    N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW
}

export enum SixteenthPrecision {
    equal = 0, adjacent = 1, quarter = 2, wide = 3, half = 4
}

export function toSixteenthDirection(dir: EighthDirection): SixteenthDirection {
    const r: SixteenthDirection = dir * 2;
    return r;
}

export interface SixteenthDirectionMap<T> {
    readonly N: T;
    readonly NNE: T;
    readonly NE: T;
    readonly ENE: T;
    readonly E: T;
    readonly ESE: T;
    readonly SE: T;
    readonly SSE: T;
    readonly S: T;
    readonly SSW: T;
    readonly SW: T;
    readonly WSW: T;
    readonly W: T;
    readonly NNW: T;
    readonly NW: T;
    readonly WNW: T;
    get(dir: SixteenthDirection): T;
}

export function transformSixteenthDirectionMap<T, U>(map: SixteenthDirectionMap<T>, fn: (key: SixteenthDirection, value: T) => U): SixteenthDirectionMap<U> {
    return {
        N: fn(SixteenthDirection.N, map.N),
        NNE: fn(SixteenthDirection.NNE, map.NNE),
        NE: fn(SixteenthDirection.NE, map.NE),
        ENE: fn(SixteenthDirection.ENE, map.ENE),
        E: fn(SixteenthDirection.E, map.E),
        ESE: fn(SixteenthDirection.ESE, map.ESE),
        SE: fn(SixteenthDirection.SE, map.SE),
        SSE: fn(SixteenthDirection.SSE, map.SSE),
        S: fn(SixteenthDirection.S, map.S),
        SSW: fn(SixteenthDirection.SSW, map.SSW),
        SW: fn(SixteenthDirection.SW, map.SW),
        WSW: fn(SixteenthDirection.WSW, map.WSW),
        W: fn(SixteenthDirection.W, map.W),
        WNW: fn(SixteenthDirection.WNW, map.WNW),
        NW: fn(SixteenthDirection.NW, map.NW),
        NNW: fn(SixteenthDirection.NNW, map.NNW),
        get(dir: SixteenthDirection): U { return this[dir.toString()] },
    };
}

export function clockwise16th(input: SixteenthDirection, amount?: SixteenthPrecision): SixteenthDirection {
    amount = amount || SixteenthPrecision.adjacent;
    return (input + amount) % 16;
}

export function counterClockwise16th(input: SixteenthDirection, amount?: SixteenthPrecision): SixteenthDirection {
    amount = amount || SixteenthPrecision.adjacent;
    return (input + 16 - amount) % 16;
}

export function roundTowardDiagonal(input: SixteenthDirection): SixteenthDirection {
    switch (input % 4) {
        case 0: return input;
        case 1: return clockwise16th(input, SixteenthPrecision.adjacent);
        case 2: return input;
        case 3: return counterClockwise16th(input, SixteenthPrecision.adjacent);
    }
    throw new Error("Impossible scenario");
}

export function is16thDirection(query: SixteenthDirection, desired: SixteenthDirection, precision: SixteenthPrecision): boolean {
    const maybeMin:number = desired - precision;
    const min = maybeMin >= 0 ? maybeMin: maybeMin + 16;
    const max = desired + precision;
    if (query < min) {
        return query + 16 < max;
    } else {
        return query < max;
    }
}