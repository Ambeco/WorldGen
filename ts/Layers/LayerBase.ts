﻿import { LayerStub } from "./LayerStub.js";
import { Random, RandomState } from "../Util/Random.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { Race } from "../Universal/Setting/Race.js";
import { getBiggestValue, getByCDF, sumValues } from "../Util/Distribution.js";
import { NumberRange } from "../Util/NumberRange.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { DEFAULT_PEOPLE_PER_TIER, LAYER_RACE_RERANDOM_STDDEV_RATIO, LAYER_SIZE_RERANDOM_STDDEV_RATIO } from "../Universal/Configuration.js";
import { Layer } from "./Layer.js";
import { nonNull } from "../Util/nonNull.js";

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

    constructor(stub: LayerStub, approxSubLayerCount: number, rng: Random) {
        this.setting = stub.setting;
        this.name = stub.name;
        this.population = sumValues(stub.raceCounts);
        this.raceCounts = stub.raceCounts;
        this.location = stub.location;
        this.people = stub.people;
        
        const subLayerCount = approxSubLayerCount > 0 ? rng.nextIntNear(approxSubLayerCount) + 1 : 0;
        this.subLayerLocations = rng.splitRange(stub.location, subLayerCount, LAYER_SIZE_RERANDOM_STDDEV_RATIO);
        this.subLayers = this.generateSubLayerStubs(rng);
        this.addMissingPeople(rng);
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

    protected addMissingPeople(rng: Random) {
        const remaining = new Map<Race, number>(this.raceCounts);
        while (this.people.length < DEFAULT_PEOPLE_PER_TIER && this.people.length < this.population) {
            const person = this.addPerson(remaining, rng);
            const prevRaceCount = nonNull(remaining.get(person.race), "cannot find race " + person.race);
            remaining.set(person.race, prevRaceCount - 1);
        }
    }

    protected addPerson(races: Map<Race, number>, rng: Random): BasePerson {
        const location: number = rng.nextNumber(this.location.min, this.location.max);
        const subLayer: LayerStub = getByCDF(location, this.subLayerLocations, this.subLayers);
        const race = rng.nextWeightedKey(races);
        const fame = this.generateFameForHero(rng);
        const person = new BasePerson(location, race, fame, rng);
        subLayer.people.push(person);
        this.people.push(person);
        return person;
    }

    public subLayerByLocation(location: number): StubType {
        const sublayer: StubType = getByCDF(location, this.subLayerLocations, this.subLayers);
        return sublayer;
    }

    toString(): string { return this.layerName + ": " + this.name; }
}