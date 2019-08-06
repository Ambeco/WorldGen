import { Race } from "./Race.js";
import { Random } from "../../Util/Random";

export type Meters = number & { __metersBrand: any };
export function Meters(i: number): Meters { return i as Meters; }

export type SqMeters = number & { __sqMetersBrand: any };
export function SqMeters(i: number): SqMeters { return i as SqMeters; }

export type ContinentHeightPercent = number & { __continentHeightPercentBrand: any };
export function ContinentHeightPercent(i: number): ContinentHeightPercent { return i as ContinentHeightPercent; }

export class Setting {
    readonly name: string;
    readonly races: Race[];
    readonly raceCounts: Map<Race, number>;

    //https://www.google.com/search?q=hadley+cells&rlz=1C1CHBF_enUS795US795&oq=hadley+cell&aqs=chrome.0.69i59j69i57j69i60j0l3.1850j0j4&sourceid=chrome&ie=UTF-8
    //Hadley Cells drive rainfall and tradewinds
    public get hadleyCellDistance(): Meters { return Meters(this.avgContinentWidth * 2); }
    //Distance between hottest continents and Coldest continents
    public get equatorToPoleDistance(): Meters { return Meters(this.avgContinentWidth * 8); }
    public get maxContinentElevation(): Meters { return Meters(4500); }
    public get minContinentElevation(): Meters { return Meters(-6000); }
    public get maxMountainRangeHeight(): Meters { return Meters(8000); }
    public get minMountainHeight(): Meters { return Meters(600); }
    public get oceanLevelPercent(): ContinentHeightPercent { return ContinentHeightPercent(.7); }
    
    public get avgContinentArea(): SqMeters { return SqMeters(184826732000); } //washington state in m^2
    public get avgContinentAreaRatio(): number { return 6; } //how much bigger one continent can be than another
    public get avgContinentWidth(): Meters { return Meters(Math.sqrt(this.avgContinentArea)); }

    public generateWorldName(rng: Random) {
        const race = rng.nextWeightedKey(this.raceCounts);
        return race.generateName(rng);
    }

    constructor(name: string, races: Race[], raceCounts: Map<Race, number>) {
        this.name = name;
        this.races = races;
        this.raceCounts = raceCounts;
    }

    toString(): string { return name; }
}