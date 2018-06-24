export class NumberRange {
    public readonly min: number;
    public readonly max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
    toString(): string {
        return "[" + this.min + " to " + this.max + "]";
    }
}