import { TraitsFromNothing, PersonalityTraits } from "./PersonalityTraits.js";
import { JobCategory } from "../Setting/Job.js";
import { getBiggestNIndexes, getSmallestNIndexes } from "../../Util/Distribution.js";
export class BasePerson {
    constructor(location, race, rng) {
        this.location = location;
        this.firstName = race.generateName(rng);
        this.familyName = race.generateName(rng);
        this.race = race;
        this.traits = TraitsFromNothing(rng);
        this.jobName = "Warrior";
        this.jobCategory = JobCategory.AdventurerMartial;
    }
    getDescription() {
        return this.firstName + " is tall, strong, and red.";
    }
    getPersonality() {
        const highTraits = getBiggestNIndexes(this.traits, 3);
        const lowTraits = getSmallestNIndexes(this.traits, 2);
        const test = "" + PersonalityTraits[highTraits[0]];
        const result = this.familyName + " is " + PersonalityTraits[highTraits[0]] + ", "
            + PersonalityTraits[highTraits[1]] + ", and " + PersonalityTraits[highTraits[2]] + ". "
            + this.familyName + " is not very " + PersonalityTraits[lowTraits[0]] + " or "
            + PersonalityTraits[lowTraits[1]] + ".";
        return result;
    }
}
//# sourceMappingURL=BasePerson.js.map