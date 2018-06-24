import { Random } from "../../Util/Random";

export interface Race {
    readonly name: string; //This is 'America'
    readonly singleCitzenName: string; //I am an 'American'
    readonly pluralCitzensName: string; //We are 'Americans'
    readonly languageName: string; //We speak 'English'
    readonly traits: number[]; //0-100, one for each OpinionCategory
    readonly nationalism: number; //0.0-1.0, How likely to group togeather
    generateName(rng: Random): string; //My name is 'Steve'
}
export function generateNameFn(syllables: String[], syllableDistribution: number[], rng: Random): string {
    const length = rng.nextWeightedIndex(syllableDistribution);
    let result = ""
    for (let i = 0; i < length; i++)
        result += rng.nextElement(syllables);
    return result;
} 