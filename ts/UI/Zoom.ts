import { World_Continent } from "../../Layers/A_world/World_Continent";

export class Zoom {
    public readonly minLocation: number; //inclusive
    public readonly maxLocation: number; //exclusive;
    public readonly continent: World_Continent | null;
}