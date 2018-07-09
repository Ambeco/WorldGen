import { ContinentStub } from "./ContinentStub.js";
import { Random } from "../../Util/Random.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { Race } from "../../Universal/Setting/Race.js";
import { NumberRange } from "../../Util/NumberRange.js";
import { LAYER_RACE_RERANDOM_STDDEV_RATIO, LAYER_SIZE_RERANDOM_STDDEV_RATIO } from "../../Universal/Configuration.js";
import { generateFameForWorldHero } from "../../Universal/Person/fameGen.js";
import { LayerBase } from "../LayerBase.js";
import { LayerStub } from "../LayerStub.js";
import { getBiggestValue, sumValues } from "../../Util/Distribution.js";
import { Layer } from "../Layer.js";

export class World extends LayerBase<ContinentStub> {
    get layerName() { return "World"; }

    constructor(setting: Setting, rng: Random) {
        super(World.generateWorldStub(setting, rng), setting.approxContinentPopulation, rng);
    }

    private static generateWorldStub(setting: Setting, rng: Random): LayerStub {
        const primaryRace: [Race, number] = getBiggestValue(setting.raceCounts);
        const discardableResizer = rng.randomizeAndSplitRange(new NumberRange(0, setting.approxWorldSize), setting.approxContinentCount, LAYER_SIZE_RERANDOM_STDDEV_RATIO);
        const counts = rng.rerandomMapValues(setting.raceCounts, setting.approxWorldPopulation, LAYER_RACE_RERANDOM_STDDEV_RATIO);
        const result: LayerStub = {
            layerName: "World",
            name: primaryRace[0].generateName(rng),
            randomState: rng.getState(),
            setting: setting,
            location: new NumberRange(0, discardableResizer[setting.approxContinentCount - 1].max),
            population: sumValues(counts),
            raceCounts: counts,
            people: [],
            generateFullData(): Layer { throw new Error("Stub"); }
        };
        return result;
    }

    protected generateSubLayerStub(locationDistribution: NumberRange, raceDistributions: Map<Race, number>, rng: Random): ContinentStub {
        return new ContinentStub(this.setting, locationDistribution, raceDistributions, rng);
    }

    protected generateFameForHero(rng: Random): number {
        return generateFameForWorldHero(this.population, rng);
    }
}