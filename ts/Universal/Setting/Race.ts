import { Random } from "../../Util/Random";

export interface Race {
    readonly name: string; //This is 'America'
    readonly singleCitzenName: string; //I am an 'American'
    readonly pluralCitzenName: string; //We are 'Americans'
    readonly languageName: string; //We speak 'English'
    readonly location: number; //0.0-1.0 
    readonly traits: number[]; //0-100, one for each OpinionCategory
    readonly nationalism: number; //0.0-1.0, How likely to group togeather
    generateName(random: Random): string; //My name is 'Steve'
}