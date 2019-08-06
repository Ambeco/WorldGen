import { Race } from "./Race.js";
import { FullPerson } from "../Person/FullPerson";

export interface RuleSet {
    readonly name: string;

    generate1SentenceSummary(person: FullPerson): string;

    generateSidebar(person: FullPerson): HTMLElement;
    generateStatblock(person: FullPerson): HTMLElement;
    generateCharacterSheet(person: FullPerson): HTMLElement;
}