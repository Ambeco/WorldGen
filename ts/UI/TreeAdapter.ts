import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement, createHTMLElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { Layer } from "../Layers/Layer.js";
import { LayerStub } from "../Layers/LayerStub.js";
import { DetailsAdapter } from "./DetailsAdapter.js";

export abstract class TreeAdapter {
    readonly listItemElement: HTMLElement;
    readonly layerRow: HTMLSpanElement;
    readonly toggleIcon: HTMLSpanElement;
    readonly name: HTMLSpanElement;
    readonly subList: HTMLUListElement;

    readonly layerStub: LayerStub;
    readonly subLayerBinder: SubLayerBinder;
    readonly detailsAdapter: DetailsAdapter;

    expandedWithLayer: Layer | null;

    constructor(listItemElement: HTMLLIElement | HTMLDivElement, layerStub: LayerStub, subLayerBinder: SubLayerBinder, detailsAdapter: DetailsAdapter) {
        this.listItemElement = listItemElement;
        this.layerRow = castHTMLElement(listItemElement.children[0]);
        this.toggleIcon = castHTMLSpanElement(this.layerRow.children[0]);
        this.name = castHTMLSpanElement(this.layerRow.children[1]);
        this.subList = castHTMLUListElement(this.listItemElement.children[1]);
        this.layerStub = layerStub;
        this.subLayerBinder = subLayerBinder;
        this.detailsAdapter = detailsAdapter;

        this.toggleIcon.onclick = () => { this.onTreeToggleClick(); };
        this.name.onclick = () => { this.onNameClick(); };
        this.name.innerText = toTitleCase(layerStub.layerName) + ": " + layerStub.name;
        this.collapse();
    }

    collapse(): void {
        this.expandedWithLayer = null;
        this.toggleIcon.classList.remove("toggle-expanded");
        this.toggleIcon.classList.add("toggle-collapsed");
        this.subList.innerText = "";
    }

    expand(parent: Layer): void {
        this.subList.innerText = "";
        for (let child of parent.genericSubLayers) {
            const layerItem = createHTMLElement("li", [toCamelCase(child.layerName) + "Layer"]);
            const nameRow = createHTMLElement("span", ["treeRow"]);
            layerItem.appendChild(nameRow);
            nameRow.appendChild(createHTMLElement("span", ["toggle", "toggle-collapsed"]));
            nameRow.appendChild(createHTMLElement("span", ["layerName"], " " + toTitleCase(child.layerName) + ": " + child.name));
            layerItem.appendChild(createHTMLElement("ul", ["tree"]));
            this.subLayerBinder(layerItem, child);
            this.subList.appendChild(layerItem);
        }
        this.toggleIcon.classList.remove("toggle-collapsed");
        this.toggleIcon.classList.add("toggle-expanded");
        this.expandedWithLayer = parent;
    }

    onTreeToggleClick() {
        if (this.expandedWithLayer == null) {
            this.expand(this.layerStub.generateFullData());
        } else {
            this.collapse();
        }
    }

    onNameClick() {
        if (this.expandedWithLayer == null) {
            const newLayer: Layer = this.layerStub.generateFullData();
            this.expand(newLayer);
        }
        if (this.expandedWithLayer == null) throw new Error("Expanding should have set expandedWithLayer");
        this.detailsAdapter.bind(this.expandedWithLayer);
    }
}

export interface SubLayerBinder {
    (listItemElement: HTMLLIElement, layerStub: LayerStub): TreeAdapter;
}



