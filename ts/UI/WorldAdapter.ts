import { World } from "../Layers/A_world/World.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { ContinentStub } from "../Layers/A_world/ContinentStub.js";
import { PersonStub } from "../Universal/Person/PersonStub.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { LayerDetailsAdapter } from "./DetailsAdapter.js";
import { ContinentTreeAdapter } from "./ContinentAdapter.js";
import { LayerStub, LayerEnum } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { LayerAdapter } from "./LayerAdapter.js";

export class WorldTreeAdapter extends LayerAdapter {
    readonly world: World; //world ALWAYS keeps its data

    constructor(world: World) {
        const listItemElement: HTMLDivElement = castHTMLDivElement(document.getElementById("treeRoot"));
        super(listItemElement, world, WorldTreeAdapter.subBinder, new WorldDetailsAdapter());
    }

    static subBinder(listItemElement: HTMLLIElement, layerStub: LayerStub): LayerAdapter {
        return new ContinentTreeAdapter(listItemElement, layerStub);
    }
}

export class WorldDetailsAdapter extends LayerDetailsAdapter {

    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(LayerEnum[layer.layer]) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
