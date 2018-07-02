import { Random } from "../../Util/Random.js";
import { logBase } from "../../Util/Distribution.js";


/**
* fame is number between 0-100 (~0.8745^x)
* 1:1.14 have a fame of 0 (12.5%)
* 1:3.82 have a fame of 10+ (residence) (26.1%)
* 1:14.6 have a fame of 20+ (street) (6.84%)
* 1:55.8 have a fame of 30+ (1.79%)
* 1:213 have a fame of 40+ (neighborhood) (0.47%)
* 1:816 have a fame of 50+ (0.12%)
* 1:3121 have a fame of 60+ (city) (0.03%)
* 1:11934 have a fame of 70+
* 1:45626 have a fame of 80+ (country)
* 1:174428 have a fame of 90+ (continent)
* 1:666835 have a fame of 100 (world)
**/

export function generateFameForWorldHero(population: number, rng: Random): number {
    const raw: number = 100 - logBase(rng.nextNumber(0, population / 666835), 0.8745);
    if (raw < 0) return 0;
    if (raw > 100) return 100;
    return raw;
}

// TODO THESE ARE GENERATING REALLY POOR VALUES
export function generateFameForNeighborhoodHero(population: number, rng: Random): number {
    const raw: number = 100 - logBase(rng.nextNumber(0, population / 213), 0.8745);
    if (raw < 0) return 0;
    if (raw > 100) return 100;
    return raw;
}

const testRng: Random = Random.fromString("test");
const worldTests: number[] = [
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
    generateFameForWorldHero(2000000, testRng),
];
const neighborhoodTests: number[] = [
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
    generateFameForNeighborhoodHero(213 * 15, testRng),
];