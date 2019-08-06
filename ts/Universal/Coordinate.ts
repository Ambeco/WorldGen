export class Coordinate {
    public constructor(readonly x: number, readonly y: number) {}

    midpointTo(second: Coordinate): Coordinate {
        return new Coordinate((this.x + second.x) / 2, (this.y + second.y) / 2);
    }

    distanceSqTo(second: Coordinate): number {
        const dx = second.x - this.x;
        const dy = second.y - this.y;
        return dx * dx + dy + dy;
    }

    distanceTo(second: Coordinate): number {
        return Math.sqrt(this.distanceSqTo(second));
    }

    public toString(): string { return this.x + "," + this.y;}
}