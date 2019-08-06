import { Coordinate } from "../../Universal/Coordinate.js";

//https://www.factmonster.com/dk/encyclopedia/earth/climate-zones
export enum TerrainEnum {
    //Land (roughly dry to wet)
    Polar,
    Desert,
    Mountain,
    Tundra,
    DryGrassland,
    Fields,
    BorealForest,
    Brush,
    Mediterranean,
    TemperateForest,
    TropicalGrassland,
    Rainforest,
    Swamp,
    Lake,
    //Sea
    ShallowOcean,//Continental Shelf
    OceanSlope, //continental slope
    DeepOcean, //Ocean Basin
    OceanRange, //Islands
    OceanTrench,
}

export interface GeographyTile {
    readonly coordinate: Coordinate;
    readonly terrain: TerrainEnum;
    readonly range: Range;
}