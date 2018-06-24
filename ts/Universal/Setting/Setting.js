export class Setting {
    get approxContinentCount() { return 3; }
    get approxCountryCount() { return 10; }
    get approxRegionCount() { return 3; }
    get approxCityCount() { return 10; }
    get approxNeighborhoodCount() { return 7; }
    get approxStreetCount() { return 7; }
    get approxResidenceCount() { return 15; }
    get approxIndividualCount() { return 3; }
    get approxPopulationCount() {
        return this.approxIndividualCount * this.approxResidenceCount * this.approxStreetCount * this.approxNeighborhoodCount * this.approxCityCount * this.approxRegionCount * this.approxCountryCount * this.approxContinentCount;
    }
    get approxWorldSize() { return 1969000000; }
    get approxContinentSize() { return 9540000; }
    get approxCitySize() { return 83; }
    get approxResidenceSize() { return 5.552686e-5; }
    constructor(name, races, raceCounts) {
        this.name = name;
        this.races = races;
        this.raceCounts = raceCounts;
    }
}
//# sourceMappingURL=Setting.js.map