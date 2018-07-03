import { Random } from "../Util/Random.js";
import { World } from "../Layers/A_world/World.js";
import { Setting } from "../Universal/Setting/Setting.js";
import { dnd5e } from "../Data/Settings/Dnd5e.js";
import { Zoom } from "../Universal/Zoom.js";
import { WorldTreeAdapter } from "./WorldAdapter.js";
import { castHTMLSpanElement, castHTMLElement } from "../Util/HtmlCasts.js";
import { TreeAdapter } from "./TreeAdapter.js";

const rng: Random = Random.fromString("1234567890");

let setting: Setting = dnd5e;

const zoom: Zoom = new Zoom();
zoom.world = new World(setting, rng);

const worldTreeAdapter: WorldTreeAdapter = new WorldTreeAdapter(zoom.world);
worldTreeAdapter.expand(zoom.world);
worldTreeAdapter.onNameClick();

