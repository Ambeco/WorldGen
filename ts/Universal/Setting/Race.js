export function generateNameFn(syllables, syllableDistribution, rng) {
    const length = rng.nextWeightedIndex(syllableDistribution);
    let result = "";
    for (let i = 0; i < length; i++)
        result += rng.nextElement(syllables);
    return result;
}
//# sourceMappingURL=Race.js.map