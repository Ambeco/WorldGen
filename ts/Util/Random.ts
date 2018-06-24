import { NumberRange } from "./NumberRange";

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

    nextNumber(min: number, max: number): number {
        return min + this.nextPercent() * (max - min);
    }

    nextNumberFromRange(range: NumberRange): number {
        return range.min + this.nextPercent() * (range.max - range.min);
    }

    nextInt(min: number, max: number): number {
        return min + Math.floor(this.nextPercent() * (max - min));
    }

    nextIntFromRange(range: NumberRange): number {
        return range.min + Math.floor(this.nextPercent() * (range.max - range.min));
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

    nextPercentAroundNumber(aroundPercent: number): number {
        if (aroundPercent < 0 || aroundPercent > 1.0) throw new Error("Invalid aroundPercent " + aroundPercent);
        const raw = this.nextPercent();
        if (raw <= 0.5) {
            return raw * 2 * aroundPercent;
        } else {
            const range = 1 - aroundPercent;
            const percentInRange = (1 - raw) * 2;
            return aroundPercent + range * percentInRange;
        }
    }

    nextPercentAroundRange(range: NumberRange): number {
        if (range.min < 0 || range.max > 1.0) throw new Error("Invalid aroundPercent " + range);
        const expanded: NumberRange = { min: range.min / 2, max: 1 - (1 - range.max) / 2 };
        const raw = this.nextPercent();
        if (raw <= expanded.min) {
            return this.translateRange(raw, { min: 0.0, max: expanded.min }, { min: 0.0, max: range.min });
        } else if (raw < expanded.max) {
            return this.translateRange(raw, expanded, range);
        } else {
            return this.translateRange(raw, { min: expanded.max, max: 1.0 }, { min: range.max, max: 1.0 })
        }
    }

    private translateRange(value: number, inputRange: NumberRange, outputRange: NumberRange): number {
        if (value < inputRange.min || value > inputRange.max) throw new Error("Invalid value for inputRnage " + inputRange);
        const ratio = (value - inputRange.min) / (inputRange.max - inputRange.min);
        return ratio * (outputRange.max - outputRange.min) + outputRange.min;
    }

    splitRange(range: NumberRange, splitNWays: number): NumberRange[] {
        const result: NumberRange[] = [];
        let curMin = range.min;
        for (let i = 0; i < splitNWays - 1; i++) {
            const remainItemCount = splitNWays - i;
            const rangeRemains = range.max - curMin;
            const thisMax = curMin + rangeRemains * this.nextPercentAroundNumber(1 / remainItemCount);
            result[i] = { min: curMin, max: thisMax };
            curMin = thisMax;
        }
        // max out last item
        const lastIdx = splitNWays - 1;
        result[lastIdx] = { min: curMin, max: range.max };
        return result;
    }

    splitMapIntegerValues<T>(map: Map<T, number>, split: NumberRange[]): Map<T, number>[] {
        const remains = new Map<T, number>(map); //clone
        const totalRange = split[split.length - 1].max - split[0].min;
        const result: Map<T, number>[] = [];
        for (let i = 0; i < split.length - 1; i++) {
            const remainMapCount = split.length - i;
            result[i] = new Map<T, number>();
            for (let element of remains) {
                const initialValue: number = element[1];
                const estimatedPercent = (split[i].max - split[i].min) / totalRange;
                const thisValue = Math.round(initialValue * this.nextPercentAroundNumber(estimatedPercent));
                result[i].set(element[0], thisValue);
                remains.set(element[0], initialValue - thisValue);
            }
        }
        // max out last item
        const lastIdx = split.length - 1;
        for (let element of remains)
            result[lastIdx].set(element[0], element[1]);
        return result;
    }

    rerandomMapValues<T>(oldMap: Map<T, number>): Map<T, number> {
        let total = 0;
        for (let element of oldMap) {
            total += element[1];
        }
        const newMap = new Map<T, number>();
        for (let element of oldMap) {
            const thisValue = Math.round(this.nextPercentAroundNumber(element[1] / total) * total);
            newMap.set(element[0], thisValue);
        }
        return newMap;
    }
}