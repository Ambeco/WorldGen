import { Relationship } from "./Relationship.js";
import { Random } from "../../Util/Random.js";
import { Race } from "../Setting/Race.js";
import { PersonalityTraits } from "./PersonalityTraits.js";
import { JobCategory } from "../Setting/Job.js";
import { Gender } from "./Gender.js";
import { LayerEnum } from "../../Layers/LayerStub.js";

export enum AgeCategory {
    Baby, //0
    Toddler, //0-5
    Child, //6-12
    Teenager, //13-17
    YoungAdult, //18-24
    Adult, //25-39
    MiddleAge, //40-59
    Senior, //60-79
    Elder, //80+
}

export class PersonStub {
    public readonly location: number; //0.0-1.0 
    public readonly firstName: string;
    public readonly familyName: string;
    public readonly race: Race;
    public readonly gender: Gender;
    public readonly age: number;
    public readonly ageCategory: AgeCategory;
    public readonly jobName: string;
    public readonly jobCategory: JobCategory;
    public readonly fame: LayerEnum; //0-100. Roughly: Home is 10+. Street is 20+. Neighborhood is 40+. City is 60+. Country is 80+. Continent is 90+. World is 100.
    readonly traits: PersonalityTraits;

    constructor(location: number, race: Race, fame: LayerEnum, rng: Random) {
        this.location = location;
        this.firstName = race.generateName(rng);
        this.familyName = race.generateName(rng);
        this.race = race;
        this.gender = rng.nextElement(Gender.array);
        this.age = race.generateAge(fame, rng);
        this.ageCategory = race.getAgeCategory(this.age);
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
        const result = this.firstName + " is " + highTraits[0][0] + ", "
            + highTraits[1][0] + ", and " + highTraits[2][0] + ". "
            + this.firstName + " is not very " + lowTraits[0][0] + " or "
            + lowTraits[1][0] + ".";
        return result;
    }

    toString(): string { return "Person: " + this.firstName; }
}