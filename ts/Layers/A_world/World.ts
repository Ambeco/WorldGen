import { ContinentStub } from "./ContinentStub.js";
import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { LAYER_RACE_RERANDOM_STDDEV_RATIO, LAYER_SIZE_RERANDOM_STDDEV_RATIO } from "../../Universal/Configuration.js";
import { generateFameForWorldHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";

export class World extends LayerBase<ContinentStub> {
    get layerName() { return "World"; }

    constructor(setting: Setting, rng: Random) {
        const discardableResizer = rng.randomizeAndSplitRange(new NumberRange(0, setting.approxWorldSize), setting.approxContinentCount, LAYER_SIZE_RERANDOM_STDDEV_RATIO);
        const location = new NumberRange(0, discardableResizer[setting.approxContinentCount - 1].max);
        const raceCounts = rng.rerandomMapValues(setting.raceCounts, LAYER_RACE_RERANDOM_STDDEV_RATIO);
        super(setting, location, raceCounts, setting.approxContinentCount, rng);
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): ContinentStub {
        return new ContinentStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForWorldHero(this.population, rng);
    }
}