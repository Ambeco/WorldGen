import { LayerStub } from "./LayerStub.js";
import { Random, RandomState } from "../Util/Random.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { Race } from "../Universal/Setting/Race.js";
import { getBiggestValue, getByCDF, sumValues } from "../Util/Distribution.js";
import { NumberRange } from "../Util/NumberRange.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { DEFAULT_PEOPLE_PER_TIER, LAYER_RACE_RERANDOM_STDDEV_RATIO, LAYER_SIZE_RERANDOM_STDDEV_RATIO } from "../Universal/Configuration.js";
import { Layer } from "./Layer.js";

export abstract class LayerBase<StubType extends LayerStub> implements Layer {
    readonly layerName: string; //"World", "City", etc

    readonly randomState: RandomState;
    readonly setting: Setting;
    readonly name: string;
    readonly location: NumberRange;
    readonly population: number;
    readonly raceCounts: Map<Race, number>;
    readonly subLayerLocations: NumberRange[];
    readonly people: BasePerson[];
    readonly subLayers: StubType[];
    get genericSubLayers(): LayerStub[] { return this.subLayers; }

    constructor(setting: Setting, location: NumberRange, raceCounts: Map<Race, number>, approxSubLayerCount: number, rng: Random) {
        this.setting = setting;
        const primaryRace: [Race, number] = getBiggestValue(raceCounts);
        this.name = primaryRace[0].generateName(rng);
        this.population = sumValues(raceCounts);
        this.raceCounts = raceCounts;
        const subLayerCount = rng.nextIntNear(approxSubLayerCount) + 1;
        this.subLayerLocations = rng.splitRange(location, subLayerCount, LAYER_SIZE_RERANDOM_STDDEV_RATIO);
        this.location = new NumberRange(0, this.subLayerLocations[subLayerCount - 1].max);
        this.subLayers = this.generateSubLayerStubs(rng);
        this.people = this.generateHeroes(this.subLayerLocations, this.subLayers, rng);
        this.randomState = rng.getState();
    }

    protected abstract generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): StubType;

    protected abstract generateFameForHero(rng: Random): number;

    generateFullData(): Layer {
        return this;
    }

    private generateSubLayerStubs(rng: Random): StubType[] {
        const raceDistributions: Map<Race, number>[] = rng.splitMapIntegerValues(this.raceCounts, this.subLayerLocations, LAYER_RACE_RERANDOM_STDDEV_RATIO);
        const subLayers: StubType[] = [];
        for (let i = 0; i < this.subLayerLocations.length; i++) {
            subLayers[i] = this.generateSubLayerStub(this.subLayerLocations[i], raceDistributions[i], rng);
        }
        return subLayers;
    }

    private generateHeroes<StubType extends LayerStub>(locationDistribution: NumberRange[], subLayers: StubType[], rng: Random): BasePerson[] {
        const result: BasePerson[] = [];
        for (let i = 0; i < DEFAULT_PEOPLE_PER_TIER; i++) {
            result[i] = this.generateHero(locationDistribution, subLayers, rng);
        }
        return result;
    }

    private generateHero<StubType extends LayerStub>(locationDistribution: NumberRange[], subLayers: StubType[], rng: Random): BasePerson {
        const location: number = rng.nextPercent();
        const subLayer: StubType = getByCDF(location, locationDistribution, subLayers);
        const race = rng.nextWeightedKey(subLayer.raceCounts);
        const fame = this.generateFameForHero(rng);
        return new BasePerson(location, race, fame, rng);
    }

    public subLayerByLocation(location: number): StubType {
        const sublayer: StubType = getByCDF(location, this.subLayerLocations, this.subLayers);
        return sublayer;
    }

    toString(): string { return this.layerName + ": " + this.name; }
}