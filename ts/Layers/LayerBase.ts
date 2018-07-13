import { LayerStub, LayerEnum } from "./LayerStub.js";
import { Random, RandomState } from "../Util/Random.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { Race } from "../Universal/Setting/Race.js";
import { getBiggestValue, getByCDF, sumValues } from "../Util/Distribution.js";
import { NumberRange } from "../Util/NumberRange.js";
import { PersonStub } from "../Universal/Person/PersonStub.js";
import { DEFAULT_PEOPLE_PER_TIER, LAYER_RACE_RERANDOM_STDDEV_RATIO, LAYER_SIZE_RERANDOM_STDDEV_RATIO, SUBLAYER_COUNT_RANDOM_STDDEV_RATIO } from "../Universal/Configuration.js";
import { Layer } from "./Layer.js";
import { nonNull } from "../Util/nonNull.js";

export abstract class LayerBase<StubType extends LayerStub> implements Layer {
    readonly layer: LayerEnum;

    readonly randomState: RandomState;
    readonly setting: Setting;
    readonly name: string;
    readonly location: NumberRange;
    readonly population: number;
    readonly raceCounts: Map<Race, number>;
    readonly subLayerLocations: NumberRange[];
    readonly people: PersonStub[];
    readonly subLayers: StubType[];
    get genericSubLayers(): LayerStub[] { return this.subLayers; }

    constructor(stub: LayerStub, approxSubLayerPopulation: number, rng: Random) {
        this.setting = stub.setting;
        this.name = stub.name;
        this.population = sumValues(stub.raceCounts);
        this.raceCounts = stub.raceCounts;
        this.location = stub.location;
        this.people = stub.people;
        this.subLayerLocations = this.generateSubLayers(stub, approxSubLayerPopulation, rng);
        this.subLayers = this.generateSubLayerStubs(rng);
        this.addMissingPeople(rng);
        this.randomState = rng.getState();
    }

    protected abstract generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): StubType;

    generateFullData(): Layer {
        return this;
    }

    protected generateSubLayers(stub: LayerStub, approxSubLayerPopulation: number, rng: Random): NumberRange[] {
        const subLayerMax = Math.max(this.population, 1);
        const subLayerEst = Math.max(this.population / approxSubLayerPopulation, 1);
        const subLayerMin = Math.max(subLayerEst / 2, 1);
        const subLayerCount = rng.nextIntFromRangeNear(subLayerMin, subLayerMax, subLayerEst, SUBLAYER_COUNT_RANDOM_STDDEV_RATIO);
        return rng.splitRange(stub.location, subLayerCount, LAYER_SIZE_RERANDOM_STDDEV_RATIO);
    }

    private generateSubLayerStubs(rng: Random): StubType[] {
        const raceDistributions: Map<Race, number>[] = rng.splitMapIntegerValues(this.raceCounts, this.subLayerLocations, LAYER_RACE_RERANDOM_STDDEV_RATIO);
        const subLayers: StubType[] = [];
        for (let i = 0; i < this.subLayerLocations.length; i++) {
            subLayers[i] = this.generateSubLayerStub(this.subLayerLocations[i], raceDistributions[i], rng);
        }
        return subLayers;
    }

    protected addMissingPeople(rng: Random) {
        const remaining = new Map<Race, number>(this.raceCounts);
        while (this.people.length < DEFAULT_PEOPLE_PER_TIER && this.people.length < this.population) {
            const person = this.addPerson(remaining, rng);
            const prevRaceCount = nonNull(remaining.get(person.race), "cannot find race " + person.race);
            remaining.set(person.race, prevRaceCount - 1);
        }
    }

    protected addPerson(races: Map<Race, number>, rng: Random): PersonStub {
        const location: number = rng.nextNumber(this.location.min, this.location.max);
        const subLayer: LayerStub = getByCDF(location, this.subLayerLocations, this.subLayers);
        const race = rng.nextWeightedKey(races);
        const fame = this.layer;
        const person = new PersonStub(location, race, fame, rng);
        subLayer.people.push(person);
        this.people.push(person);
        return person;
    }

    public subLayerByLocation(location: number): StubType {
        const sublayer: StubType = getByCDF(location, this.subLayerLocations, this.subLayers);
        return sublayer;
    }

    toString(): string { return LayerEnum[this.layer] + ": " + this.name; }
}