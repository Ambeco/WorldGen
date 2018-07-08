import { createHTMLElement, castHTMLElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { DetailsAdapter } from "./DetailsAdapter.js";
import { TreeAdapter, SubLayerBinder } from "./TreeAdapter.js";
import { LayerStub } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { PersonTreeAdapter } from "./PersonAdapter.js";
import { PersonDetailsAdapter } from "./PersonDetailsAdapter.js";
import { toTitleCase } from "../Util/casing.js";

export class BuildingTreeAdapter extends TreeAdapter<LayerStub, Layer> {
    readonly detailsAdapter: DetailsAdapter;
    readonly subLayerBinder: SubLayerBinder<BasePerson, BasePerson>;

    constructor(listItemElement: HTMLLIElement, layerStub: LayerStub) {
        super(listItemElement, layerStub);
        this.detailsAdapter = new BuildingDetailsAdapter();
        this.subLayerBinder = BuildingTreeAdapter.subBinder;
        this.name.innerText = "Building: " + layerStub.name;
    }

    static subBinder(listItemElement: HTMLLIElement, person: BasePerson): PersonTreeAdapter {
        return new PersonTreeAdapter(listItemElement, person);
    }

    expand(parent: Layer): void {
        this.subList.innerText = "";
        for (let child of parent.people) {
            const layerItem = this.appendChildRow("person", false);
            this.subLayerBinder(layerItem, child);
        }
        super.expand(parent);
    }

    protected generateFullData(stub: LayerStub): Layer {
        return stub.generateFullData();
    }

    onNameClick() {
        super.onNameClick();
        if (this.expandedWithData == null) throw new Error("Expanding should have set expandedWithData");
        this.detailsAdapter.bind(this.expandedWithData);
    }
}

export class BuildingDetailsAdapter extends DetailsAdapter {
    
    bind(layer: Layer): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = toTitleCase(layer.layerName) + ": " + layer.name;
        this.bindLayerToByTheNumbers(layer);
        this.bindSummary(layer);
    }
}
