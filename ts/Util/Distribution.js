import { nonNaN } from "./nonNull.js";
export function getBiggestValue(map) {
    if (map.size == 0)
        throw new Error("map is empty");
    let maxKey = map.keys().next().value;
    let maxRatio = nonNaN(map.get(maxKey), "could not find " + maxKey);
    for (let curKey of map.keys()) {
        const curRatio = nonNaN(map.get(curKey), "could not find " + curKey);
        if (curRatio > maxRatio) {
            maxKey = curKey;
            maxRatio = curRatio;
        }
    }
    return [maxKey, maxRatio];
}
export function getByCDF(position, ranges, values) {
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (position >= range.min && position < range.max)
            return values[i];
    }
    throw new Error(position + " is out of range of " + ranges[0] + " to " + (ranges[ranges.length - 1].max));
}
export function sumValues(map) {
    let result = 0;
    for (let element of map) {
        result += element[1];
    }
    return result;
}
export function getSortedValueIdxArray(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = [array[i], i];
    }
    result.sort((a, b) => b[0] - a[0]);
    return result;
}
export function getIndexesOfValueIdxArray(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i][1];
    }
    return result;
}
export function getBiggestNIndexes(array, count) {
    const clone = getSortedValueIdxArray(array);
    return getIndexesOfValueIdxArray(clone.slice(0, count));
}
export function getSmallestNIndexes(array, count) {
    const clone = getSortedValueIdxArray(array);
    return getIndexesOfValueIdxArray(clone.slice(clone.length - count, clone.length));
}
//# sourceMappingURL=Distribution.js.map