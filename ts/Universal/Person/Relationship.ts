import { PersonStub } from "./PersonStub.js";
import { Random } from "../../Util/Random.js";
import { FullPerson } from "./FullPerson";

export class Relationship {
    readonly fromPerson: FullPerson;
    readonly toPerson: PersonStub;
    readonly depth: number; // 0.0-1.0 :  0.0=stranger, 1.00=marriage
    readonly positivity: number; //0.0-1.0 :  0.0=loathing, 0.5=meh, 1.0=idol

    constructor(fromPerson: FullPerson, toPerson: PersonStub, rng: Random) {
        this.fromPerson = fromPerson;
        this.toPerson = toPerson;
    }
}