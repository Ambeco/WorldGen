import { World_Continent } from "./World_Continent.js";
import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { getBiggestValue, getByCDF, sumValues } from "../../Util/Distribution.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { BasePerson } from "../../Universal/Person/BasePerson.js";
import { DEFAULT_PEOPLE_PER_TIER } from "../../Universal/Configuration.js";

export class World {
    public readonly name: string;
    public readonly population: number;
    public readonly raceCounts: Map<Race, number>;
    readonly locationDistribution: NumberRange[];
    readonly continents: World_Continent[];
    readonly people: BasePerson[];

    constructor(raceCounts: Map<Race, number>, rng: Random) {
        raceCounts = rng.rerandomMapValues(raceCounts);
        const primaryRace: [Race, number] = getBiggestValue(raceCounts);
        this.name = primaryRace[0].generateName(rng);
        this.population = sumValues(raceCounts);
        this.raceCounts = raceCounts;
        const continentCount = rng.nextInt(1, 4) + rng.nextInt(0, 3);
        this.locationDistribution = rng.splitRange(new NumberRange(0, 1), continentCount);
        this.continents = World.generateContinents(raceCounts, this.locationDistribution, rng);
        this.people = World.generateHeroes(this.locationDistribution, this.continents, this.population, rng);
    }

    private static generateContinents(raceCounts: Map<Race, number>, locationDistribution: NumberRange[], rng: Random): World_Continent[] {
        const raceDistributions: Map<Race, number>[] = rng.splitMapIntegerValues(raceCounts, locationDistribution);
        const continents: World_Continent[] = [];
        for (let i = 0; i < locationDistribution.length; i++) {
            continents[i] = new World_Continent(locationDistribution[i], raceDistributions[i], rng);
        }
        return continents;
    }

    private static generateHeroes(locationDistribution: NumberRange[], continents: World_Continent[], population: number, rng: Random): BasePerson[] {
        const result: BasePerson[] = [];
        for (let i = 0; i < DEFAULT_PEOPLE_PER_TIER; i++) {
            result[i] = World.generateHero(locationDistribution, continents, population, rng);
        }
        return result;
    }

    private static generateHero(locationDistribution: NumberRange[], continents: World_Continent[], population: number, rng: Random): BasePerson {
        const location: number = rng.nextPercent();
        const continent: World_Continent = getByCDF(location, locationDistribution, continents);
        const race = rng.nextWeightedKey(continent.raceCounts);
        return new BasePerson(location, race, rng);
    }

    public continentByLocation(location: number): World_Continent {
        const continent: World_Continent = getByCDF(location, this.locationDistribution, this.continents);
        return continent;
    }
}