import { Race, generateNameFn } from "../../Universal/Setting/Race.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { orcSyllables, orcSyllableDistribution } from "../NameGen/OrcNameGen.js";
import { Random } from "../../Util/Random.js";

const dragonBorn: Race = {
    name: "Dragonborn",
    singleCitzenName: "Dragonborn",
    pluralCitzensName: "Dragonborn",
    languageName: "Common",
    traits: [
        800,
        400,
        900,
        500,
        500,
        700,
        400,
        800,
        800,
        900,
        600,
        800,
        500,
    ],
    nationalism: 0.1,
    generateName: function (rng: Random) {
        return generateNameFn(orcSyllables, orcSyllableDistribution, rng)
    }
};

const dnd5eraces: Race[] = [
    dragonBorn,
];

const basePopulationMap: Map<Race, number> = new Map<Race, number>([
    [dragonBorn, 1000000],
]);

export const dnd5e: Setting = {
    name: "Dnd 5e",
    races: dnd5eraces,
    raceCounts: basePopulationMap,
}