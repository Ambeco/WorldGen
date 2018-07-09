import { Continent } from "../Layers/B_continent/Continent.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { LayerDetailsAdapter } from "./DetailsAdapter.js";
import { LayerAdapter } from "./LayerAdapter.js";
import { LayerStub, LayerEnum } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { BuildingTreeAdapter } from "./BuildingAdapter.js";

export class StreetTreeAdapter extends LayerAdapter {
    constructor(listItemElement: HTMLLIElement, layerStub: LayerStub) {
        super(listItemElement, layerStub, StreetTreeAdapter.subBinder, new StreetDetailsAdapter());
    }

    static subBinder(listItemElement: HTMLLIElement, layerStub: LayerStub): BuildingTreeAdapter {
        return new BuildingTreeAdapter(listItemElement, layerStub);
    }
}

export class StreetDetailsAdapter extends LayerDetailsAdapter {
    
    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(LayerEnum[layer.layer]) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
