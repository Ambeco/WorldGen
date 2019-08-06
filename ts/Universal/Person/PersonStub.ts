import { Random } from "../../Util/Random.js";
import { Race, FameLevelEnum } from "../Setting/Race.js";
import { PersonalityTraits } from "./PersonalityTraits.js";
import { JobCategory } from "../Setting/Job.js";
import { Gender } from "./Gender.js";
import { Setting } from "../Setting/Setting";

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
    readonly setting: Setting; //0.0-1.0 
    readonly location: number; //0.0-1.0 
    readonly firstName: string;
    readonly familyName: string;
    readonly race: Race;
    readonly gender: Gender;
    readonly age: number;
    readonly ageCategory: AgeCategory;
    readonly jobName: string;
    readonly jobCategory: JobCategory;
    readonly fame: FameLevelEnum;
    readonly traits: PersonalityTraits;

    constructor(setting: Setting, location: number, race: Race, fame: FameLevelEnum, rng: Random) {
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