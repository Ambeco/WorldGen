export function toCamelCase(str: string) {
    const firstPass = str.toLowerCase().replace(/\s([_A-Za-z])/g, function (match:string, letter:string) {
        return letter.toUpperCase();
    });
    const secondPass = firstPass.replace(/[^_a-zA-Z]/g, function (match: string) {
        return "_";
    });
    return secondPass;
}

export function toTitleCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}