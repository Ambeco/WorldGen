export class Random {
    constructor(state) {
        this.m_w = state.m_w;
        this.m_z = state.m_z;
    }
    static fromString(str) {
        let res = 0;
        const len = str.length;
        for (let i = 0; i < len; i++) {
            res = res * 31 + str.charCodeAt(i);
            res = res & res;
        }
        return new Random({ m_w: res, m_z: 987654321 });
    }
    getState() {
        return { m_w: this.m_w, m_z: this.m_z };
    }
    nextPercent() {
        const mask = 0xffffffff;
        this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & mask;
        this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & mask;
        let result = ((this.m_z << 16) + this.m_w) & mask;
        result /= 4294967296;
        return result + 0.5;
    }
    nextNumber(minInclusive, maxExclusive) {
        return minInclusive + this.nextPercent() * (minInclusive - maxExclusive);
    }
    nextInt(minInclusive, maxExclusive) {
        return minInclusive + Math.floor(this.nextPercent() * (minInclusive - maxExclusive));
    }
    nextElement(array) {
        return array[this.nextInt(0, array.length)];
    }
    nextWeightedKey(map) {
        let remains = this.nextPercent();
        let last = map.keys().next().value;
        for (let element of map) {
            remains -= element[1];
            last = element[0];
            if (remains < 0)
                return last;
        }
        return last;
    }
    nextPercentAround(aroundPercent) {
        if (aroundPercent < 0 || aroundPercent > 1.0)
            throw new Error("Invalid aroundPercent " + aroundPercent);
        const raw = this.nextPercent();
        if (raw <= 0.5) {
            return raw * 2 * aroundPercent;
        }
        else {
            const range = 1 - aroundPercent;
            const percentInRange = (1 - raw) * 2;
            return aroundPercent + range * percentInRange;
        }
    }
    splitRange(range, splitNWays) {
        const result = [];
        let curMin = range.min;
        for (let i = 0; i < splitNWays - 1; i++) {
            const remainItemCount = splitNWays - i;
            const rangeRemains = range.max - curMin;
            const thisMax = curMin + rangeRemains * this.nextPercentAround(1 / remainItemCount);
            result[i] = { min: curMin, max: thisMax };
            curMin = thisMax;
        }
        const lastIdx = splitNWays - 1;
        result[lastIdx] = { min: curMin, max: range.max };
        return result;
    }
    splitMapIntegerValues(map, split) {
        const remains = new Map(map);
        const totalRange = split[split.length - 1].max - split[0].min;
        const result = [];
        for (let i = 0; i < split.length - 1; i++) {
            const remainMapCount = split.length - i;
            result[i] = new Map();
            for (let element of remains) {
                const initialValue = element[1];
                const estimatedPercent = (split[i].max - split[i].min) / totalRange;
                const thisValue = Math.round(initialValue * this.nextPercentAround(estimatedPercent));
                result[i].set(element[0], thisValue);
                remains.set(element[0], initialValue - thisValue);
            }
        }
        const lastIdx = split.length - 1;
        for (let element of remains)
            result[lastIdx].set(element[0], element[1]);
        return result;
    }
}
//# sourceMappingURL=Random.js.map