import { NumberRange } from "./NumberRange.js";
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
    nextBoundNormalRaw(min, max, skew) {
        if (min >= max)
            throw new Error("min=" + min + " must be less than max=" + max);
        var u = 0, v = 0;
        while (u === 0)
            u = this.nextPercent();
        while (v === 0)
            v = this.nextPercent();
        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        num = num / 10.0 + 0.5;
        if (num > 1 || num < 0)
            num = this.nextBoundNormalRaw(min, max, skew);
        num = Math.pow(num, skew);
        num *= max - min;
        num += min;
        return num;
    }
    nextBoundNormal(min, max) {
        return this.nextBoundNormalRaw(min, max, 1);
    }
    nextBoundNormalAround(min, max, around) {
        if (min > around)
            throw new Error("min=" + min + " must be less than around=" + around);
        if (around > max)
            throw new Error("around=" + around + " must be less than max=" + max);
        const aroundPercent = (around - min) / (max - min);
        const skew = 1 / aroundPercent - 1;
        return this.nextBoundNormalRaw(min, max, skew);
    }
    nextNumber(min, max) {
        return min + this.nextPercent() * (max - min);
    }
    nextNumberFromRange(range) {
        return range.min + this.nextPercent() * (range.max - range.min);
    }
    nextInt(min, max) {
        return min + Math.floor(this.nextPercent() * (max - min));
    }
    nextIntFromRange(range) {
        return range.min + Math.floor(this.nextPercent() * (range.max - range.min));
    }
    nextIntNear(target) {
        return this.nextInt(0, target) + this.nextInt(0, target);
    }
    nextElement(array) {
        return array[this.nextInt(0, array.length)];
    }
    nextWeightedIndex(array) {
        let remains = this.nextNumber(0, 1);
        for (let i = 0; i < array.length - 1; i++) {
            remains -= array[i];
            if (remains < 0)
                return i;
        }
        return array.length - 1;
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
    nextPercentAroundNumber(aroundPercent) {
        return this.nextBoundNormalAround(0, 1, aroundPercent);
    }
    nextPercentAroundRange(range) {
        if (range.min < 0 || range.max > 1.0)
            throw new Error("Invalid aroundPercent " + range);
        const expanded = new NumberRange(range.min / 2, 1 - (1 - range.max) / 2);
        const raw = this.nextPercent();
        if (raw <= expanded.min) {
            return this.translateRange(raw, new NumberRange(0.0, expanded.min), new NumberRange(0.0, range.min));
        }
        else if (raw < expanded.max) {
            return this.translateRange(raw, expanded, range);
        }
        else {
            return this.translateRange(raw, new NumberRange(expanded.max, 1.0), new NumberRange(range.max, 1.0));
        }
    }
    translateRange(value, inputRange, outputRange) {
        if (value < inputRange.min || value > inputRange.max)
            throw new Error("Invalid value for inputRnage " + inputRange);
        const ratio = (value - inputRange.min) / (inputRange.max - inputRange.min);
        return ratio * (outputRange.max - outputRange.min) + outputRange.min;
    }
    splitRange(range, splitNWays) {
        const result = [];
        let curMin = range.min;
        for (let i = 0; i < splitNWays - 1; i++) {
            const remainItemCount = splitNWays - i;
            const rangeRemains = range.max - curMin;
            const thisMax = this.nextBoundNormalAround(curMin, range.max, rangeRemains / remainItemCount + curMin);
            result[i] = new NumberRange(curMin, thisMax);
            curMin = thisMax;
        }
        const lastIdx = splitNWays - 1;
        result[lastIdx] = new NumberRange(curMin, range.max);
        return result;
    }
    randomizeAndSplitRange(range, splitNWays) {
        const result = [];
        let curMin = range.min;
        for (let i = 0; i < splitNWays; i++) {
            const remainItemCount = splitNWays - i;
            const rangeRemains = range.max - curMin;
            const thisMax = this.nextBoundNormalAround(curMin, range.max, rangeRemains / remainItemCount + curMin);
            result[i] = new NumberRange(curMin, thisMax);
            curMin = thisMax;
        }
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
                const thisValue = Math.round(initialValue * this.nextPercentAroundNumber(estimatedPercent));
                result[i].set(element[0], thisValue);
                remains.set(element[0], initialValue - thisValue);
            }
        }
        const lastIdx = split.length - 1;
        result[lastIdx] = new Map();
        for (let element of remains)
            result[lastIdx].set(element[0], element[1]);
        return result;
    }
    rerandomMapValues(oldMap) {
        let total = 0;
        for (let element of oldMap) {
            total += element[1];
        }
        const newMap = new Map();
        for (let element of oldMap) {
            const thisValue = Math.round(this.nextBoundNormalAround(0, total, element[1]));
            newMap.set(element[0], thisValue);
        }
        return newMap;
    }
}
//# sourceMappingURL=Random.js.map