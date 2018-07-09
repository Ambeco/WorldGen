import { Continent } from "../Layers/B_continent/Continent.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { LayerDetailsAdapter } from "./DetailsAdapter.js";
import { LayerAdapter } from "./LayerAdapter.js";
import { LayerStub, LayerEnum } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { StreetTreeAdapter } from "./StreetAdapter.js";

export class NeighborhoodTreeAdapter extends LayerAdapter {
    constructor(listItemElement: HTMLLIElement, layerStub: LayerStub) {
        super(listItemElement, layerStub, NeighborhoodTreeAdapter.subBinder, new NeighborhoodDetailsAdapter());
    }

    static subBinder(listItemElement: HTMLLIElement, layerStub: LayerStub): LayerAdapter {
        return new StreetTreeAdapter(listItemElement, layerStub);
    }
}

export class NeighborhoodDetailsAdapter extends LayerDetailsAdapter {
    
    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(LayerEnum[layer.layer]) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
