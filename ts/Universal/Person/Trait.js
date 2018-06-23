export var Trait;
(function (Trait) {
    Trait[Trait["Adventurious"] = 0] = "Adventurious";
    Trait[Trait["Attractive"] = 1] = "Attractive";
    Trait[Trait["Bold"] = 2] = "Bold";
    Trait[Trait["Clever"] = 3] = "Clever";
    Trait[Trait["Creative"] = 4] = "Creative";
    Trait[Trait["Cultured"] = 5] = "Cultured";
    Trait[Trait["Empathetic"] = 6] = "Empathetic";
    Trait[Trait["Fame"] = 7] = "Fame";
    Trait[Trait["Passionate"] = 8] = "Passionate";
    Trait[Trait["Honorable"] = 9] = "Honorable";
    Trait[Trait["Knowledgable"] = 10] = "Knowledgable";
    Trait[Trait["Stubborn"] = 11] = "Stubborn";
    Trait[Trait["Loyal"] = 12] = "Loyal";
})(Trait || (Trait = {}));
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
        result[i] = rng.nextPercentAroundRange({ min: Math.min(template1[i], template2[i]), max: Math.max(template1[i], template2[i]) });
    return result;
}
//# sourceMappingURL=Trait.js.map