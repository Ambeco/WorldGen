import { BasePerson } from "./BasePerson.js";
import { Random } from "../../Util/Random.js";

export class Relationship {
    public readonly fromPerson: BasePerson;
    public readonly toPerson: BasePerson;
    public readonly depth: number;
    public readonly traits: number[]; //0-10, one for each OpinionCategory

    constructor(fromPerson: BasePerson, toPerson: BasePerson, rng: Random) {
        this.fromPerson = fromPerson;
        this.toPerson = toPerson;
    }
}