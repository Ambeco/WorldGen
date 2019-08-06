
export class Gender {
    constructor(
        readonly name: string,
        readonly heshe: string,
        readonly hishers: string,
        readonly himher: string,
        readonly mrmrs: string)
    { }

    static readonly Male = new Gender("Male", "he", "his", "him", "Mr.");
    static readonly Female = new Gender("Female", "she", "hers", "her", "Mrs.");
    static readonly array: Gender[] = [Gender.Male, Gender.Female];
};