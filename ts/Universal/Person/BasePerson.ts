import { Relationship } from "./Relationship";
import { Random } from "../../Util/Random";
import { Race } from "../Setting/Race";
import { TraitsFromNothing } from "./Trait";

export class BasePerson {
    public readonly location: number; //0.0-1.0 
    public readonly firstName: string;
    public readonly familyName: string;
    public readonly race: Race;
    readonly traits: number[]; //0-100, one for each OpinionCategory

    constructor(location: number, race: Race, rng: Random) {
        this.location = location;
        this.firstName = race.generateName(rng);
        this.familyName = race.generateName(rng);
        this.race = race;
        this.traits = TraitsFromNothing(rng);
    }
}