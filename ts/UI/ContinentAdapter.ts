import { Continent } from "../Layers/B_continent/Continent.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { LayerDetailsAdapter } from "./DetailsAdapter.js";
import { LayerAdapter } from "./LayerAdapter.js";
import { LayerStub, LayerEnum } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { CountryTreeAdapter } from "./CountryAdapter.js";

export class ContinentTreeAdapter extends LayerAdapter {
    constructor(listItemElement: HTMLLIElement, layerStub: LayerStub) {
        super(listItemElement, layerStub, ContinentTreeAdapter.subBinder, new ContinentDetailsAdapter());
    }

    static subBinder(listItemElement: HTMLLIElement, layerStub: LayerStub): LayerAdapter {
        return new CountryTreeAdapter(listItemElement, layerStub);
    }
}

export class ContinentDetailsAdapter extends LayerDetailsAdapter {
    
    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(LayerEnum[layer.layer]) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
