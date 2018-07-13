import { Race, generateNameFn, generateAgeFn, getAgeCategoryFn } from "../../Universal/Setting/Race.js";
import { Setting } from "../../Universal/Setting/Setting.js";
import { orcSyllables, orcSyllableDistribution } from "../NameGen/OrcNameGen.js";
import { humanSyllables, humanSyllableDistribution } from "../NameGen/HumanNameGen.js";
import { Random } from "../../Util/Random.js";
import { PersonalityTraits } from "../../Universal/Person/PersonalityTraits.js";
import { AgeCategory } from "../../Universal/Person/PersonStub.js";
import { LayerEnum } from "../../Layers/LayerStub.js";


const dragonborn: Race = {
    name: "Dragonborn",
    singleCitzenName: "Dragonborn",
    pluralCitzensName: "Dragonborn",
    languageName: "Draconic",
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
    generateName: function (rng: Random) { return generateNameFn(orcSyllables, orcSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Dragonborn"; },
};

const dwarf: Race = {
    name: "Dwarf",
    singleCitzenName: "Dwarf",
    pluralCitzensName: "Dwarves",
    languageName: "Dwarven",
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
    generateName: function (rng: Random) { return generateNameFn(orcSyllables, orcSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Dwarf"; },
};

const elf: Race = {
    name: "Elf",
    singleCitzenName: "Elf",
    pluralCitzensName: "Elves",
    languageName: "Elvish",
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
    generateName: function (rng: Random) { return generateNameFn(humanSyllables, humanSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Elf"; },
};

const gnome: Race = {
    name: "Gnome",
    singleCitzenName: "Gnome",
    pluralCitzensName: "Gnomes",
    languageName: "Gnomish",
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
    generateName: function (rng: Random) { return generateNameFn(humanSyllables, humanSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Gnome"; },
};

const halfElf: Race = {
    name: "Half-Elf",
    singleCitzenName: "Half-Elf",
    pluralCitzensName: "Half-Elves",
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
    generateName: function (rng: Random) { return generateNameFn(humanSyllables, humanSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Half-Elf"; },
};

const halfOrc: Race = {
    name: "Half-Orc",
    singleCitzenName: "Half-Orc",
    pluralCitzensName: "Half-Orcs",
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
    generateName: function (rng: Random) { return generateNameFn(orcSyllables, orcSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Half-Orc"; },
};

const halfling: Race = {
    name: "Halfling",
    singleCitzenName: "Halfling",
    pluralCitzensName: "Halflings",
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
    generateName: function (rng: Random) { return generateNameFn(humanSyllables, humanSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Halfling"; },
};

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
    generateName: function (rng: Random) { return generateNameFn(humanSyllables, humanSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Human"; },
};

const tiefling: Race = {
    name: "Tiefling",
    singleCitzenName: "Tiefling",
    pluralCitzensName: "Tiefling",
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
    generateName: function (rng: Random) { return generateNameFn(orcSyllables, orcSyllableDistribution, rng); },
    ageCategoryMaximums: { baby: 1, toddler: 4, child: 12, teenager: 17, youngAdult: 24, adult: 39, middleAge: 59, senior: 79, elder: 105 },
    generateAge: function (fame: LayerEnum, rng: Random) { return generateAgeFn(105, fame, rng); },
    getAgeCategory: function (age: number) { return getAgeCategoryFn(age, this.ageCategoryMaximums); },
    toString(): string { return "Tiefling"; },
};

const dnd5eraces: Race[] = [
    dragonborn,
    dwarf,
    elf,
    gnome,
    halfElf,
    halfOrc,
    halfling,
    human,
    tiefling,
];

const basePopulationMap: Map<Race, number> = new Map<Race, number>([
    [dwarf, .13],
    [elf, .13],
    [gnome, .03],
    [halfElf, .06],
    [halfOrc, .03],
    [halfling, .06],
    [human, .50],
    [tiefling, .06],
]);

export const dnd5e: Setting = new Setting("Dnd 5e", dnd5eraces, basePopulationMap);