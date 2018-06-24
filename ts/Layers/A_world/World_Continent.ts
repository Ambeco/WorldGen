﻿import { Random, RandomState } from "../../Util/Random.js";
import { Race } from "../../Universal/Setting/Race.js";
import { getBiggestValue } from "../../Util/Distribution.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { BasePerson } from "../../Universal/Person/BasePerson.js";

export class World_Continent {
    public readonly randomState: RandomState;
    public readonly name: string;
    public readonly location: NumberRange; //0.0-1.0 
    public readonly raceCounts: Map<Race, number>;
    readonly people: BasePerson[];

    constructor(location: NumberRange, raceCounts: Map<Race, number>, rng: Random) {
        const primaryRace: [Race, number] = getBiggestValue(raceCounts);
        this.name = primaryRace[0].generateName(rng);
        this.location = location;
        this.people = [];
        this.raceCounts = raceCounts;
        this.randomState = rng.getState();
    }
}