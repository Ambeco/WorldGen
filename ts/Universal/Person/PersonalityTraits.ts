import { Random } from "../../Util/Random.js";
import { NumberRange } from "../../Util/NumberRange.js";

// on a scale of 0.0 to 1.0
//TODO: Switch to MixxBryers. It's dumb, but simple.
export interface TraitData {
    readonly adventurious: number;
    readonly attractive: number;
    readonly clever: number;
    readonly creative: number;
    readonly cultured: number;
    readonly empathetic: number;
    readonly lawful: number;
    readonly loyal: number;
    readonly knowledgable: number;
    readonly passionate: number;
    readonly stubborn: number;
}

export class PersonalityTraits implements TraitData {
    readonly adventurious: number;
    readonly attractive: number;
    readonly clever: number;
    readonly creative: number;
    readonly cultured: number;
    readonly empathetic: number;
    readonly lawful: number;
    readonly loyal: number;
    readonly knowledgable: number;
    readonly passionate: number;
    readonly stubborn: number;

    constructor(adventurious: number, attractive: number, clever: number,
        creative: number, cultured: number, empathetic: number,
        lawful: number, loyal: number, knowledgable: number,
        passionate: number, stubborn: number) {
        this.adventurious = adventurious
        this.attractive = attractive;
        this.clever = clever;
        this.creative = creative;
        this.cultured = cultured;
        this.empathetic = empathetic;
        this.lawful = lawful;
        this.loyal = loyal;
        this.knowledgable = knowledgable;
        this.passionate = passionate;
        this.stubborn = stubborn;
    }

    static fromTraitData(data: TraitData): PersonalityTraits {
        return new PersonalityTraits(data.adventurious, data.attractive,
            data.clever, data.creative, data.cultured,
            data.empathetic, data.lawful, data.loyal,
            data.knowledgable, data.passionate, data.stubborn);
    }

    static fromRandom(rng: Random): PersonalityTraits {
        return new PersonalityTraits(rng.nextPercent(), rng.nextPercent(),
            rng.nextPercent(), rng.nextPercent(), rng.nextPercent(),
            rng.nextPercent(), rng.nextPercent(), rng.nextPercent(),
            rng.nextPercent(), rng.nextPercent(), rng.nextPercent());
    }

    static fromTemplate(template: PersonalityTraits, weight: number, rng: Random): PersonalityTraits {
        return new PersonalityTraits(merge(template.adventurious, weight, rng),
            merge(template.attractive, weight, rng),
            merge(template.clever, weight, rng),
            merge(template.creative, weight, rng),
            merge(template.cultured, weight, rng),
            merge(template.empathetic, weight, rng),
            merge(template.lawful, weight, rng),
            merge(template.loyal, weight, rng),
            merge(template.knowledgable, weight, rng),
            merge(template.passionate, weight, rng),
            merge(template.stubborn, weight, rng));
    }

    getElements(): [string, number][] {
        return [
            ["Attractive", this.attractive],
            ["Clever", this.clever],
            ["Creative", this.creative],
            ["Cultured", this.cultured],
            ["Empathetic", this.empathetic],
            ["Lawful", this.lawful],
            ["Loyal", this.loyal],
            ["Knowledgable", this.knowledgable],
            ["Passionate", this.passionate],
            ["Stubborn", this.stubborn],
        ];
    }

    getHighTraits(count: number): [string, number][] {
        const data = this.getElements();
        data.sort((a, b) => b[1] - a[1]);
        return data.splice(0, count);
    }

    getLowTraits(count: number): [string, number][] {
        const data = this.getElements();
        data.sort((a, b) => a[1] - b[1]);
        return data.splice(0, count);
    }
}

function merge(oldValue: number, weight: number, rng: Random): number {
    if (weight <= 0) { return rng.nextPercent(); }
    if (weight >= 1) { return oldValue; }
    const newValue = rng.nextPercent();
    return oldValue * weight + newValue * (1 - weight);
}