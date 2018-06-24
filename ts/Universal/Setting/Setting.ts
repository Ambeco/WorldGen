import { Race } from "./Race";
import { nonNaN } from "../../nonNull";

export abstract class Setting {
    public readonly name: string;
    public readonly races: Race[];
    public readonly raceCounts: Map<Race, number>;
}