export class NumberRange {
    constructor(
        readonly min: number,
        readonly max: number)
    { }

    toString(): string {
        return "[" + this.min + " to " + this.max + "]";
    }
}