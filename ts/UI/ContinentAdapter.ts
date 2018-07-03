import { Continent } from "../Layers/B_continent/Continent.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { DetailsAdapter } from "./DetailsAdapter.js";
import { TreeAdapter } from "./TreeAdapter.js";
import { LayerStub } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";

export class ContinentTreeAdapter extends TreeAdapter {
    constructor(listItemElement: HTMLLIElement, layerStub: LayerStub) {
        super(listItemElement, layerStub, ContinentTreeAdapter.subBinder, new ContinentDetailsAdapter());
    }

    static subBinder(listItemElement: HTMLLIElement, layerStub: LayerStub): TreeAdapter {
        //TODO return new CountryAdapter(listItemElement, layerStub);
        return new ContinentTreeAdapter(listItemElement, layerStub);
    }
}

export class ContinentDetailsAdapter extends DetailsAdapter {
    
    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(layer.layerName) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
