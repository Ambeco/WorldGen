import { Random } from "../Util/Random.js";
import { World } from "../Layers/A_world/World.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { dnd5e } from "../Data/Settings/Dnd5e.js";
import { Zoom } from "../Universal/Zoom.js";
import { bindWorldToTree, bindWorldToDetails } from "./WorldAdapter.js";

const rng: Random = Random.fromString("1234567890");

let setting: Setting = dnd5e;

const zoom: Zoom = new Zoom();
zoom.world = new World(setting, rng);

bindWorldToTree(zoom.world);
bindWorldToDetails(zoom.world);
