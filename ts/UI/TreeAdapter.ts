import { castHTMLSpanElement, castHTMLUListElement, castHTMLElement, createHTMLElement } from "../Util/HtmlCasts.js";

export abstract class TreeAdapter<SelfStubType, SelfDataType> {
    readonly listItemElement: HTMLElement;
    readonly uiRow: HTMLSpanElement;
    readonly toggleIcon: HTMLSpanElement;
    readonly name: HTMLSpanElement;
    readonly subList: HTMLUListElement;

    readonly stub: SelfStubType;
    readonly hasChildren: boolean;

    protected expandedWithData: SelfDataType | null;
    protected children: SelfStubType[] | null;

    constructor(listItemElement: HTMLLIElement | HTMLDivElement, stub: SelfStubType, hasChildren: boolean) {
        this.listItemElement = listItemElement;
        this.uiRow = castHTMLElement(listItemElement.children[0]);
        this.toggleIcon = castHTMLSpanElement(this.uiRow.children[0]);
        this.name = castHTMLSpanElement(this.uiRow.children[1]);
        this.subList = castHTMLUListElement(this.listItemElement.children[1]);

        this.stub = stub;
        this.hasChildren = hasChildren;

        this.toggleIcon.onclick = () => { this.onTreeToggleClick(); };
        this.name.onclick = () => { this.onNameClick(); };
        this.collapse();
    }

    collapse(): void {
        this.expandedWithData = null;
        this.toggleIcon.classList.remove("toggle-expanded");
        this.toggleIcon.classList.add(this.hasChildren ? "toggle-collapsed" : "toggle-hidden");
        this.subList.innerText = "";
    }

    expand(data: SelfDataType): void {
        this.toggleIcon.classList.remove("toggle-collapsed");
        this.toggleIcon.classList.add(this.hasChildren ? "toggle-expanded" : "toggle-hidden");
        this.expandedWithData = data;
    } 

    protected appendChildRow(layerName: string, hasChildren: boolean): HTMLLIElement {
        const layerItem = createHTMLElement("li", [layerName + "Layer"]);
        const nameRow = createHTMLElement("span", ["treeRow"]);
        layerItem.appendChild(nameRow);
        nameRow.appendChild(createHTMLElement("span", ["toggle", hasChildren ? "toggle-collapsed" : "toggle-hidden"]));
        nameRow.appendChild(createHTMLElement("span", ["layerName"]));
        layerItem.appendChild(createHTMLElement("ul", ["tree"]));
        this.subList.appendChild(layerItem);
        return layerItem;
    }

    protected abstract generateFullData(stub: SelfStubType): SelfDataType;

    onTreeToggleClick(): void {
        if (this.expandedWithData == null) {
            this.expand(this.generateFullData(this.stub));
        } else {
            this.collapse();
        }
    }

    protected onNameClick(): SelfDataType {
        const data = this.expandedWithData || this.generateFullData(this.stub);
        this.expand(data);
        return data;
    }
}

export interface SubLayerBinder<StubType, DataType> {
    (listItemElement: HTMLLIElement, layerStub: StubType): TreeAdapter<StubType, DataType>;
}



