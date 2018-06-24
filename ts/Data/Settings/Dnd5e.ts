import { Race, generateNameFn } from "../../Universal/Setting/Race.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { orcSyllables, orcSyllableDistribution } from "../NameGen/OrcNameGen.js";
import { humanSyllables, humanSyllableDistribution } from "../NameGen/HumanNameGen.js";
import { Random } from "../../Util/Random.js";

const human: Race = {
    name: "Human",
    singleCitzenName: "Human",
    pluralCitzensName: "Humans",
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
        return generateNameFn(humanSyllables, humanSyllableDistribution, rng)
    }
};

const orc: Race = {
    name: "Orc",
    singleCitzenName: "Orc",
    pluralCitzensName: "Orcs",
    languageName: "Orcish",
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
    human,
    orc,
];

//default setting values are for world population of 1969000000, so try to be near that number
const basePopulationMap: Map<Race, number> = new Map<Race, number>([
    [human, 1476750000],
    [orc, 492250000],
]);

export const dnd5e: Setting = new Setting("Dnd 5e", dnd5eraces, basePopulationMap);