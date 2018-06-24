import { Relationship } from "./Relationship.js";
import { Random } from "../../Util/Random.js";
import { Race } from "../Setting/Race.js";
import { TraitsFromNothing, PersonalityTraits } from "./PersonalityTraits.js";
import { JobCategory } from "../Setting/Job.js";
import { getBiggestNIndexes, getSmallestNIndexes } from "../../Util/Distribution.js";

export class BasePerson {
    public readonly location: number; //0.0-1.0 
    public readonly firstName: string;
    public readonly familyName: string;
    public readonly race: Race;
    public readonly jobName: string;
    public readonly jobCategory: JobCategory;
    public readonly fame: number; //0-100. Roughly: Home is 10+. Street is 20+. Neighborhood is 40+. City is 60+. Country is 80+. Continent is 90+. World is 100.
    readonly traits: number[]; //0-100, one for each OpinionCategory

    constructor(location: number, race: Race, fame: number, rng: Random) {
        this.location = location;
        this.firstName = race.generateName(rng);
        this.familyName = race.generateName(rng);
        this.race = race;
        this.fame = fame;
        this.traits = TraitsFromNothing(rng);
        this.jobName = "Warrior";
        this.jobCategory = JobCategory.AdventurerMartial;
    }

    public getDescription(): string {
        return this.firstName + " is tall, strong, and red.";
    }

    public getPersonality(): string {
        const highTraits: number[] = getBiggestNIndexes(this.traits, 3);
        const lowTraits: number[] = getSmallestNIndexes(this.traits, 2);
        const test: string = "" + PersonalityTraits[highTraits[0]];
        const result = this.familyName + " is " + PersonalityTraits[highTraits[0]] + ", "
            + PersonalityTraits[highTraits[1]] + ", and " + PersonalityTraits[highTraits[2]] + ". "
            + this.familyName + " is not very " + PersonalityTraits[lowTraits[0]] + " or "
            + PersonalityTraits[lowTraits[1]] + ".";
        return result;
    }
}