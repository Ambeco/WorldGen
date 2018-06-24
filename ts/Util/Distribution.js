import { nonNaN } from "../nonNull.js";
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
//# sourceMappingURL=Distribution.js.map