import { Race, generateNameFn } from "../../Universal/Setting/Race.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { orcSyllables, orcSyllableDistribution } from "../NameGen/OrcNameGen.js";
import { humanSyllables, humanSyllableDistribution } from "../NameGen/HumanNameGen.js";
import { Random } from "../../Util/Random.js";
import { PersonalityTraits } from "../../Universal/Person/PersonalityTraits.js";

const human: Race = {
    name: "Human",
    singleCitzenName: "Human",
    pluralCitzensName: "Humans",
    languageName: "Common",
    traits: PersonalityTraits.fromTraitData({
        adventurious: .7,
        attractive: .4,
        clever: .5,
        creative: .5,
        cultured: .6,
        empathetic: .5,
        lawful: .7,
        loyal: .6,
        knowledgable: .5,
        passionate: .6,
        stubborn: .7
    }),
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
    traits: PersonalityTraits.fromTraitData({
        adventurious: .7,
        attractive: .4,
        clever: .5,
        creative: .5,
        cultured: .6,
        empathetic: .5,
        lawful: .7,
        loyal: .6,
        knowledgable: .5,
        passionate: .6,
        stubborn: .7
    }),
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