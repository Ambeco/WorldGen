import { Race } from "./Race.js";

export abstract class Setting {
    public readonly name: string;
    public readonly races: Race[];
    public readonly raceCounts: Map<Race, number>;
}