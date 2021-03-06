﻿import { NumberRange } from "./NumberRange.js";
import { nonNaN } from "./nonNull.js";


export function getBiggestValue<T>(map: Map<T, number>): [T, number] {
    if (map.size == 0) throw new Error("map is empty");
    let maxKey: T = map.keys().next().value;
    let maxRatio: number = nonNaN(map.get(maxKey), "could not find " + maxKey);
    for (let curKey of map.keys()) {
        const curRatio: number = nonNaN(map.get(curKey), "could not find " + curKey);
        if (curRatio > maxRatio) {
            maxKey = curKey;
            maxRatio = curRatio;
        }
    }
    return [maxKey, maxRatio];
}

export function getByCDF<T>(position: number, ranges: NumberRange[], values: T[]): T {
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (position >= range.min && position < range.max)
            return values[i];
    }
    throw new Error(position + " is out of range of " + ranges[0].min + " to " + (ranges[ranges.length - 1].max));
}

export function sumValues<T>(map: Map<T, number>): number {
    let result = 0;
    for (let element of map) {
        result += element[1];
    }
    return result;
}

export function logBase(value: number, base: number): number {
    return Math.log(value) / Math.log(base);
}