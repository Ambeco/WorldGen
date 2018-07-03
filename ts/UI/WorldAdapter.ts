﻿import { World } from "../Layers/A_world/World.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { ContinentStub } from "../Layers/A_world/ContinentStub.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { DetailsAdapter } from "./DetailsAdapter.js";
import { TreeAdapter } from "./TreeAdapter.js";
import { ContinentTreeAdapter } from "./ContinentAdapter.js";
import { LayerStub } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";

export class WorldTreeAdapter extends TreeAdapter {
    readonly world: World; //world ALWAYS keeps its data

    constructor(world: World) {
        const listItemElement: HTMLDivElement = castHTMLDivElement(document.getElementById("treeRoot"));
        super(listItemElement, world, WorldTreeAdapter.subBinder, new WorldDetailsAdapter());
    }

    static subBinder(listItemElement: HTMLLIElement, layerStub: LayerStub): TreeAdapter {
        return new ContinentTreeAdapter(listItemElement, layerStub);
    }
}

export class WorldDetailsAdapter extends DetailsAdapter {

    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(layer.layerName) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
