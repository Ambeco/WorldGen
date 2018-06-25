import { World_Continent } from "./World_Continent.js";
import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { getBiggestValue, getByCDF, sumValues } from "../../Util/Distribution.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { BasePerson } from "../../Universal/Person/BasePerson.js";
import { DEFAULT_PEOPLE_PER_TIER, WORLD_RACE_RERANDOM_STDDEV_RATIO, WORLD_SIZE_RERANDOM_STDDEV_RATIO } from "../../Universal/Configuration.js";
import { generateFameForWorldHero } from "../../Universal/Person/fameGen.js";

export class World {
    public readonly setting: Setting;
    public readonly name: string;
    public readonly location: NumberRange;
    public readonly population: number;
    public readonly raceCounts: Map<Race, number>;
    readonly locationDistribution: NumberRange[];
    readonly continents: World_Continent[];
    readonly people: BasePerson[];

    constructor(setting: Setting, rng: Random) {
        this.setting = setting;
        const raceCounts = rng.rerandomMapValues(setting.raceCounts, WORLD_RACE_RERANDOM_STDDEV_RATIO);
        const primaryRace: [Race, number] = getBiggestValue(raceCounts);
        this.name = primaryRace[0].generateName(rng);
        this.population = sumValues(raceCounts);
        this.raceCounts = raceCounts;
        const continentCount = rng.nextIntNear(setting.approxContinentCount) + 1;
        this.locationDistribution = rng.randomizeAndSplitRange(new NumberRange(0, setting.approxWorldSize), continentCount, WORLD_SIZE_RERANDOM_STDDEV_RATIO);
        this.location = new NumberRange(0, this.locationDistribution[continentCount - 1].max);
        this.continents = World.generateContinents(setting, raceCounts, this.locationDistribution, rng);
        this.people = World.generateHeroes(this.locationDistribution, this.continents, this.population, rng);
    }

    private static generateContinents(setting: Setting, raceCounts: Map<Race, number>, locationDistribution: NumberRange[], rng: Random): World_Continent[] {
        const raceDistributions: Map<Race, number>[] = rng.splitMapIntegerValues(raceCounts, locationDistribution, WORLD_RACE_RERANDOM_STDDEV_RATIO);
        const continents: World_Continent[] = [];
        for (let i = 0; i < locationDistribution.length; i++) {
            continents[i] = new World_Continent(setting, locationDistribution[i], raceDistributions[i], rng);
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
        const fame = generateFameForWorldHero(population, rng);
        return new BasePerson(location, race, fame, rng);
    }

    public continentByLocation(location: number): World_Continent {
        const continent: World_Continent = getByCDF(location, this.locationDistribution, this.continents);
        return continent;
    }
}