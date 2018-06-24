import { World_Continent } from "./World_Continent";
import { getBiggestValue, getByCDF } from "../../Util/Distribution";
import { BasePerson } from "../../Universal/Person/BasePerson";
export class World {
    constructor(raceCounts, rng) {
        raceCounts = rng.rerandomMapValues(raceCounts);
        const primaryRace = getBiggestValue(raceCounts);
        this.name = primaryRace[0].generateName(rng);
        this.population = World.getPopulation(raceCounts);
        const continentCount = rng.nextInt(1, 4) + rng.nextInt(0, 3);
        this.locationDistribution = rng.splitRange({ min: 0, max: 1 }, continentCount);
        this.continents = World.generateContinents(raceCounts, this.locationDistribution, rng);
        this.people = World.generateHeroes(this.locationDistribution, this.continents, this.population, rng);
    }
    static generateContinents(raceCounts, locationDistribution, rng) {
        const raceDistributions = rng.splitMapIntegerValues(raceCounts, locationDistribution);
        const continents = [];
        for (let i = 0; i < locationDistribution.length; i++) {
            continents[i] = new World_Continent(locationDistribution[i], raceDistributions[i], rng);
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
    static getPopulation(raceCounts) {
        let result = 0;
        for (let element of raceCounts) {
            result += element[1];
        }
        return result;
    }
    static generateHero(locationDistribution, continents, population, rng) {
        const location = rng.nextPercent();
        const continent = getByCDF(location, locationDistribution, continents);
        const race = rng.nextWeightedKey(continent.raceCounts);
        return new BasePerson(location, race, rng);
    }
}
//# sourceMappingURL=World.js.map