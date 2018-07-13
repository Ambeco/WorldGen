import { Random } from "../../Util/Random.js";
import { toTitleCase } from "../../Util/casing.js";
import { PersonalityTraits } from "../Person/PersonalityTraits.js";
import { AgeCategory } from "../Person/PersonStub.js";
import { LayerEnum } from "../../Layers/LayerStub.js";

export interface AgeMaximums {
    baby: number;
    toddler: number;
    child: number;
    teenager: number;
    youngAdult: number;
    adult: number;
    middleAge: number;
    senior: number;
    elder: number;
};

export interface Race {
    readonly name: string; //This is 'America'
    readonly singleCitzenName: string; //I am an 'American'
    readonly pluralCitzensName: string; //We are 'Americans'
    readonly languageName: string; //We speak 'English'
    readonly traits: PersonalityTraits; //0-100, one for each OpinionCategory
    readonly nationalism: number; //0.0-1.0, How likely to group togeather
    readonly ageCategoryMaximums: AgeMaximums;

    generateName(rng: Random): string; //My name is 'Steve'
    generateAge(fame: LayerEnum, rng: Random): number; 
    getAgeCategory(age: number): AgeCategory;
    toString(): string; // America
}
export function generateNameFn(syllables: String[], syllableDistribution: number[], rng: Random): string {
    const length = rng.nextWeightedIndex(syllableDistribution);
    let result = ""
    for (let i = 0; i < length; i++)
        result += rng.nextElement(syllables);
    return toTitleCase(result);
} 

export function generateAgeFn(elderAge: number, fame: LayerEnum, rng: Random): number {
    const deathRate = 1.5 / elderAge;
    const rawAge = rng.nextGeometric(deathRate);
    return rawAge % elderAge;
}

export function getAgeCategoryFn(age: number, ageCategoryMaximums: AgeMaximums): AgeCategory {
    if (age <= ageCategoryMaximums.baby) return AgeCategory.Baby;
    if (age <= ageCategoryMaximums.toddler) return AgeCategory.Toddler;
    if (age <= ageCategoryMaximums.child) return AgeCategory.Child;
    if (age <= ageCategoryMaximums.teenager) return AgeCategory.Teenager;
    if (age <= ageCategoryMaximums.youngAdult) return AgeCategory.YoungAdult;
    if (age <= ageCategoryMaximums.adult) return AgeCategory.Adult;
    if (age <= ageCategoryMaximums.middleAge) return AgeCategory.MiddleAge;
    if (age <= ageCategoryMaximums.senior) return AgeCategory.Senior;
    return AgeCategory.Elder;
}