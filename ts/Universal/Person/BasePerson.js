import { TraitsFromNothing } from "./Trait.js";
export class BasePerson {
    constructor(location, race, rng) {
        this.location = location;
        this.firstName = race.generateName(rng);
        this.familyName = race.generateName(rng);
        this.race = race;
        this.traits = TraitsFromNothing(rng);
    }
}
//# sourceMappingURL=BasePerson.js.map