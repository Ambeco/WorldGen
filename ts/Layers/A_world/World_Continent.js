import { getBiggestValue } from "../../Util/Distribution.js";
export class World_Continent {
    constructor(location, raceCounts, rng) {
        const primaryRace = getBiggestValue(raceCounts);
        this.name = primaryRace[0].generateName(rng);
        this.location = location;
        this.people = [];
        this.randomState = rng.getState();
    }
}
//# sourceMappingURL=World_Continent.js.map