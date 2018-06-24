import { Random } from "../../Util/Random.js";
import { NumberRange } from "../../Util/NumberRange.js";

// on a scale of 1 to 1000
export enum PersonalityTraits {
    Adventurious,
    Attractive,
    Bold,
    Clever,
    Creative,
    Cultured,
    Empathetic,
    Fame,
    Passionate, // Good and Bad
    Honorable, // to objective rules/law
    Knowledgable,
    Stubborn,
    Loyal, // to friends people
}
const TraitCount: number = 13;

export function TraitsFromNothing(rng: Random): number[] {
    const result: number[] = [];
    for (let i = 0; i < TraitCount; i++) 
        result[i] = rng.nextPercent();
    return result;
}

export function TraitsFromTemplate(template: PersonalityTraits[], rng: Random): number[] {
    const result: number[] = [];
    for (let i = 0; i < TraitCount; i++)
        result[i] = rng.nextPercentAroundNumber(template[i]);
    return result;
}

export function TraitsFromTemplates(template1: PersonalityTraits[], template2: PersonalityTraits[], rng: Random): number[] {
    const result: number[] = [];
    for (let i = 0; i < TraitCount; i++)
        result[i] = rng.nextPercentAroundRange(new NumberRange(Math.min(template1[i], template2[i]),Math.max(template1[i], template2[i])));
    return result;
}