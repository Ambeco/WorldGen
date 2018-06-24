import { World_Continent } from "./World_Continent.js";
import { getBiggestValue, getByCDF, sumValues } from "../../Util/Distribution.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { BasePerson } from "../../Universal/Person/BasePerson.js";
import { DEFAULT_PEOPLE_PER_TIER } from "../../Universal/Configuration.js";
import { generateFameForWorldHero } from "../../Universal/Person/fameGen.js";
export class World {
    constructor(setting, rng) {
        this.setting = setting;
        const raceCounts = rng.rerandomMapValues(setting.raceCounts);
        const primaryRace = getBiggestValue(raceCounts);
        this.name = primaryRace[0].generateName(rng);
        this.population = sumValues(raceCounts);
        this.raceCounts = raceCounts;
        const continentCount = rng.nextIntNear(setting.approxContinentCount) + 1;
        this.locationDistribution = rng.randomizeAndSplitRange(new NumberRange(0, setting.approxWorldSize), continentCount);
        this.location = new NumberRange(0, this.locationDistribution[continentCount - 1].max);
        this.continents = World.generateContinents(setting, raceCounts, this.locationDistribution, rng);
        this.people = World.generateHeroes(this.locationDistribution, this.continents, this.population, rng);
    }
    static generateContinents(setting, raceCounts, locationDistribution, rng) {
        const raceDistributions = rng.splitMapIntegerValues(raceCounts, locationDistribution);
        const continents = [];
        for (let i = 0; i < locationDistribution.length; i++) {
            continents[i] = new World_Continent(setting, locationDistribution[i], raceDistributions[i], rng);
        }
        return continents;
    }
    static generateHeroes(locationDistribution, continents, population, rng) {
        const result = [];
        for (let i = 0; i < DEFAULT_PEOPLE_PER_TIER; i++) {
            result[i] = World.generateHero(locationDistribution, continents, population, rng);
        }
        return result;
    }
    static generateHero(locationDistribution, continents, population, rng) {
        const location = rng.nextPercent();
        const continent = getByCDF(location, locationDistribution, continents);
        const race = rng.nextWeightedKey(continent.raceCounts);
        const fame = generateFameForWorldHero(population, rng);
        return new BasePerson(location, race, fame, rng);
    }
    continentByLocation(location) {
        const continent = getByCDF(location, this.locationDistribution, this.continents);
        return continent;
    }
}
//# sourceMappingURL=World.js.map