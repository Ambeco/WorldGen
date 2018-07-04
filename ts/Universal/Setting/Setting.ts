import { Race } from "./Race.js";

export class Setting {
    public readonly name: string;
    public readonly races: Race[];
    public readonly raceCounts: Map<Race, number>;
    public get approxContinentCount() { return 3; }
    public get approxCountryCount() { return 10; }
    public get approxRegionCount() { return 3; }
    public get approxCityCount() { return 10; }
    public get approxNeighborhoodCount() { return 7; }
    public get approxStreetCount() { return 7; }
    public get approxResidenceCount() { return 15; }
    public get approxIndividualCount() { return 3; }
    public get approxPopulationCount(): number { // default is 1'984'500
        return this.approxIndividualCount * this.approxResidenceCount * this.approxStreetCount * this.approxNeighborhoodCount * this.approxCityCount * this.approxRegionCount * this.approxCountryCount * this.approxContinentCount;
    }

    //other layers will fill 100% of parent.  There is no part of a continent with no country, no part of country with no region, no part of neighborhood with no street, etc.
    public get approxWorldSize() { return 1969000000; } //earth in miles
    public get approxContinentSize() { return 9540000; } //north america in miles
    public get approxCitySize() { return 83; } //seattle in miles
    public get approxResidenceSize() { return 5.552686e-5; } //average seattle house in miles

    constructor(name: string, races: Race[], raceCounts: Map<Race, number>) {
        this.name = name;
        this.races = races;
        this.raceCounts = raceCounts;
    }

    toString(): string { return name; }
}