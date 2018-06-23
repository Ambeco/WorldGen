export class Random {
    constructor(seed) {
        this.m_w = 123456789;
        this.m_z = 987654321;
        this.m_w = seed;
    }
    static fromString(str) {
        let res = 0;
        const len = str.length;
        for (let i = 0; i < len; i++) {
            res = res * 31 + str.charCodeAt(i);
            res = res & res;
        }
        return new Random(res);
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
    nextWieghtedIndex(probabilityList) {
        let remains = this.nextPercent();
        let index = -1;
        while (remains >= 0) {
            index += 1;
            remains -= probabilityList[index];
        }
        return index;
    }
    nextWeightedElement(array, probabilityList) {
        return array[this.nextWieghtedIndex(probabilityList)];
    }
}
//# sourceMappingURL=Random.js.map