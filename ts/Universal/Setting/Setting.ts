import { Race } from "./Race.js";

export class Setting {
    public readonly name: string;
    public readonly races: Race[];
    public readonly raceCounts: Map<Race, number>;

    public get approxContinentCount() { return 3; }
    public get approxCountryCount() { return 10; }
    public get approxRegionCount() { return 3; }
    public get approxCityCount() { return 10; }
    public get approxNeighborhoodCount() { return 13; }
    public get approxStreetCount() { return 7; }
    public get approxBuildingCount() { return 15; }

    public get approxWorldPopulation(): number { return this.approxContinentPopulation * this.approxContinentCount; } // default is 1'984'500
    public get approxContinentPopulation(): number { return this.approxCountryPopulation * this.approxCountryCount; }
    public get approxCountryPopulation(): number { return this.approxRegionPopulation * this.approxRegionCount; }
    public get approxRegionPopulation(): number { return this.approxCityPopulation * this.approxCityCount; }
    public get approxCityPopulation(): number { return this.approxNeighborhoodPopulation * this.approxNeighborhoodCount; }
    public get approxNeighborhoodPopulation(): number { return this.approxStreetPopulation * this.approxStreetCount; }
    public get approxStreetPopulation(): number { return this.approxBuildingPopulation * this.approxBuildingCount; }
    public get approxBuildingPopulation(): number { return 3; }

    //other layers will fill 100% of parent.  There is no part of a continent with no country, no part of country with no region, no part of neighborhood with no street, etc.
    public get approxWorldSize() { return 1969000000; } //earth in miles
    public get approxContinentSize() { return 9540000; } //north america in sq mi
    public get approxCountrySize() { return this.approxCountryPopulation / this.approxContinentPopulation * this.approxContinentSize; } //default is 954'000 sq mi
    public get approxRegionSize() { return this.approxRegionPopulation / this.approxCountryPopulation * this.approxCountrySize; } //default is 318'000 sq mi
    public get approxCitySize() { return 84; } //seattle in sq mi
    public get approxNeighborhoodSize() { return this.approxNeighborhoodPopulation / this.approxCityPopulation * this.approxCitySize; } //6.146 sq mi
    public get approxStreetSize() { return this.approxStreetPopulation / this.approxNeighborhoodPopulation * this.approxNeighborhoodSize; } //616'359 sq ft
    public get approxBuildingSize() { return 5.552686e-5; } //my apartment size

    constructor(name: string, races: Race[], raceCounts: Map<Race, number>) {
        this.name = name;
        this.races = races;
        this.raceCounts = raceCounts;
    }

    toString(): string { return name; }
}