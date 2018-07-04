import { NumberRange } from "./NumberRange.js";
import { logBase } from "./Distribution.js";

export interface RandomState {
    readonly m_w: number;
    readonly m_z: number;
}
export class Random {
    private m_w: number;
    private m_z: number;

    constructor(state: RandomState) {
        this.m_w = state.m_w;
        this.m_z = state.m_z;
    }

    static fromString(str: string): Random {
        let res:number = 0;
        const len: number = str.length;
        for (let i = 0; i < len; i++) {
            res = res * 31 + str.charCodeAt(i);
            res = res & res;
        }
        return new Random({ m_w: res, m_z: 987654321 });
    }

    getState(): RandomState {
        return { m_w: this.m_w, m_z: this.m_z };
    }

    // Returns number between 0 (inclusive) and 1.0 (exclusive),
    // just like Math.random().
    nextPercent(): number {
        const mask: number = 0xffffffff;
        this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & mask;
        this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & mask;
        let result = ((this.m_z << 16) + this.m_w) & mask;
        result /= 4294967296;
        return result + 0.5;
    }

    //from https://stackoverflow.com/a/49434653/845092
    private nextBoundNormalRaw(min: number, max: number, skew: number, stddev: number): number {
        if (min >= max) throw new Error("min=" + min + " must be less than max=" + max);
        if (skew < 0) throw new Error("skew=" + skew + " must be non-negative");
        const stddevPercent = stddev / (max - min);
        var u = 0, v = 0;
        while (u === 0) u = this.nextPercent(); //Converting [0,1) to (0,1)
        while (v === 0) v = this.nextPercent();
        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

        num = num * stddevPercent + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0)
            return this.nextBoundNormalRaw(min, max, skew, stddev * .75); // resample between 0 and 1 if out of range. Trim stddev to reduce likelihodd of deep recursion
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
        return num;
    }

    private nextBoundNormal(min: number, max: number, stddev: number): number {
        return this.nextBoundNormalRaw(min, max, 1, stddev);
    }

    private nextBoundNormalAround(min: number, max: number, around: number, stddev: number): number {
        if (min > around) throw new Error("min=" + min + " must be less than around=" + around);
        if (around > max) throw new Error("around=" + around + " must be less than max=" + max);
        const aroundPercent = (around - min) / (max - min);
        const skew = logBase(aroundPercent, 0.5);
        return this.nextBoundNormalRaw(min, max, skew, stddev);
    }

    nextNumber(min: number, max: number): number {
        if (min >= max) throw new Error("min=" + min + " must be less than max=" + max);
        return min + this.nextPercent() * (max - min);
    }

    nextNumberFromRange(range: NumberRange): number {
        if (range.min >= range.max) throw new Error("min=" + range.min + " must be less than max=" + range.max);
        return range.min + this.nextPercent() * (range.max - range.min);
    }

    nextInt(min: number, max: number): number {
        if (min >= max) throw new Error("min=" + min + " must be less than max=" + max);
        return min + Math.floor(this.nextPercent() * (max - min));
    }

    nextIntFromRange(range: NumberRange): number {
        if (range.min >= range.max) throw new Error("min=" + range.min + " must be less than max=" + range.max);
        return range.min + Math.floor(this.nextPercent() * (range.max - range.min));
    }

    nextIntNear(target: number): number {
        return this.nextInt(0, target) + this.nextInt(0, target);
    }

    nextElement<T>(array: T[]): T {
        return array[this.nextInt(0, array.length)];
    }

    nextWeightedIndex(array: number[]): number {
        let remains = this.nextNumber(0, 1);
        for (let i = 0; i < array.length - 1; i++) {
            remains -= array[i];
            if (remains < 0) return i;
        }
        return array.length - 1;
    }

    nextWeightedKey<T>(map: Map<T, number>): T {
        let remains = this.nextPercent();
        let last: T = map.keys().next().value;
        for (let element of map) {
            remains -= element[1];
            last = element[0];
            if (remains < 0) return last;
        }
        return last;
    }

    nextPercentAroundNumber(aroundPercent: number, stddev: number): number {
        return this.nextBoundNormalAround(0, 1, aroundPercent, stddev);
    }

    nextPercentAroundRange(range: NumberRange): number {
        if (range.min < 0 || range.max > 1.0) throw new Error("Invalid aroundPercent " + range);
        const expanded: NumberRange = new NumberRange(range.min / 2, 1 - (1 - range.max) / 2);
        const raw = this.nextPercent();
        if (raw <= expanded.min) {
            return this.translateRange(raw, new NumberRange(0.0, expanded.min), new NumberRange(0.0, range.min));
        } else if (raw < expanded.max) {
            return this.translateRange(raw, expanded, range);
        } else {
            return this.translateRange(raw, new NumberRange(expanded.max, 1.0), new NumberRange(range.max, 1.0));
        }
    }

    private translateRange(value: number, inputRange: NumberRange, outputRange: NumberRange): number {
        if (value < inputRange.min || value > inputRange.max) throw new Error("Invalid value for inputRnage " + inputRange);
        const ratio = (value - inputRange.min) / (inputRange.max - inputRange.min);
        return ratio * (outputRange.max - outputRange.min) + outputRange.min;
    }

    // The split ranges will sum to the old total
    splitRange(range: NumberRange, splitNWays: number, stddevRatio:number): NumberRange[] {
        const result: NumberRange[] = [];
        let curMin = range.min;
        for (let i = 0; i < splitNWays - 1; i++) {
            const remainItemCount = splitNWays - i;
            const rangeRemains = range.max - curMin;
            const estimate = rangeRemains / remainItemCount + curMin;
            const thisMax = this.nextBoundNormalAround(curMin, range.max, estimate, rangeRemains * stddevRatio);
            result[i] = new NumberRange(curMin, thisMax);
            curMin = thisMax;
        }
        // max out last item
        const lastIdx = splitNWays - 1;
        result[lastIdx] = new NumberRange(curMin, range.max);
        return result;
    }

    // The split ranges do NOT sum to the old total
    randomizeAndSplitRange(range: NumberRange, splitNWays: number, stddevRatio: number): NumberRange[] {
        const result: NumberRange[] = [];
        let curMin = range.min;
        for (let i = 0; i < splitNWays; i++) {
            const remainItemCount = splitNWays - i;
            const rangeRemains = range.max - curMin;
            const estimate = rangeRemains / remainItemCount + curMin;
            const thisMax = this.nextBoundNormalAround(curMin, range.max, estimate, rangeRemains * stddevRatio);
            result[i] = new NumberRange(curMin, thisMax);
            curMin = thisMax;
        }
        return result;
    }

    // The split ranges will sum to the old total
    splitMapIntegerValues<T>(map: Map<T, number>, split: NumberRange[], stddevRatio: number): Map<T, number>[] {
        const remains = new Map<T, number>(map); //clone
        const totalRange = split[split.length - 1].max - split[0].min;
        const result: Map<T, number>[] = [];
        for (let i = 0; i < split.length - 1; i++) {
            const remainMapCount = split.length - i;
            result[i] = new Map<T, number>();
            for (let element of remains) {
                const initialValue: number = element[1];
                const range = (split[i].max - split[i].min);
                const estimatedPercent = range / totalRange;
                const thisValue = Math.round(initialValue * this.nextPercentAroundNumber(estimatedPercent, estimatedPercent * stddevRatio));
                result[i].set(element[0], thisValue);
                remains.set(element[0], initialValue - thisValue);
            }
        }
        // max out last item
        const lastIdx = split.length - 1;
        result[lastIdx] = new Map<T, number>();
        for (let element of remains)
            result[lastIdx].set(element[0], element[1]);
        return result;
    }

    rerandomMapValues<T>(oldMap: Map<T, number>, stddevRatio: number): Map<T, number> {
        let total = 0;
        for (let element of oldMap) {
            total += element[1];
        }
        const newMap = new Map<T, number>();
        for (let element of oldMap) {
            const thisValue = Math.round(this.nextBoundNormalAround(0, total, element[1], element[1] * stddevRatio));
            newMap.set(element[0], thisValue);
        }
        return newMap;
    }
}