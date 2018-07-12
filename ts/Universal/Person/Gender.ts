
export class Gender {
    readonly name: string;
    readonly heshe: string;
    readonly hishers: string;
    readonly himher: string;
    readonly mrmrs: string;
    constructor(name: string, heshe: string, hishers: string, himher: string, mrmrs: string) {
        this.name = name;
        this.heshe = heshe;
        this.hishers = hishers;
        this.himher = himher;
        this.mrmrs = mrmrs;
    }

    static readonly Male = new Gender("Male", "he", "his", "him", "Mr.");
    static readonly Female = new Gender("Female", "she", "hers", "her", "Mrs.");
    static readonly array: Gender[] = [Gender.Male, Gender.Female];
};