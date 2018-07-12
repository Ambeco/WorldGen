import { createHTMLElement, castHTMLElement } from "../Util/HtmlCasts.js";
import { PersonStub } from "../Universal/Person/PersonStub.js";
import { LayerDetailsAdapter } from "./DetailsAdapter.js";
import { TreeAdapter, SubLayerBinder } from "./TreeAdapter.js";
import { LayerStub, LayerEnum } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { PersonTreeAdapter } from "./PersonAdapter.js";
import { PersonDetailsAdapter } from "./PersonDetailsAdapter.js";
import { toTitleCase } from "../Util/casing.js";

export class BuildingTreeAdapter extends TreeAdapter<LayerStub, Layer> {
    readonly detailsAdapter: LayerDetailsAdapter;
    readonly subLayerBinder: SubLayerBinder<PersonStub, PersonStub>;

    constructor(listItemElement: HTMLLIElement, layerStub: LayerStub) {
        super(listItemElement, layerStub, layerStub.population > 0);
        this.detailsAdapter = new BuildingDetailsAdapter();
        this.subLayerBinder = BuildingTreeAdapter.subBinder;
        this.name.innerText = "Building: " + layerStub.name;
    }

    static subBinder(listItemElement: HTMLLIElement, person: PersonStub): PersonTreeAdapter {
        return new PersonTreeAdapter(listItemElement, person);
    }

    expand(parent: Layer): void {
        if (parent != this.expandedWithData) {
            this.subList.innerText = "";
            for (let child of parent.people) {
                const layerItem = this.appendChildRow("person", false);
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

export class BuildingDetailsAdapter extends LayerDetailsAdapter {
    
    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(LayerEnum[layer.layer]) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
