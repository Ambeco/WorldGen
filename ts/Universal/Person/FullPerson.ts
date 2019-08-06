import { Relationship } from "./Relationship.js";
import { Random, RandomState } from "../../Util/Random.js";
import { PersonStub } from "./PersonStub";


export class FullPerson {
    readonly stub: PersonStub;
    readonly randomState: RandomState;

    constructor(stub: PersonStub, rng: Random) {
        this.stub = stub;
        this.randomState = rng.getState();
    }

    public getDescription(): string {
        return this.stub.getDescription();
    }

    public getPersonality(): string {
        return this.stub.getPersonality();
    }

    toString(): string { return this.stub.toString(); }
}