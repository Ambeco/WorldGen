import { createHTMLElement } from "../Util/HtmlCasts.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { Layer } from "../Layers/Layer.js";
import { LayerStub } from "../Layers/LayerStub.js";
import { DetailsAdapter } from "./DetailsAdapter.js";
import { SubLayerBinder, TreeAdapter } from "./TreeAdapter.js";

export abstract class LayerAdapter extends TreeAdapter<LayerStub, Layer> {
    readonly detailsAdapter: DetailsAdapter;
    readonly subLayerBinder: SubLayerBinder<LayerStub, Layer>;

    constructor(listItemElement: HTMLLIElement | HTMLDivElement, layerStub: LayerStub, subLayerBinder: SubLayerBinder<LayerStub, Layer>, detailsAdapter: DetailsAdapter) {
        super(listItemElement, layerStub, layerStub.population > 0);
        this.detailsAdapter = detailsAdapter;
        this.subLayerBinder = subLayerBinder;
        this.name.innerText = toTitleCase(layerStub.layerName) + ": " + layerStub.name;
    }

    expand(parent: Layer): void {
        if (parent != this.expandedWithData) {
            this.subList.innerText = "";
            for (let child of parent.genericSubLayers) {
                const layerItem = this.appendChildRow(toCamelCase(child.layerName), child.population > 0);
                this.subLayerBinder(layerItem, child);
            }
            super.expand(parent);
        }
    }

    protected generateFullData(stub: LayerStub): Layer {
        return stub.generateFullData();
    }

    onNameClick(): Layer {
        const layer = super.onNameClick();
        this.detailsAdapter.bind(layer);
        return layer;
    }
}


