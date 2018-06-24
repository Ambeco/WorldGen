import { Zoom } from "./Zoom";
import { Random } from "../Util/Random";
import { World } from "../Layers/A_world/World";
import { Setting } from "../Universal/Setting/Setting";
import { dnd5e } from "../Data/Settings/Dnd5e";

const rng: Random = Random.fromString("1234567890");

let setting: Setting = dnd5e;

const zoom: Zoom = new Zoom();
zoom.world = new World(setting.raceCounts, rng);
