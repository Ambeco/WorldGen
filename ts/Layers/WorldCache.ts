import { World } from "./A_world/World.js";
import { ContinentDetails } from "./B_continent/ContinentDetails.js";
import { Coordinate } from "../Universal/Coordinate.js";
import { ContinentBasics, generateContinentBasics } from "./B_continent/ContinentBasics.js";
import { ContinentHeader } from "./B_continent/ContinentHeaders.js";


interface hasCoordinate {
    readonly coordinate: Coordinate;
}

export class WorldCache {
    private readonly world: World;
    private readonly continentBasics: Array<ContinentBasics>; //LRU size 9
    private readonly continentDetails: Array<ContinentDetails>; //LRU size 4

    constructor(world: World) {
        this.world = world;
        this.continentBasics = new Array<ContinentBasics>();
    }

    public getContinentHeaders(approxCoordinate: Coordinate): ContinentHeader {
        const truncCoordinate = this.world.normalizeContinentCoordinate(approxCoordinate);
        return this.world.generateContinentHeader(truncCoordinate);
    }

    private readFromCache<T extends hasCoordinate>(truncCoordinate: Coordinate, lru: Array<T>): T | undefined {
        for (let idx = 0; idx < lru.length; idx++) {
            const continent = lru[idx];
            if (continent.coordinate.x == truncCoordinate.x && continent.coordinate.y == truncCoordinate.y) {
                if (idx != 0) {
                    lru.splice(idx, 1);
                    lru.unshift(continent);
                }
                return continent;
            }
        }
    }

    private putInCache<T extends hasCoordinate>(item: T, lru: Array<T>): T {
        lru.unshift(item);
        if (lru.length > 9) {
            lru.splice(9, lru.length - 9);
        }
        return item;
    }

    public getContinentBasics(approxCoordinate: Coordinate): ContinentBasics {
        const truncCoordinate = this.world.normalizeContinentCoordinate(approxCoordinate);
        let continent = this.readFromCache(truncCoordinate, this.continentBasics);
        if (continent != undefined) {
            return continent;
        }
        continent = generateContinentBasics(this.getContinentHeaders(truncCoordinate), this);
        return this.putInCache(continent, this.continentBasics);
    }

    public getContinentDetails(approxCoordinate: Coordinate): ContinentDetails {
        const truncCoordinate = this.world.normalizeContinentCoordinate(approxCoordinate);
        let continent = this.readFromCache(truncCoordinate, this.continentDetails);
        if (continent != undefined) {
            return continent;
        }
        continent = new ContinentDetails(this.getContinentBasics(truncCoordinate), this);
        return this.putInCache(continent, this.continentDetails);
    }
}