import { PersonStub } from "./PersonStub.js";
import { Random } from "../../Util/Random.js";

export class Relationship {
    public readonly fromPerson: PersonStub;
    public readonly toPerson: PersonStub;
    public readonly depth: number;
    public readonly traits: number[]; //0-10, one for each OpinionCategory

    constructor(fromPerson: PersonStub, toPerson: PersonStub, rng: Random) {
        this.fromPerson = fromPerson;
        this.toPerson = toPerson;
    }
}