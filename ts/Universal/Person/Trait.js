import { NumberRange } from "../../Util/NumberRange.js";
export var PersonalityTraits;
(function (PersonalityTraits) {
    PersonalityTraits[PersonalityTraits["Adventurious"] = 0] = "Adventurious";
    PersonalityTraits[PersonalityTraits["Attractive"] = 1] = "Attractive";
    PersonalityTraits[PersonalityTraits["Bold"] = 2] = "Bold";
    PersonalityTraits[PersonalityTraits["Clever"] = 3] = "Clever";
    PersonalityTraits[PersonalityTraits["Creative"] = 4] = "Creative";
    PersonalityTraits[PersonalityTraits["Cultured"] = 5] = "Cultured";
    PersonalityTraits[PersonalityTraits["Empathetic"] = 6] = "Empathetic";
    PersonalityTraits[PersonalityTraits["Fame"] = 7] = "Fame";
    PersonalityTraits[PersonalityTraits["Passionate"] = 8] = "Passionate";
    PersonalityTraits[PersonalityTraits["Honorable"] = 9] = "Honorable";
    PersonalityTraits[PersonalityTraits["Knowledgable"] = 10] = "Knowledgable";
    PersonalityTraits[PersonalityTraits["Stubborn"] = 11] = "Stubborn";
    PersonalityTraits[PersonalityTraits["Loyal"] = 12] = "Loyal";
})(PersonalityTraits || (PersonalityTraits = {}));
const TraitCount = 13;
export function TraitsFromNothing(rng) {
    const result = [];
    for (let i = 0; i < TraitCount; i++)
        result[i] = rng.nextPercent();
    return result;
}
export function TraitsFromTemplate(template, rng) {
    const result = [];
    for (let i = 0; i < TraitCount; i++)
        result[i] = rng.nextPercentAroundNumber(template[i]);
    return result;
}
export function TraitsFromTemplates(template1, template2, rng) {
    const result = [];
    for (let i = 0; i < TraitCount; i++)
        result[i] = rng.nextPercentAroundRange(new NumberRange(Math.min(template1[i], template2[i]), Math.max(template1[i], template2[i])));
    return result;
}
//# sourceMappingURL=Trait.js.map