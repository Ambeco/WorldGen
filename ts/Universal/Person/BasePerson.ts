import { Relationship } from "./Relationship.js";
import { Random } from "../../Util/Random.js";
import { Race } from "../Setting/Race.js";
import { PersonalityTraits } from "./PersonalityTraits.js";
import { JobCategory } from "../Setting/Job.js";

export class BasePerson {
    public readonly location: number; //0.0-1.0 
    public readonly firstName: string;
    public readonly familyName: string;
    public readonly race: Race;
    public readonly jobName: string;
    public readonly jobCategory: JobCategory;
    public readonly fame: number; //0-100. Roughly: Home is 10+. Street is 20+. Neighborhood is 40+. City is 60+. Country is 80+. Continent is 90+. World is 100.
    readonly traits: PersonalityTraits;

    constructor(location: number, race: Race, fame: number, rng: Random) {
        this.location = location;
        this.firstName = race.generateName(rng);
        this.familyName = race.generateName(rng);
        this.race = race;
        this.fame = fame;
        this.traits = PersonalityTraits.fromTemplate(race.traits, 0.5, rng);
        this.jobName = "Warrior";
        this.jobCategory = JobCategory.AdventurerMartial;
    }

    public getDescription(): string {
        return this.firstName + " is tall, strong, and red.";
    }

    public getPersonality(): string {
        const highTraits: [string,number][] = this.traits.getHighTraits(3);
        const lowTraits: [string, number][] = this.traits.getLowTraits(2);
        const result = this.familyName + " is " + highTraits[0][0] + ", "
            + highTraits[1][0] + ", and " + highTraits[2][0] + ". "
            + this.familyName + " is not very " + lowTraits[0][0] + " or "
            + lowTraits[1][0] + ".";
        return result;
    }

    toString(): string { return "Person: " + this.firstName; }
}