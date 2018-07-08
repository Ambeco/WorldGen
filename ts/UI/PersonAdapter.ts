import { Continent } from "../Layers/B_continent/Continent.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { DetailsAdapter } from "./DetailsAdapter.js";
import { TreeAdapter } from "./TreeAdapter.js";
import { LayerStub } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { PersonDetailsAdapter } from "./PersonDetailsAdapter.js";

export class PersonTreeAdapter extends TreeAdapter<BasePerson, BasePerson> {
    readonly detailsAdapter: PersonDetailsAdapter;

    constructor(listItemElement: HTMLLIElement, stub: BasePerson) {
        super(listItemElement, stub);
        this.detailsAdapter = new PersonDetailsAdapter();
        this.name.innerText = "Person: " + stub.firstName + " " + stub.familyName;
    }

    expand(parent: BasePerson): void {
        this.collapse();
    }

    collapse(): void {
        this.expandedWithData = this.stub;
        this.toggleIcon.classList.remove("toggle-expanded");
        this.toggleIcon.classList.remove("toggle-collapsed");
        this.toggleIcon.classList.add("toggle-hidden");
        this.subList.innerText = "";
    }

    protected generateFullData(stub: BasePerson): BasePerson {
        return stub;
    }

    onTreeToggleClick(): void {
        this.collapse();
    }

    onNameClick() {
        this.expandedWithData = this.stub;
        this.detailsAdapter.bind(this.stub);
    }
}
