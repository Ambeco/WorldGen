import { Continent } from "../Layers/B_continent/Continent.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { LayerDetailsAdapter } from "./DetailsAdapter.js";
import { LayerAdapter } from "./LayerAdapter.js";
import { LayerStub, LayerEnum } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { NeighborhoodTreeAdapter } from "./NeighborhoodAdapter.js";

export class CityTreeAdapter extends LayerAdapter {
    constructor(listItemElement: HTMLLIElement, layerStub: LayerStub) {
        super(listItemElement, layerStub, CityTreeAdapter.subBinder, new CityDetailsAdapter());
    }

    static subBinder(listItemElement: HTMLLIElement, layerStub: LayerStub): LayerAdapter {
        return new NeighborhoodTreeAdapter(listItemElement, layerStub);
    }
}

export class CityDetailsAdapter extends LayerDetailsAdapter {
    
    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(LayerEnum[layer.layer]) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
