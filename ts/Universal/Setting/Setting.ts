import { Race } from "./Race.js";
import { nonNaN } from "../../nonNull.js";

export abstract class Setting {
    public readonly name: string;
    public readonly races: Race[];
    public readonly raceCounts: Map<Race, number>;
}